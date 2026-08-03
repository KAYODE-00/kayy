"use client";
import { ArrowUpRight, Code2, Download, Moon, Sun } from "lucide-react";
import { Globe2 } from "lucide-react";
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
  const [lightMode, setLightMode] = useState(false);
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
      image: "/developer.PNG",
    },
    {
      title: "E-Commerce Platform",
      image: "/developer.PNG",
    },
    {
      title: "Portfolio Website",
      image: "/developer.PNG",
    },
  ];
  const [index, setIndex] = useState(0);

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
            <MosaicPortrait />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl ">
              I'm a full-stack developer who enjoys building modern web
              applications, AI-powered products, and clean user experiences with
              performance in mind. I specialize in building scalable SaaS
              platforms and focused digital tools.
            </h1>{" "}
            <div className="flex  flex-col md:flex-row  md:items-center  justify-between">
              <div className="flex md:flex-col gap-10 items-center justify-between">
                <Card
                  id="contact"
                  active={active === "contact"}
                  onClick={() => setActive("contact")}
                  onClose={() => setActive("")}
                  header={
                    <div className="flex items-center-safe gap-2 cursor-pointer ">
                      <ArrowUpRight className="" size={30} /> About Me{" "}
                    </div>
                  }
                >
                  <About />
                </Card>

                <div className=" float-right flex items-center gap-2 text-sm text-zinc-400">
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
                  <span className="text-sm font-medium">Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* work */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">Works</p>
        <div className="min-w-0 flex-1">
          <Skiper52 />
          <Card
            id="work"
            active={active === "work"}
            onClick={() => setActive("work")}
            onClose={() => setActive("")}
            header={
              <div className="flex items-center-safe gap-2 cursor-pointer ">
                <ArrowUpRight className="" size={30} /> Work{" "}
              </div>
            }
          >
            <Work />
          </Card>
        </div>
      </div>
      {/* stacks */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">Stacks & Tools</p>
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
        <p className="float-left text-3xl">Testimonials</p>
        <div className="min-w-0 flex-1">
          <div className="mt-12 flex-1">
            <TestimonialSlider />
          </div>
        </div>
      </div>
      {/* Experience */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">Experience</p>
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
        <p className="float-left text-3xl">Github contribution graph</p>

        <div className="flex items-center justify-center w-full overflow-hidden rounded-xl border border-zinc-800  p-5 md:p-30">
          <img
            src={`https://ghchart.rshah.org/18181b/${about.githubUsername}`}
            alt="GitHub Contribution Graph"
            className="mx-auto block h-auto w-full scale-100 rounded-xl sm:scale-100 md:scale-100"
            loading="lazy"
          />
        </div>
        <p className="mt-4 text-center text-xs text-zinc-500">
          {about.githubSubtitle}{" "}
          <span className="font-mono">{about.githubUsername}</span>
        </p>
      </motion.div>
      <div></div>
    </main>
  );
}

//  <div className=" flex h-full w-full  flex-col items-center justify-center  md:gap-10">
//         <div
//           className={`${
//             active === "about" ? "hidden" : ""
//           } relative overflow-hidden rounded-[28px] `}
//         >
//           <div className="relative flex h-full flex-col w-full justify-between p-6 -px-5">
//             {/* Status */}

//             {/* Image */}

//             {/* Text */}
//             <div className="-mt-7 md:mt-5">
//               <h1 className="text-4xl font-bold leading-tight text-white">
//                 Hi, I'm <span className="text-zinc-300">Kayode</span>
//               </h1>
//               <div>
//                 <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
//                   I&apos;m a <span className="text-zinc-300">Software Engineer</span> who builds thoughtful digital products.
//                 </p>
//               </div>
// <div className="mt-3 float-right flex items-center gap-2 text-sm text-zinc-400">
//   <span>He who</span>

//   <AnimatePresence mode="wait">
//     <motion.span
//       key={words[index]}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.35 }}
//       className="font-semibold text-white"
//     >
//       {words[index]}
//     </motion.span>
//   </AnimatePresence>
// </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-center h-100  w-full max-w-7xl grid-cols-3 grid-rows-2 gap-4">
//           {/* ABOUT */}
//           <div className={`relative col-span-2 row-span-2 h-70 md:h-full `}>
//             <Card
//               id="about"
//               active={active === "about"}
//               onClick={() => setActive("about")}
//               onClose={() => setActive("")}
//               header={
//                 <div  className={`${
//             active === "about" ? "hidden" : ""
//           } relative overflow-hidden rounded-[28px] `} >
//                   <div className=" flex justify-center -mt-8 md:mt-5">
// <img
//   src="/developer.PNG"
//   alt="Kayode"
//   className=" object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.45)]"
// />
//                   </div>
//                 </div>
//               }
//             >
//               <div>
//                 <About />
//               </div>
//             </Card>
//           </div>

//           <div className="col-span-1 row-span-1 h-70 md:h-full flex flex-col justify-between gap-4">
//             {/* WORK */}
//             <div className="relative  h-70 md:h-100">
//   <Card
//     id="work"
//     active={active === "work"}
//     onClick={() => setActive("work")}
//     onClose={() => setActive("")}
//     header={
//       <div
//         className={`${active === "work" && " hidden "} relative h-20`}
//       >
//         <div className="relative space-y-3">
//           {projects.map((project, index) => (
//             <div
//               key={project.title}
//               onMouseEnter={() => setHoveredProject(index)}
//               onMouseLeave={() => setHoveredProject(null)}
//               className="group relative overflow-visible rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700"
//             >
//               <div className="flex items-center justify-between px-6 py-5">
//                 <h2 className="text-sm font-semibold text-white">
//                   {project.title}
//                 </h2>

//                 <ArrowUpRight className="text-zinc-500 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
//               </div>

//               <AnimatePresence>
//                 {hoveredProject === index && (
//                   <motion.div
//                     initial={{
//                       opacity: 0,
//                       scale: 0.9,
//                       x: 30,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       x: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       scale: 0.9,
//                       x: 30,
//                     }}
//                     transition={{
//                       duration: 0.25,
//                     }}
//                     className="
//   absolute
//   right-5
//   top-1/2
//   z-50
//   h-32
//   w-50
//   -translate-y-1/2
//   overflow-hidden
//   rounded-2xl
//   border
//   border-zinc-700
//   shadow-2xl
// "
//                   >
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="h-full w-full object-cover"
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>
//     }
//   >
//     <Work />
//   </Card>
//             </div>

//             {/* CONTACT */}
//             <div className="relative h-20">
//               {" "}
// <Card
//   id="contact"
//   active={active === "contact"}
//   onClick={() => setActive("contact")}
//   onClose={() => setActive("")}
//   header={
//     <div
//       className={`${
//         active === "contact" ? "hidden" : ""
//       } flex items-center px-5 py-4`}
//     >
//       <h1 className="text-2xl font-semibold text-white">
//         Contact
//       </h1>

//       <div className="mx-4 h-px flex-1 bg-zinc-800" />

//       <Globe2 className="h-5 w-5 text-zinc-500" />
//     </div>
//   }
// >
//   <Contact />
// </Card>
//             </div>
//           </div>
//         </div>
//       </div>
