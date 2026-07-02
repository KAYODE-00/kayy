"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const projects = [
  {
    title: "AI SaaS Dashboard",
    image: "/projects/project1.png",
    description:
      "Analytics dashboard powered by AI with authentication and payments.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    image: "/projects/project2.png",
    description: "Modern ecommerce platform with Stripe checkout.",
    stack: ["Next.js", "Stripe", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    image: "/projects/project3.png",
    description: "Minimal portfolio with Framer Motion animations.",
    stack: ["React", "Framer Motion", "Tailwind"],
    github: "#",
    live: "#",
  },
];

export default function Work() {
  return (
    <section className="mx-auto max-w-7xl py-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 className="mb-10 text-5xl font-bold">Selected Work</h1>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Featured */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="lg:col-span-2 overflow-hidden rounded-3xl bg-zinc-900"
        >
          <img
            src={projects[0].image}
            className="h-80 w-full object-cover"
            alt={projects[0].title}
          />

          <div className="space-y-6 p-8">
            <div>
              <h2 className="text-3xl font-bold">
                {projects[0].title}
              </h2>

              <p className="mt-4 leading-7 text-zinc-400">
                {projects[0].description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {projects[0].stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-zinc-800 px-4 py-2 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={projects[0].live}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-black transition hover:scale-105"
              >
                Live Demo
                <ArrowUpRight size={18} />
              </a>

              <a
                href={projects[0].github}
                className="rounded-xl border border-zinc-700 px-5 py-3 hover:bg-zinc-800"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="flex flex-col justify-center rounded-3xl bg-zinc-900 p-8"
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-5xl font-bold">15+</h3>
              <p className="text-zinc-400">Projects Built</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">3+</h3>
              <p className="text-zinc-400">Years Experience</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">100%</h3>
              <p className="text-zinc-400">Passion</p>
            </div>
          </div>
        </motion.div>

        {/* Other Projects */}
        {projects.slice(1).map((project) => (
          <motion.div
            key={project.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            whileHover={{ y: -6 }}
            className="overflow-hidden rounded-3xl bg-zinc-900"
          >
            <img
              src={project.image}
              className="h-52 w-full object-cover"
              alt={project.title}
            />

            <div className="space-y-5 p-6">
              <h3 className="text-2xl font-bold">
                {project.title}
              </h3>

              <p className="text-zinc-400">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between">
                <a
                  href={project.live}
                  className="font-medium hover:text-white text-zinc-400"
                >
                  Live
                </a>

                <a
                  href={project.github}
                  className="font-medium hover:text-white text-zinc-400"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}