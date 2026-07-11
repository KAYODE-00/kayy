"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi 👋 I'm Kayode's AI assistant. Ask me anything about my projects, skills, experience or how to contact me.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      text: message.trim(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.message,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Sorry, I couldn't respond right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-5">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
          <Sparkles size={18} className="text-white" />
        </div>

        <div>
          <h2 className="font-semibold text-white">Kayode AI</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="scrollbar-hide mt-6 flex-1 space-y-5 overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                msg.role === "user"
                  ? "bg-white text-black"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-300"
              }`}
            >
              {msg.role === "assistant" && (
                <Bot size={16} className="mb-2 text-zinc-500" />
              )}

              <p className="whitespace-pre-wrap leading-7">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-400">
              <Loader2 size={16} className="animate-spin" />
              Thinking...
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-6 flex gap-3">
        <input
          value={message}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask me anything..."
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none transition focus:border-zinc-600 disabled:opacity-60"
        />

        <button
          disabled={loading || !message.trim()}
          onClick={sendMessage}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin text-white" />
          ) : (
            <Send size={18} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
}