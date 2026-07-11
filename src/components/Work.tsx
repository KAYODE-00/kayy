"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, Pause, Play } from "lucide-react";
import { FolderKanban, Users, Blocks } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/data/data";

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
  const [category, setCategory] = useState<"personal" | "nocode" | "collab">("personal");

  const filteredProjects = projects.filter(
    (project) => project.type === category,
  );

  // Update interval to only run if there are projects
  useEffect(() => {
    if (!playing || filteredProjects.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % filteredProjects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [playing, filteredProjects.length]);

  const togglePlayback = () => {
    setPlaying((prev) => !prev);
  };

  // Prevent NaN or division by zero errors when the array is empty
  const next = () => {
    if (filteredProjects.length === 0) return;
    setCurrent((prev) => (prev + 1) % filteredProjects.length);
  };

  const prev = () => {
    if (filteredProjects.length === 0) return;
    setCurrent((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  useEffect(() => {
    setCurrent(0);
  }, [category]);

  const project = filteredProjects[current];

  return (
    <section className="relative mx-auto max-w-7xl py-10">
      <div className="mb-10 flex items-center justify-between">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl font-bold"
        >
          Work
        </motion.h1>

        <div className="flex items-center gap-3">
          {/* Personal */}
          <button
            onClick={() => setCategory("personal")}
            className={`group relative flex items-center gap-2 rounded-xl border p-3 transition-all duration-300 ease-in-out ${
              category === "personal"
                ? "border-white bg-white text-black"
                : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            {category === "personal" && (
              <span className="text-sm font-medium transition-all duration-300 ease-in-out">
                Personal
              </span>
            )}{" "}
            <FolderKanban size={18} />
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-3 py-1 text-xs opacity-0 transition-all group-hover:-translate-y-1 group-hover:opacity-100">
              Personal
            </span>
          </button>

          {/* No-Code */}
          <button
            onClick={() => setCategory("nocode")}
            className={`group relative flex items-center gap-2 rounded-xl border p-3 transition-all duration-200 ${
              category === "nocode"
                ? "border-white bg-white text-black"
                : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            {category === "nocode" && (
              <span className="text-sm font-medium transition-all duration-300 ease-in-out">
                No-Code
              </span>
            )}{" "}
            <Blocks size={18} />
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-3 py-1 text-xs opacity-0 transition-all group-hover:-translate-y-1 group-hover:opacity-100">
              No-Code
            </span>
          </button>

          {/* Collaboration */}
          <button
            onClick={() => setCategory("collab")}
            className={`group relative flex items-center gap-2 rounded-xl border p-3 transition-all duration-200 ${
              category === "collab"
                ? "border-white bg-white text-black"
                : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            {category === "collab" && (
              <span className="text-sm font-medium transition-all duration-300 ease-in-out">
                Collaboration
              </span>
            )}{" "}
            <Users size={18} />
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-3 py-1 text-xs opacity-0 transition-all group-hover:-translate-y-1 group-hover:opacity-100">
              Collaboration
            </span>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          {project ? (
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
                  <p className="leading-8 text-zinc-400">
                    {project.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-6 left-6 flex gap-4">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-105"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Fallback UI when a category has 0 projects
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl bg-zinc-900/50 p-10 text-center"
            >
              <h3 className="mb-2 text-xl font-medium text-zinc-300">
                No projects yet
              </h3>
              <p className="text-zinc-500">
                Check back later for {category} projects.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation - Only show if there are multiple projects */}
        {filteredProjects.length > 1 && (
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
        )}

        {/* Counter - Only show if there are projects */}
        {filteredProjects.length > 0 && (
          <div className="absolute bottom-8 right-8 font-mono text-sm tracking-wider">
            <span className="font-semibold text-white">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-zinc-600">/</span>
            <span className="text-zinc-500">
              {String(filteredProjects.length).padStart(2, "0")}{" "}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}