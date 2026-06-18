import { useState } from "react";
import API from "../api/axios";
import "./ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! 👋 I am your Career Pathway assistant. Ask me anything about University of Buea programs, careers, or concours!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await API.post("/chat", { message: input });
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I am having trouble responding right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 1000,
          width: 56, height: 56, borderRadius: "50%",
          background: "#5b8def", color: "#fff", border: "none",
          cursor: "pointer", fontSize: 24, boxShadow: "0 4px 12px rgba(91,141,239,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div style={{
          position: "fixed", bottom: 90, right: 24, zIndex: 1000,
          width: 350, height: 500, background: "#fff",
          borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "#5b8def", color: "#fff",
            padding: "16px 20px", fontWeight: 600, fontSize: 15,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>🎓</span>
            <div>
              <div>Career Pathway Assistant</div>
              <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.85 }}>
                Ask me anything about programs & careers
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "#5b8def" : "#f1f5f9",
                  color: msg.role === "user" ? "#fff" : "#1e293b",
                  fontSize: 13, lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
                  background: "#f1f5f9", color: "#5b6485", fontSize: 13,
                }}>
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 16px", borderTop: "1px solid #e2e8f0",
            display: "flex", gap: 8, alignItems: "center",
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 24,
                border: "1px solid #e2e8f0", fontSize: 13,
                outline: "none", background: "#f8fafc",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: "50%",
                background: loading || !input.trim() ? "#cbd5e1" : "#5b8def",
                color: "#fff", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;