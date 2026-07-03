"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import { socials } from "@/data/data";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // TODO:
    // Connect EmailJS / Resend / Formspree / API Route here

    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
    }, 1200);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">
          Let's Work Together
        </h2>

        <p className="mt-3 text-zinc-400">
          Have an idea or project? Send me a message and I'll get back to you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-6"
      >
        {/* Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            <User size={16} />
            Full Name
          </label>

          <input
            required
            placeholder="John Doe"
            className="
              w-full
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              px-5
              py-4
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-zinc-500
            "
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            <Mail size={16} />
            Email Address
          </label>

          <input
            required
            type="email"
            placeholder="john@email.com"
            className="
              w-full
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              px-5
              py-4
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-zinc-500
            "
          />
        </div>

        {/* Message */}
        <div className="flex-1">
          <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            <MessageSquare size={16} />
            Message
          </label>

          <textarea
            required
            rows={7}
            placeholder="Tell me about your project..."
            className="
              min-h-60
             
              w-full
              resize-none
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              px-5
              py-4
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-zinc-500
            "
          />
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-800
            py-4
            font-medium
            text-white
            transition
            hover:bg-zinc-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </motion.button>
      </form>

  <div className="mt-8 flex items-center justify-center gap-4">
  {socials.map((social) => {
    const Icon = social.icon;

    return (
      <a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition-all duration-300 hover:scale-110 hover:border-zinc-700 hover:bg-zinc-800"
      >
        <Icon className="text-xl text-zinc-300" />

        {/* Tooltip */}
        <span
          className="
            pointer-events-none
            absolute
            -top-10
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            rounded-md
            bg-zinc-800
            px-3
            py-1
            text-xs
            text-white
            opacity-0
            transition-all
            duration-200
            group-hover:-translate-y-1
            group-hover:opacity-100
          "
        >
          {social.name}
        </span>
      </a>
    );
  })}
</div>
    </div>
  );
}