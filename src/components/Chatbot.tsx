"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ChatBot() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi 👋 I'm Kayode's AI assistant. Ask me anything about my projects, skills or experience.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "This is a demo response. Later this will connect to OpenAI, Gemini, Groq or any AI provider.",
        },
      ]);
    }, 600);

    setMessage("");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-5">
        <div className="rounded-xl bg-zinc-800 p-3">
          <Sparkles className="text-white" size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-white">Kayode AI</h2>

          <p className="text-sm text-zinc-500">Powered by AI</p>
        </div>
      </div>

      {/* Messages */}
      <div className="scrollbar-hide mt-6 flex-1 space-y-5 overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                msg.role === "user"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-300 border border-zinc-800"
              }`}
            >
              {msg.role === "ai" && (
                <Bot size={15} className="mb-2 text-zinc-400" />
              )}

              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-6 flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none transition focus:border-zinc-500"
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-zinc-800 p-4 transition hover:bg-zinc-700"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}
