import { socials, tools } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  const builds = [
    "SaaS Platforms",
    "AI Applications",
    "Admin Dashboards",
    "Business Tools",
    "Portfolio Websites",
    "Landing Pages",
    "E-commerce Stores",
    "CMS Platforms",
    "Developer Tools",
    "Automation Systems",
  ];

  const [buildIndex, setBuildIndex] = useState(0);
  const githubUsername = "kayode-00"; // ← CHANGE TO YOUR GITHUB USERNAME

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildIndex((prev) => (prev + 1) % builds.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="mb-12 text-5xl font-bold tracking-tight">About Me</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* LEFT COLUMN */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="md:col-span-2 flex flex-col gap-8 rounded-3xl bg-zinc-900 p-8 md:p-10"
        >
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.125em] text-zinc-500">
              About Me
            </p>
            <h1 className="mt-2 text-4xl font-bold">Hi, I&apos;m Kayode 👋</h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              I&apos;m a full-stack developer who enjoys building modern web
              applications, AI-powered products, and clean user experiences with
              performance in mind.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "30+", label: "Projects Delivered" },
                { number: "15+", label: "Happy Clients" },
                { number: "99%", label: "On-Time Delivery" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-zinc-800 bg-black/20 p-6 transition-colors hover:border-zinc-700"
                >
                  <h2 className="text-4xl font-bold text-white">
                    {stat.number}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* I Build */}
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/20 p-6">
              <h3 className="font-semibold text-white">I Build</h3>
              <div className="mt-4 h-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={builds[buildIndex]}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl font-medium text-zinc-200"
                  >
                    {builds[buildIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - Connect + Testimonials */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="flex flex-col rounded-3xl bg-zinc-900 p-8 md:p-10"
        >
          <div>
            <h2 className="text-2xl font-semibold">Let&apos;s Connect</h2>
            <p className="mt-2 text-zinc-400">
              Ready to build something amazing together?
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name}`}
                  className="group relative rounded-2xl bg-zinc-800 p-4 transition-all hover:scale-110 hover:bg-white hover:text-black"
                >
                  <Icon size={24} />
                  <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl transition-all group-hover:-translate-y-2 group-hover:opacity-100">
                    {social.name}
                  </span>
                </a>
              );
            })}

            <a
              href="/resume.pdf"
              download
              className="group relative flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4 transition-all hover:border-white hover:bg-white hover:text-black"
            >
              <Download size={20} />
              <span className="text-sm font-medium">Resume</span>
            </a>
          </div>

          {/* Testimonials - Kept in Right Column */}
          <div className="mt-12 flex-1">
            <h3 className="mb-6 text-xl font-semibold">Testimonials</h3>
            <div className="space-y-6">
              {[
                {
                  name: "John Doe",
                  role: "CEO at StartupX",
                  text: "Kayode delivered an exceptional SaaS platform that exceeded our expectations.",
                  avatar: "👨‍💼",
                },
                {
                  name: "Sarah Chen",
                  role: "Product Manager",
                  text: "Working with Kayode was a pleasure. He built a beautiful and intuitive dashboard.",
                  avatar: "👩‍💼",
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-zinc-800 bg-black/20 p-6"
                >
                  <div className="flex gap-4">

                    <div>
                      <p className="italic text-zinc-300">"{t.text}"</p>
                      <div className="mt-4">
                        <p className="font-medium text-white">{t.name}</p>
                        <p className="text-sm text-zinc-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* TOOLS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="md:col-span-3 rounded-3xl bg-zinc-900 p-8 md:p-10"
        >
          <h2 className="mb-8 text-3xl font-bold">Tools I Use</h2>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="group flex flex-col items-center">
                  <div className="rounded-2xl bg-zinc-800 p-5 transition-all group-hover:scale-110 group-hover:bg-zinc-700">
                    <Icon className="text-4xl text-white" />
                  </div>
                  <span className="mt-3 text-xs text-zinc-400">{tool.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
      {/* GITHUB CONTRIBUTION GRAPH - Bottom */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-12 rounded-3xl bg-zinc-900 p-6 md:p-10"
      >
        <h3 className="mb-6 text-2xl font-semibold">GitHub Contributions</h3>
        
        <div className="overflow-x-auto rounded-2xl bg-zinc-950 p-4 md:p-6 border border-zinc-800">
          <img
            src={`https://ghchart.rshah.org/${githubUsername}`}
            alt="GitHub Contribution Graph"
className="w-full max-w-full h-auto rounded-xl mx-auto scale-90 sm:scale-100 md:scale-100"            loading="lazy"
          />
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          Last 365 days of contributions •{" "}
          <span className="font-mono">{githubUsername}</span>
        </p>
      </motion.div>
    </section>
  );
};

export default About; 