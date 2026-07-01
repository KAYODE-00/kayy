"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

type CardProps = {
  id: string;
  title: string;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
  children: ReactNode;
};

export default function Card({
  title,
  active,
  onClick,
  onClose,
  children,
}: CardProps) {
  return (
    <motion.div
      layout
      transition={{
        layout: {
          type: "spring",
          stiffness: 150,
          damping: 20,
        },
      }}
      onClick={() => {
        if (!active) onClick();
      }}
      className={`
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        overflow-hidden
        shadow-xl

        ${
          active
            ? "absolute inset-0 z-50 w-[850px] h-[620px]"
            : "relative w-full h-full"
        }
      `}
    >
      <div className="relative h-full p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-2xl font-semibold text-white">
            {active ? `<${title}>` : `<${title} />`}
          </h2>

          <AnimatePresence>
            {active && (
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="rounded-full border border-zinc-700 p-2 hover:bg-zinc-800"
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8"
            >
              {children}

              <div className="mt-12 font-mono text-zinc-500">
                {`</${title}>`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}