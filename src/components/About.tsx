import { socials, tools } from "@/data/data";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const About = () => {
  return (
<section className="mx-auto md:max-w-7xl   ">
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    <h2 className="mb-12 text-5xl font-bold">About Me</h2>
  </motion.div>

  {/* Main Grid */}
  <div className="grid gap-6 md:grid-cols-3">
    {/* LEFT COLUMN */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      className="md:col-span-2 flex flex-col gap-8 rounded-3xl bg-zinc-900 p-8"
    >
<div className="flex-1">
  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
    About Me
  </p>

  <h1 className="mt-2 text-4xl font-bold">
    Hi, I'm Kayode 👋
  </h1>

  <p className="mt-6 leading-8 text-zinc-400">
    I'm a full-stack developer who enjoys building modern web applications,
    AI-powered products, and clean user experiences with performance in mind.
  </p>

  {/* Stats */}
  <div className="mt-8 grid grid-cols-2 gap-4">
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-5">
      <h2 className="text-3xl font-bold text-white">3+</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Years Experience
      </p>
    </div>

    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-5">
      <h2 className="text-3xl font-bold text-white">30+</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Projects Delivered
      </p>
    </div>

    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-5">
      <h2 className="text-3xl font-bold text-white">15+</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Happy Clients
      </p>
    </div>

    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-5">
      <h2 className="text-3xl font-bold text-white">99%</h2>
      <p className="mt-1 text-sm text-zinc-500">
        On-Time Delivery
      </p>
    </div>
  </div>

  <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/20 p-5">
    <h3 className="font-semibold text-white">
      I Build
    </h3>

    <p className="mt-3 text-zinc-400 leading-7">
      SaaS Platforms • AI Apps • Dashboards • Business Tools • Portfolio
      Websites
    </p>
  </div>
</div>
    </motion.div>

    {/* RIGHT COLUMN */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      className="rounded-3xl bg-zinc-900 p-8"
    >
      <div>
        <h2 className="text-2xl font-semibold">
          Connect with me
        </h2>

        <p className="mt-2 text-zinc-400">
          Let's build something amazing together.
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
              className="group relative rounded-xl bg-zinc-800 p-3 transition hover:scale-110 hover:bg-white hover:text-black"
            >
              <Icon size={22} />

              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-700 px-3 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                {social.name}
              </span>
            </a>
          );
        })}    <a
    href="/resume.pdf"
    download
    className="group relative flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 transition-all hover:border-white hover:bg-white hover:text-black"
  >
    <Download size={18} />

    <span className="text-sm font-medium">
      Resume
    </span>

    <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-700 px-3 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
      Download Resume
    </span>
  </a>
      </div>
    </motion.div>

    {/* TOOLS */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      className="md:col-span-3 rounded-3xl bg-zinc-900 p-8"
    >
      <h2 className="mb-8 text-3xl font-bold">
        Tools I Use
      </h2>

      <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.name}
              className="group relative flex items-center justify-center"
            >
              <div className="rounded-2xl bg-zinc-800 p-4 transition duration-300 hover:scale-110 hover:bg-zinc-700">
                <Icon className="text-3xl text-white" />
              </div>

              <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-zinc-700 px-3 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  </div>
</section>
  );
};

export default About;
