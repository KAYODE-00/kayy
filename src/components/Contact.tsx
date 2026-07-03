"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Mail } from "lucide-react";

import ContactForm from "./ContactForm";
import ChatBot from "./Chatbot";

export default function Contact() {
  // false = Contact Form
  // true = AI Chat
  const [showAI, setShowAI] = useState(false);

  return (
    <section className="relative h-full w-full overflow-scroll rounded-3xl no-scrollbar">
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={showAI ? "ai" : "contact"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="h-full w-full"
        >
          {showAI ? <ChatBot /> : <ContactForm />}
        </motion.div>
      </AnimatePresence>

      {/* Morphing Button / Overlay */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 170,
          damping: 22,
        }}
        className={
          showAI
            ? `
              absolute
              inset-0
              z-20
              rounded-3xl
              bg-[#09090B]
              border
              border-zinc-800
              overflow-hidden
            `
            : `
              absolute
              left-5
              top-5
              z-20
              h-14
              w-14
            `
        }
      >
        {showAI ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-full w-full"
          >
            {/* Switch Back Button */}
            <button
              onClick={() => setShowAI(false)}
              className="
                absolute
                left-6
                top-6
                z-30
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-zinc-700
                bg-zinc-900/80
                backdrop-blur
                transition
                hover:bg-zinc-800
              "
            >
              <Mail size={22} />
            </button>

            <div className="h-full p-8 pt-24">
              <ChatBot />
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAI(true)}
            className="
  flex
  h-full
  w-full
  items-center
  justify-center
  rounded-2xl
  border
  border-zinc-700
  bg-zinc-900
  text-white
  transition-all
  duration-300
  hover:bg-zinc-800
  hover:border-zinc-500
"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
