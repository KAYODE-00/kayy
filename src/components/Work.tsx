"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiMongodb,
  SiStripe,
  SiReact,
  SiFramer,
} from "react-icons/si";

const projects = [
  {
    title: "AI SaaS Dashboard",
    image: "/projects/project1.png",
    description:
      "Analytics dashboard powered by AI with authentication and payments.",
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Prisma", icon: SiPrisma },
    ],
    github: "#",
    live: "#",
  },
  {
    title: "E-Commerce Platform",
    image: "/projects/project2.png",
    description:
      "Modern ecommerce platform with Stripe checkout and admin dashboard.",
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Stripe", icon: SiStripe },
    ],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    image: "/projects/project3.png",
    description:
      "Minimal portfolio built with Framer Motion and Bento layouts.",
    stack: [
      { name: "React", icon: SiReact },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    github: "#",
    live: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function Work() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [playing]);

  const togglePlayback = () => {
    setPlaying((prev) => !prev);
  };

  const next = () =>
    setCurrent((prev) => (prev + 1) % projects.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  const project = projects[current];
  return (
    <section className="relative mx-auto max-w-7xl py-10">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-10 text-5xl font-bold"
      >
        Work
      </motion.h1>

      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45 }}
          >
            {/* Header */}
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-bold">{project.title}</h2>

              {/* Stack Icons */}
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <div key={tool.name} className="group relative">
                      <div className="rounded-xl bg-zinc-900 p-3 transition duration-300 hover:scale-110 hover:bg-zinc-800">
                        <Icon className="text-2xl text-white" />
                      </div>

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
                        {tool.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="grid items-stretch gap-6 md:grid-cols-[360px_1fr]">
              {/* Description */}
              <div className="flex rounded-2xl bg-zinc-900 p-8">
                <p className="leading-8 text-zinc-400">{project.description}</p>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl bg-zinc-900">
                <img
                  src={"developer.png"}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 flex gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-105"
                  >
                    Live Demo
                    <ArrowUpRight size={18} />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col items-center gap-5">
          <button
            onClick={prev}
            className="rounded-full border border-zinc-700 p-3 transition hover:bg-white hover:text-black"
          >
            <ArrowUp size={18} />
          </button>

          <div className="h-20 w-px bg-zinc-700" />

          <button
            onClick={togglePlayback}
            className="rounded-full border border-zinc-700 p-3 transition hover:bg-white hover:text-black"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <div className="h-20 w-px bg-zinc-700" />

          <button
            onClick={next}
            className="rounded-full border border-zinc-700 p-3 transition hover:bg-white hover:text-black"
          >
            <ArrowDown size={18} />
          </button>
        </div>

        {/* Counter */}
        <div className="absolute bottom-8 right-8 font-mono text-sm tracking-wider">
          <span className="font-semibold text-white">
            {String(current + 1).padStart(2, "0")}
          </span>

          <span className="mx-2 text-zinc-600">/</span>

          <span className="text-zinc-500">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
