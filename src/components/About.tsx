"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/components/PortfolioProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function About() {
  const { about, builds } = usePortfolio();
  const [buildIndex, setBuildIndex] = useState(0);

  useEffect(() => {
    if (builds.length === 0) return;
    const interval = window.setInterval(() => setBuildIndex((current) => (current + 1) % builds.length), 2800);
    return () => window.clearInterval(interval);
  }, [builds.length]);

  return (
    <section data-lenis-prevent className="mx-auto w-full pb-8">
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl bg-zinc-900 p-6 md:rounded-3xl md:p-10">
        <p className="text-sm uppercase tracking-[0.125em] text-zinc-500">{about.subHeading}</p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-4xl">{about.name}</h1>

        <div className="mt-6 space-y-5 text-[0.95rem] leading-8 text-zinc-400 md:text-lg">
          <p>I&apos;m a <span className="font-semibold text-white">software and AI engineer</span>{about.description}</p>
          <p>I build production-ready web applications and AI features that solve useful problems. My AI work focuses on retrieval-augmented generation (RAG), Model Context Protocol (MCP) integrations, practical fine-tuning, and dependable developer workflows—not machine-learning research.</p>
          <p>I care about the full product: clear user experiences, reliable APIs, well-designed data flows, and software that is maintainable after launch.</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <AboutStack title="AI engineering" description={about.aiEngineeringText} stacks={about.aiEngineeringStack} />
          <AboutStack title="Software engineering" description={about.softwareEngineeringText} stacks={about.softwareEngineeringStack} />
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-800 bg-black/20 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">How I work</p>
          <p className="mt-3 text-[0.95rem] leading-7 text-zinc-300">{about.workingStyleText}</p>
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-800 bg-black/20 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-zinc-400 sm:text-base">{about.iBuildText}</h2>
          <div className="mt-3 h-8 overflow-hidden sm:mt-4 sm:h-10">
            <AnimatePresence mode="wait">
              <motion.p key={builds[buildIndex] ?? "products"} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: 0.4 }} className="text-lg font-medium text-zinc-200 sm:text-2xl">
                {builds[buildIndex] ?? "Useful digital products"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AboutStack({ title, description, stacks }: { title: string; description: string; stacks: string[] }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-black/20 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{title}</p>
      <p className="mt-3 text-[0.95rem] leading-7 text-zinc-300">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {stacks.map((stack) => <span key={stack} className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">{stack}</span>)}
      </div>
    </article>
  );
}
