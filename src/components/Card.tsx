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
  id,
  header,
  active,
  onClick,
  onClose,
  children,
}: CardProps) {
  const expandedPosition = {
    about: "absolute top-0 left-0",
    work: "absolute top-0 right-0",
    contact: "absolute bottom-0 right-0",
  }[id];

  return (
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
        rounded-[32px]
        border
        border-zinc-800
        bg-[#09090B]
        shadow-2xl
        overflow-hidden

        ${
          active
            ? `
              ${expandedPosition}
              z-50
              w-[clamp(60vw,72vw,1000px)]
              md:w-[clamp(340px,92vw,900px)]
              h-[clamp(480px,88vh,700px)]
            `
            : `
              relative
             w-[40vw] md:w-[30vw]
             h-full
            `
        }
      `}
    >
      <div className="relative flex h-full flex-col p-7">
        {/* Header */}
        <div className="relative">
          {header}

          <AnimatePresence>
            {active && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
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
              className="mt-8 flex-1 overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
