"""
Pinecone vector store: index management, upsert, and similarity search.
"""

from __future__ import annotations

import hashlib
import time
import uuid
from typing import List, Dict, Any

from pinecone import Pinecone, ServerlessSpec

from config import settings
from document_processor import Chunk
from embeddings import embed_texts, embed_query


# ---------------------------------------------------------------------------
# Client & index bootstrap
# ---------------------------------------------------------------------------

_pc: Pinecone | None = None
_index = None


def _client() -> Pinecone:
    global _pc
    if _pc is None:
        _pc = Pinecone(api_key=settings.pinecone_api_key)
    return _pc


def get_index():
    global _index
    if _index is not None:
        return _index

    pc = _client()
    existing = [i.name for i in pc.list_indexes()]

    if settings.pinecone_index_name not in existing:
        print(f"[vector_store] Creating index '{settings.pinecone_index_name}' ...")
        pc.create_index(
            name=settings.pinecone_index_name,
            dimension=settings.embedding_dimension,
            metric="cosine",
            spec=ServerlessSpec(
                cloud=settings.pinecone_cloud,
                region=settings.pinecone_region,
            ),
        )
        # Wait until the index is ready
        while not pc.describe_index(settings.pinecone_index_name).status["ready"]:
            time.sleep(1)
        print("[vector_store] Index ready.")

    _index = pc.Index(settings.pinecone_index_name)
    return _index


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _make_id(source: str, chunk_index: int) -> str:
    """Stable deterministic ID so re-uploads overwrite existing vectors."""
    raw = f"{source}::chunk::{chunk_index}"
    return hashlib.md5(raw.encode()).hexdigest()


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def upsert_chunks(chunks: List[Chunk], namespace: str = "default", batch_size: int = 100) -> int:
    """
    Embed chunks and upsert them into Pinecone.
    Returns the number of vectors upserted.
    """
    if not chunks:
        return 0

    index = get_index()
    texts = [c.text for c in chunks]
    vectors = embed_texts(texts, show_progress=True)

    records = []
    for chunk, vector in zip(chunks, vectors):
        vid = _make_id(
            chunk.metadata.get("source", "unknown"),
            chunk.metadata.get("chunk_index", 0),
        )
        records.append({
            "id": vid,
            "values": vector,
            "metadata": {**chunk.metadata, "text": chunk.text},
        })

    # Upsert in batches
    total = 0
    for i in range(0, len(records), batch_size):
        batch = records[i : i + batch_size]
        index.upsert(vectors=batch, namespace=namespace)
        total += len(batch)
        print(f"[vector_store] Upserted {total}/{len(records)} vectors")

    return total


def similarity_search(
    query: str,
    top_k: int = 5,
    namespace: str = "default",
    filter: Dict[str, Any] | None = None,
) -> List[Dict[str, Any]]:
    """
    Search for the most similar chunks to a query.
    Returns a list of dicts with keys: id, score, text, metadata.
    """
    index = get_index()
    query_vector = embed_query(query)

    response = index.query(
        vector=query_vector,
        top_k=top_k,
        namespace=namespace,
        include_metadata=True,
        filter=filter,
    )

    results = []
    for match in response.matches:
        meta = match.metadata or {}
        results.append({
            "id": match.id,
            "score": round(match.score, 4),
            "text": meta.pop("text", ""),
            "metadata": meta,
        })
    return results


def delete_by_source(source: str, namespace: str = "default") -> None:
    """Delete all vectors that came from a specific file."""
    index = get_index()
    index.delete(filter={"source": {"$eq": source}}, namespace=namespace)
    print(f"[vector_store] Deleted vectors for source='{source}'")


def index_stats() -> Dict[str, Any]:
    index = get_index()
    return index.describe_index_stats().to_dict()
