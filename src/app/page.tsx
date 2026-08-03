"use client";
import { ArrowUpRight, Code2, Download, Moon, Sun } from "lucide-react";
import { Globe2, Bot } from "lucide-react";
import MosaicPortrait from "@/components/MosaicPortrait";
import Card from "@/components/Card";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { Skiper52 } from "@/components/ExpandOnHover";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { about, socials, tools, workExperience } from "@/data/data";
import TestimonialSlider from "@/components/TestimonialSlider";
import ChatBot from "@/components/Chatbot";

const contributionData = Array.from({ length: 365 }, (_, index) => ({
  date: String(index),
  count: (index * 17) % 18,
  level: (index * 7) % 5,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [active, setActive] = useState("");
  const [siteAbout, setSiteAbout] = useState(about);
  const [lightMode, setLightMode] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const words = siteAbout.rotatingWords?.length
    ? siteAbout.rotatingWords
    : ["codes"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/portfolio-data")
      .then((response) => (response.ok ? response.json() : null))
      .then(
        (data) =>
          data?.about &&
          setSiteAbout((current) => ({ ...current, ...data.about })),
      )
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") setLightMode(true);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("light-mode", lightMode);
    window.localStorage.setItem(
      "portfolio-theme",
      lightMode ? "light" : "dark",
    );
  }, [lightMode]);
  return (
    <main className="relative flex min-h-screen flex-col gap-10 bg-black pt-16   p-8 md:p-8">
      <button
        type="button"
        aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
        onClick={() => setLightMode((current) => !current)}
        className="fixed left-5 top-5 z-[80] grid size-11 place-items-center rounded-full border border-zinc-700 bg-zinc-900 text-white shadow-xl transition hover:scale-110 hover:bg-white hover:text-black"
      >
        {lightMode ? <Moon size={18} /> : <Sun size={18} />}
      </button>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-4">
          <div className="  h-70 w-70 overflow-hidden rounded-full border border-zinc-700 ">
            <MosaicPortrait imageUrl={siteAbout.portraitImage} />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl ">
              I'm a full-stack developer who enjoys building modern web
              {siteAbout.heroText ?? siteAbout.description}
            </h1>{" "}
            <div className="flex  flex-col md:flex-row  md:items-center  justify-between">
              <div className="flex md:flex-col gap-10 items-center justify-between">
                <Card
                  id="about"
                  active={active === "about"}
                  onClick={() => setActive("about")}
                  onClose={() => setActive("")}
                  header={
                    <div className="flex items-center-safe gap-2 cursor-pointer ">
                      <ArrowUpRight className="" size={30} />{" "}
                      {siteAbout.aboutCardLabel}{" "}
                    </div>
                  }
                >
                  <About />
                </Card>

                <div className=" float-right flex items-center gap-2 text-sm text-zinc-400">
                  <span>{siteAbout.rotatingPrefix}</span>

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
                      className="group relative rounded-2xl bg-zinc-800 p-3 transition-all hover:scale-110 hover:bg-white hover:text-black"
                    >
                      <Icon className="text-3xl" />
                      <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl transition-all group-hover:-translate-y-2 group-hover:opacity-100">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
                <a
                  href="/resume.docx"
                  download
                  className="group relative flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4 transition-all hover:border-white hover:bg-white hover:text-black"
                >
                  <Download size={20} />
                  <span className="text-sm font-medium">
                    {siteAbout.resumeLabel}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* work */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">{siteAbout.workSectionTitle}</p>
        <div className="min-w-0 flex-1">
          <Skiper52 />
          <Card
            id="work"
            active={active === "work"}
            onClick={() => setActive("work")}
            onClose={() => setActive("")}
            header={
              <div className="flex items-center-safe gap-2 cursor-pointer ">
                <ArrowUpRight className="" size={30} />{" "}
                {siteAbout.workCardLabel}{" "}
              </div>
            }
          >
            <Work />
          </Card>
        </div>
      </div>
      {/* stacks */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">{siteAbout.stacksSectionTitle}</p>
        <div className="min-w-0 flex-1">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="rounded-3xl  p-4 md:col-span-3 md:p-10"
          >
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8">
              {tools.map((tool) => {
                const Icon = tool.icon ?? Code2;
                return (
                  <div
                    key={tool.name}
                    className="group relative flex flex-col items-center"
                  >
                    <div className="rounded-2xl bg-zinc-800 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black md:p-5">
                      <Icon className="text-3xl" />
                    </div>
                    <span className="mt-2 text-center text-[10px] text-zinc-400 sm:hidden">
                      {tool.name}
                    </span>
                    <span className="pointer-events-none absolute -top-11 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl transition-all group-hover:-translate-y-2 group-hover:opacity-100 sm:block">
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">{siteAbout.testimonialsTitle}</p>
        <div className="min-w-0 flex-1">
          <div className="mt-12 flex-1">
            <TestimonialSlider />
          </div>
        </div>
      </div>
      {/* Experience */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">
          {siteAbout.experienceSectionTitle}
        </p>
        <div className="min-w-0 flex-1">
          <div className="mt-12 flex-1">
            <TestimonialSlider items={workExperience} reverse />
          </div>
        </div>
      </div>
      {/* GITHUB CONTRIBUTION GRAPH */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-5 "
      >
        <p className="float-left text-3xl">{siteAbout.githubSectionTitle}</p>

        <div className="flex items-center justify-center w-full overflow-hidden rounded-xl border border-zinc-800  p-5 md:p-30">
          <img
            src={`https://ghchart.rshah.org/18181b/${siteAbout.githubUsername}`}
            alt="GitHub Contribution Graph"
            className="mx-auto block h-auto w-full scale-100 rounded-xl sm:scale-100 md:scale-100"
            loading="lazy"
          />
        </div>
        <p className="mt-4 text-center text-xs text-zinc-500">
          {siteAbout.githubSubtitle}{" "}
          <span className="font-mono">{siteAbout.githubUsername}</span>
        </p>
      </motion.div>
      <div></div>
    </main>
  );
}
