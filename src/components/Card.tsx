"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

type CardProps = {
  id: string;
  header: ReactNode;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
  children: ReactNode;
};

export default function Card({
  header,
  active,
  id,
  contact,
  onClick,
  onClose,
  children,
}: CardProps) {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        layout
        transition={{
          layout: {
            type: "spring",
            stiffness: 170,
            damping: 22,
          },
        }}
        onClick={() => !active && onClick()}
        className={`
          overflow-hidden
          rounded-[32px]
          border
          border-zinc-800
          bg-[#09090B]
          shadow-2xl

          ${
            active
              ? `
                fixed
                left-1/2
                top-1/2
                z-50
                h-[90vh]
                w-[95vw]
                max-w-[1200px]
                -translate-x-1/2
                -translate-y-1/2
              `
              : `
                relative
             
                ${id=== "contact" ? "h-20" : "   h-full"}
                w-[45vw]
                md:w-[30vw]
              `
          }
        `}
      >
        <div className={`relative flex h-full flex-col ${!active ? "p-3" : "p-7"}`}>
          {/* Header */}
          <div className="relative">
            {header}

            <AnimatePresence>
              {active && (
                <motion.button
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    rotate: -90,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/90 backdrop-blur transition hover:bg-zinc-800"
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex-1 overflow-y-auto scrollbar-hide"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
