"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiSupabase,
  SiFramer,
  SiPostgresql,
  SiPrisma,
  SiNodedotjs,
  SiMongodb,
} from "react-icons/si";
import { LayoutGrid, X } from "lucide-react";
import type { IconType } from "react-icons";
import Work from "./Work";

type Project = {
  id: number;
  url: string;
  title: string;
  description: string;
  stack: [string, IconType][];
};
const items: Project[] = [
  {
    id: 1,
    url: "/developer.PNG",
    title: "AI SaaS Dashboard",
    description:
      "A focused analytics experience for making complex data feel simple.",
    stack: [
      ["Next.js", SiNextdotjs],
      ["TypeScript", SiTypescript],
      ["AI", SiReact],
    ],
  },
  {
    id: 2,
    url: "/metric.png",
    title: "Metric SaaS",
    description:
      "An analytics dashboard with authentication, payments, and useful insights.",
    stack: [
      ["React", SiReact],
      ["Supabase", SiSupabase],
      ["Tailwind", SiTailwindcss],
    ],
  },
  {
    id: 3,
    url: "/developer.PNG",
    title: "AI Portfolio",
    description:
      "A self-aware portfolio built around motion, conversation, and personality.",
    stack: [
      ["React", SiReact],
      ["Framer", SiFramer],
      ["AI", SiReact],
    ],
  },
  {
    id: 4,
    url: "/metric.png",
    title: "Data Room",
    description: "A responsive workspace for teams working with live metrics.",
    stack: [
      ["Next.js", SiNextdotjs],
      ["Postgres", SiPostgresql],
      ["Prisma", SiPrisma],
    ],
  },
  {
    id: 5,
    url: "/developer.PNG",
    title: "Webcrate",
    description:
      "A click-to-edit builder that makes creating on the web feel immediate.",
    stack: [
      ["Next.js", SiNextdotjs],
      ["TypeScript", SiTypescript],
      ["React", SiReact],
    ],
  },
  {
    id: 6,
    url: "/metric.png",
    title: "Business Tools",
    description: "Thoughtful internal tools designed around real workflows.",
    stack: [
      ["React", SiReact],
      ["Node.js", SiNodedotjs],
      ["MongoDB", SiMongodb],
    ],
  },
];

const FULL_WIDTH = 120;
const COLLAPSED_WIDTH = 35;

function Thumbnails({
  index,
  setIndex,
  onViewAll,
}: {
  index: number;
  setIndex: (value: number) => void;
  onViewAll: () => void;
}) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = thumbnailsRef.current;
    if (!container) return;
    container.scrollTo({
      left: Math.max(
        0,
        index * (COLLAPSED_WIDTH + 2) -
          container.offsetWidth / 2 +
          FULL_WIDTH / 2,
      ),
      behavior: "smooth",
    });
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className="overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex h-20 w-max gap-0.5 pb-2">
        {items.map((item, itemIndex) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(itemIndex)}
            initial={false}
            animate={{
              width: itemIndex === index ? FULL_WIDTH : COLLAPSED_WIDTH,
              marginLeft: itemIndex === index ? 2 : 0,
              marginRight: itemIndex === index ? 2 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative h-full shrink-0 overflow-hidden rounded"
          >
            <img
              src={item.url}
              alt={item.title}
              className="pointer-events-none size-full select-none object-cover"
              draggable={false}
            />
          </motion.button>
        ))}
        <button
          onClick={onViewAll}
          aria-label="View all projects"
          className="flex h-full w-28 shrink-0 flex-col items-center justify-center gap-1 rounded bg-zinc-900 text-white"
        >
          <LayoutGrid size={18} />
          <span className="text-[10px]">View all</span>
        </button>
      </div>
    </div>
  );
}

export function Skiper52() {
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const project = items[index];

  useEffect(() => {
    if (!isDragging)
      animate(x, -(index * (containerRef.current?.offsetWidth || 1)), {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
  }, [index, isDragging, x]);

  const change = (nextIndex: number) =>
    setIndex(Math.max(0, Math.min(items.length - 1, nextIndex)));

  return (
    <>
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-col gap-3">
          <div
            className="relative overflow-hidden rounded-lg bg-zinc-100"
            ref={containerRef}
          >
            <motion.div
              className="flex"
              drag="x"
              dragElastic={0.2}
              dragMomentum={false}
              style={{ x }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                const width = containerRef.current?.offsetWidth || 1;
                const offset = info.offset.x;
                const velocity = info.velocity.x;
                const nextIndex =
                  Math.abs(velocity) > 500
                    ? index + (velocity > 0 ? -1 : 1)
                    : Math.abs(offset) > width * 0.3
                      ? index + (offset > 0 ? -1 : 1)
                      : index;
                change(nextIndex);
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative h-[22rem] w-full shrink-0 sm:h-[28rem]"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="size-full select-none object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-24 text-white">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-1 max-w-xl text-sm text-white/70">
                      {item.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.stack.map(([name, Icon]) => (
                        <span
                          key={name}
                          title={name}
                          className="rounded-full border border-white/30 bg-black/20 p-2 text-white/85"
                        >
                          <Icon size={14} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            <button
              aria-label="Previous project"
              disabled={index === 0}
              onClick={() => change(index - 1)}
              className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            <button
              aria-label="Next project"
              disabled={index === items.length - 1}
              onClick={() => change(index + 1)}
              className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {index + 1} / {items.length}
            </div>
          </div>
          <Thumbnails index={index} setIndex={setIndex} onViewAll={() => setShowAll(true)} />
        </div>
      </div>
      {showAll && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 p-5 text-white sm:p-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-white/50">
                  Portfolio / 06 projects
                </p>
                <h2 className="mt-2 text-4xl font-semibold">All projects</h2>
              </div>
              <button
                aria-label="Close all projects"
                onClick={() => setShowAll(false)}
                className="rounded-full border border-white/20 p-3 hover:bg-white hover:text-black"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Work />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
