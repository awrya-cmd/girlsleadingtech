"""
Batch ingest all files already present in the uploads/ directory.
Usage:
    python ingest_all.py
    python ingest_all.py --namespace my-namespace
"""

import argparse
from pathlib import Path

from config import UPLOAD_PATH
from document_processor import process_file, LOADERS
from vector_store import upsert_chunks


def ingest_directory(directory: Path, namespace: str) -> None:
    files = [
        f for f in directory.rglob("*")
        if f.is_file() and f.suffix.lower() in LOADERS
    ]

    if not files:
        print(f"No supported files found in {directory}")
        return

    print(f"Found {len(files)} file(s) to ingest.\n")

    for i, path in enumerate(files, 1):
        print(f"[{i}/{len(files)}] Processing: {path.name}")
        try:
            chunks = process_file(path)
            count = upsert_chunks(chunks, namespace=namespace)
            print(f"  -> {len(chunks)} chunks, {count} vectors upserted.\n")
        except Exception as e:
            print(f"  -> ERROR: {e}\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Batch ingest uploads into Pinecone")
    parser.add_argument("--namespace", default="default", help="Pinecone namespace")
    parser.add_argument("--dir", default=str(UPLOAD_PATH), help="Directory to scan")
    args = parser.parse_args()

    ingest_directory(Path(args.dir), args.namespace)
    print("Done.")
