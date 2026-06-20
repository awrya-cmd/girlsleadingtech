"""
Girls Leading Tech — RAG Chatbot Service
Run: uvicorn main:app --reload --port 8001
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from vector_store import get_index, similarity_search


app = FastAPI(title="Girls Leading Tech — Chatbot", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    get_index()


class ChatRequest(BaseModel):
    question: str
    top_k: int = 5


@app.post("/chat")
def chat(payload: ChatRequest):
    results = similarity_search(payload.question, top_k=payload.top_k)
    context = "\n\n".join(r["text"] for r in results)
    # TODO: pass context + question to an LLM and return the answer
    return {"question": payload.question, "context": context, "sources": [r["metadata"] for r in results]}


@app.get("/health")
def health():
    return {"status": "ok"}
