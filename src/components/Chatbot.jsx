import React, { useEffect, useRef, useState } from "react";

const LS_KEY = "glt_chatbot_messages";

const FEEDBACK_MAIL =
  "mailto:girlsleadingtech@gmail.com?subject=GLT%20Website%20Suggestion&body=Hi%20GLT%20team%2C%20I%27d%20like%20to%20suggest%3A%20";

const WELCOME = {
  role: "assistant",
  text: "Hi! I'm your GLT assistant. Ask about scholarships, events, mentorship, hackathons, programs, or tech roadmaps like DSA, CSS, Python, Frontend, ML, and Cloud.",
};

function loadMessages() {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [WELCOME];
}

function saveMessages(msgs) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, JSON.stringify(msgs));
    }
  } catch {}
}

/** Render a single message bubble */
function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
        animation: "gltFadeUp 0.3s ease both",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            flexShrink: 0,
            marginRight: "8px",
            marginTop: "2px",
            boxShadow: "0 0 10px rgba(168,85,247,0.5)",
          }}
        >
          ✦
        </div>
      )}
      <div
        style={{
          maxWidth: "82%",
          padding: "10px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg, #7c3aed, #db2777)"
            : "rgba(255,255,255,0.07)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.12)",
          backdropFilter: isUser ? "none" : "blur(8px)",
          color: "#fff",
          fontSize: "13px",
          lineHeight: "1.65",
          whiteSpace: "pre-line",
          boxShadow: isUser
            ? "0 4px 20px rgba(124,58,237,0.3)"
            : "0 2px 12px rgba(0,0,0,0.3)",
          wordBreak: "break-word",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}

/** Typing indicator */
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #a855f7, #ec4899)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          flexShrink: 0,
          boxShadow: "0 0 10px rgba(168,85,247,0.5)",
        }}
      >
        ✦
      </div>
      <div
        style={{
          padding: "10px 16px",
          borderRadius: "18px 18px 18px 4px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "inline-block",
              animation: `gltDot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  "Scholarships",
  "Events",
  "Mentorship",
  "Hackathons",
  "DSA roadmap",
  "CSS essentials",
  "Python",
  "Machine learning",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadMessages);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  /* Persist messages */
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  /* Auto-scroll to bottom */
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  /* Focus input when opened */
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  /* Stop pulse after first open */
  useEffect(() => {
    if (open) setPulse(false);
  }, [open]);

  const sendQuery = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setQuery("");
    setLoading(true);

    try {
      const { handleChatRequest } = await import("@/lib/chat-server");
      const result = await handleChatRequest({ query: trimmed });
      const responseText =
        result.text ||
        "Sorry, I couldn't find anything right now. Try asking about Scholarships, Events, or Mentorship.";

      const cleaned = responseText.replace(/\u2014/g, "-");
      setMessages((prev) => [...prev, { role: "assistant", text: cleaned }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuery(query);
  };

  const handleSuggestion = (s) => sendQuery(s);

  const clearHistory = () => {
    setMessages([WELCOME]);
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

  return (
    <>
      {/* Injected keyframes */}
      <style>{`
        @keyframes gltFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gltDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
        @keyframes gltPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.6); }
          50%       { box-shadow: 0 0 0 12px rgba(168,85,247,0); }
        }
        @keyframes gltSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        #glt-chatbot-input::placeholder { color: rgba(255,255,255,0.35); }
        #glt-chatbot-input:focus { outline: none; }
        #glt-chat-scroll::-webkit-scrollbar { width: 4px; }
        #glt-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        #glt-chat-scroll::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 4px; }
      `}</style>

      {/* Floating launcher button */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        {/* Chat panel */}
        {open && (
          <div
            style={{
              width: "min(92vw, 400px)",
              height: "min(88vh, 580px)",
              borderRadius: "24px",
              border: "1px solid rgba(168,85,247,0.25)",
              background: "rgba(10,8,25,0.82)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "gltSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px 14px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(219,39,119,0.25))",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #a855f7, #ec4899)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    boxShadow: "0 0 16px rgba(168,85,247,0.6)",
                  }}
                >
                  ✦
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", letterSpacing: "0.01em" }}>
                    GLT Assistant
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>
                    Ask about roadmaps, scholarships &amp; more
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={clearHistory}
                  title="Clear chat"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "rgba(255,255,255,0.5)",
                    padding: "5px 9px",
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                  onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  title="Close"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "rgba(255,255,255,0.5)",
                    padding: "5px 9px",
                    fontSize: "16px",
                    lineHeight: 1,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                  onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              id="glt-chat-scroll"
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 16px 8px",
              }}
            >
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && !loading && (
              <div
                style={{
                  padding: "0 14px 10px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  flexShrink: 0,
                }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSuggestion(s)}
                    style={{
                      background: "rgba(168,85,247,0.12)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      borderRadius: "20px",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "11px",
                      padding: "5px 11px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(168,85,247,0.3)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(168,85,247,0.12)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "12px 14px 14px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                gap: "8px",
                flexShrink: 0,
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <input
                id="glt-chatbot-input"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendQuery(query);
                  }
                }}
                placeholder="Ask me anything..."
                disabled={loading}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: "13px",
                  padding: "10px 14px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(168,85,247,0.7)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #db2777)",
                  border: "none",
                  borderRadius: "14px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: "10px 16px",
                  cursor: loading || !query.trim() ? "not-allowed" : "pointer",
                  opacity: loading || !query.trim() ? 0.5 : 1,
                  transition: "opacity 0.2s, transform 0.15s",
                  flexShrink: 0,
                  boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  if (!loading && query.trim()) e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {loading ? "..." : "Send"}
              </button>
            </form>
          </div>
        )}

        

        {/* FAB button */}
        <button
          type="button"
          id="glt-chatbot-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chatbot" : "Open GLT Assistant"}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: open
              ? "rgba(30,20,60,0.9)"
              : "linear-gradient(135deg, #7c3aed, #db2777)",
            border: open ? "2px solid rgba(168,85,247,0.4)" : "none",
            color: "#fff",
            fontSize: open ? "22px" : "22px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: open
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 8px 32px rgba(124,58,237,0.55)",
            animation: pulse && !open ? "gltPulse 2s ease-in-out infinite" : "none",
            transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
            flexShrink: 0,
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {open ? "×" : "✦"}
        </button>
      </div>
    </>
  );
}
