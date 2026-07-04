"use client";
import { ArrowUpRight } from "lucide-react";
import { Globe2 } from "lucide-react";
import Image from "next/image";
import Card from "@/components/Card";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Home() {
  const [active, setActive] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const words = [
    "codes",
    "builds",
    "architects",
    "designs",
    "creates",
    "learns",
    "ships",
    "innovates",
    "plans",
    "engineers",
  ];
  const projects = [
    {
      title: "AI SaaS Dashboard",
      image: "/developer.png",
    },
    {
      title: "E-Commerce Platform",
      image: "/developer.png",
    },
    {
      title: "Portfolio Website",
      image: "/developer.png",
    },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 md:p-10">
      <div className="flex items-center justify-center h-100  w-full max-w-7xl grid-cols-3 grid-rows-2 gap-4">
        {/* ABOUT */}
        <div className={`relative col-span-2 row-span-2 h-full `}>
          <Card
            id="about"
            active={active === "about"}
            onClick={() => setActive("about")}
            onClose={() => setActive("")}
        header={
  <div
    className={`${
      active === "about" ? "hidden" : ""
    } relative overflow-hidden rounded-[28px]`}
  >
    {/* Background */}
    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

    {/* Glow */}
    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

    <div className="relative flex h-full flex-col justify-between p-6">
      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

          <span className="text-xs tracking-wide text-zinc-400">
            Available for work
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="mt-6 flex justify-center">
        <img
          src="/developer.png"
          alt="Kayode"
          className="h-52 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.45)]"
        />
      </div>

      {/* Text */}
      <div className="mt-6">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
          Full Stack Developer
        </p>

        <h1 className="text-4xl font-bold leading-tight text-white">
          Hi, I'm{" "}
          <span className="text-zinc-300">
            Kayode
          </span>
        </h1>

        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
          <span>He who</span>

          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="font-semibold text-white"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">
            <p className="text-xs text-zinc-500">Experience</p>
            <p className="font-semibold text-white">3+ Years</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">
            <p className="text-xs text-zinc-500">Projects</p>
            <p className="font-semibold text-white">25+</p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
          >
            <div>
              <About />
            </div>
          </Card>
        </div>

        <div className="col-span-1 row-span-1 h-full flex flex-col justify-between gap-4">
          {/* WORK */}
          <div className="relative h-100">
            <Card
              id="work"
              active={active === "work"}
              onClick={() => setActive("work")}
              onClose={() => setActive("")}
              header={
                <div
                  className={`${active === "work" && " hidden "} relative h-20`}
                >
                  <div className="relative space-y-3">
                    {projects.map((project, index) => (
                      <div
                        key={project.title}
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="group relative overflow-visible rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700"
                      >
                        <div className="flex items-center justify-between px-6 py-5">
                          <h2 className="text-sm font-semibold text-white">
                            {project.title}
                          </h2>

                          <ArrowUpRight className="text-zinc-500 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                        <AnimatePresence>
                          {hoveredProject === index && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                scale: 0.9,
                                x: 30,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.9,
                                x: 30,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="
              absolute
              right-5
              top-1/2
              z-50
              h-32
              w-50
              -translate-y-1/2
              overflow-hidden
              rounded-2xl
              border
              border-zinc-700
              shadow-2xl
            "
                            >
                              <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              }
            >
              <Work />
            </Card>
          </div>

          {/* CONTACT */}
          <div className="relative h-20">
            {" "}
            <Card
              id="contact"
              active={active === "contact"}
              onClick={() => setActive("contact")}
              onClose={() => setActive("")}
              header={<div
  className={`${
    active === "contact" ? "hidden" : ""
  } flex items-center px-5 py-4`}
>
  <h1 className="text-2xl font-semibold text-white">
    Contact
  </h1>

  <div className="mx-4 h-px flex-1 bg-zinc-800" />

  <Globe2 className="h-5 w-5 text-zinc-500" />
</div>
              }
            >
              <Contact />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
