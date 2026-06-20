"""
Singleton embedding model (sentence-transformers).
Encodes a list of strings into dense float vectors.
"""

from __future__ import annotations

from functools import lru_cache
from typing import List

from sentence_transformers import SentenceTransformer

from config import settings


@lru_cache(maxsize=1)
def _get_model() -> SentenceTransformer:
    print(f"[embeddings] Loading model: {settings.embedding_model}")
    return SentenceTransformer(settings.embedding_model)


def embed_texts(texts: List[str], batch_size: int = 64, show_progress: bool = False) -> List[List[float]]:
    """Return a list of embedding vectors (one per input text)."""
    model = _get_model()
    vectors = model.encode(
        texts,
        batch_size=batch_size,
        show_progress_bar=show_progress,
        convert_to_numpy=True,
        normalize_embeddings=True,
    )
    return vectors.tolist()


def embed_query(query: str) -> List[float]:
    """Embed a single query string."""
    return embed_texts([query])[0]
