"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Loader2,
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  X,
} from "lucide-react";
import { socials } from "@/data/data";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. I'll get back to you soon!",
      });
      setTimeout(() => {
        setStatus({
          type: "",
          message: "",
        });
      }, 3000);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">Let's Work Together</h2>

        <p className="mt-3 text-zinc-400">
          Have an idea or project? Send me a message and I'll get back to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
        {/* Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            <User size={16} />
            Full Name
          </label>

          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-500"
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
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@email.com"
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            <Mail size={16} />
            Subject
          </label>

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Project Inquiry"
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-500"
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
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className="min-h-60 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* Status */}
        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(8px)",
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-6"
            >
              <motion.div
                initial={{
                  scale: 0.85,
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 22,
                }}
                className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl"
              >
                {/* Glow */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500" />

                {/* Close */}
                <button
                  onClick={() =>
                    setStatus({
                      type: "",
                      message: "",
                    })
                  }
                  className="absolute right-5 top-5 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                >
                  <X size={18} />
                </button>

                <div className="flex flex-col items-center px-10 py-12 text-center">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/5">
                    <CheckCircle2 size={42} className="text-emerald-400" />
                  </div>

                  <h2 className="text-3xl font-bold text-white">
                    Message Sent
                  </h2>

                  <p className="mt-4 leading-7 text-zinc-400">
                    Thanks for reaching out!
                    <br />
                    I've received your message and will get back to you as soon
                    as possible.
                  </p>

                  <button
                    onClick={() =>
                      setStatus({
                        type: "",
                        message: "",
                      })
                    }
                    className="mt-10 w-full rounded-2xl bg-white py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-100"
                  >
                    Awesome 🚀
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={loading}
          className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-800 py-4 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </motion.button>
      </form>

      {/* Socials */}
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

              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-3 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
