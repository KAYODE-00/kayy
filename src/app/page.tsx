"use client";
import { ArrowUpRight } from "lucide-react";
import { Globe2 } from "lucide-react";
import MosaicPortrait from "@/components/MosaicPortrait";
import Card from "@/components/Card";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { Skiper52 } from "@/components/ExpandOnHover";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { about, tools } from "@/data/data";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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
  return (
    <main className="flex flex-col min-h-screen  gap-10 bg-black p-8 ">
      <div className="flex items-center justify-center">
        <span className="flex items-center  gap-4">
          <span className="flex flex-col gap-3">
            <h1 className="text-xl ">
              I'm a full-stack developer who enjoys building modern web
              applications, AI-powered products, and clean user experiences with
              performance in mind. I specialize in building scalable SaaS
              platforms and focused digital tools.
            </h1>{" "}
            <ArrowUpRight className="" size={30} />{" "}
          </span>
          <div className="hidden h-70 w-70 overflow-hidden rounded-full border border-zinc-700 md:block">
            <MosaicPortrait />
          </div>
        </span>
      </div>{" "}
      {/* work */}
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">Works</p>
        <div className="min-w-0 flex-1">
          <Skiper52 />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="float-left text-3xl">Stacks & Tools</p>
        <div className="min-w-0 flex-1">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="rounded-3xl bg-zinc-900 p-8 md:col-span-3 md:p-10"
          >
            <h2 className="mb-5 text-2xl font-bold sm:mb-8 sm:text-3xl">
              {about.toolsTitle}
            </h2>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="group flex flex-col items-center"
                  >
                    <div className="rounded-2xl bg-zinc-800 p-5 transition-all group-hover:scale-110 group-hover:bg-zinc-700">
                      <Icon className="text-4xl text-white" />
                    </div>
                    <span className="mt-3 text-xs text-zinc-400">
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <div></div>
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
//               <div className="mt-3 float-right flex items-center gap-2 text-sm text-zinc-400">
//                 <span>He who</span>

//                 <AnimatePresence mode="wait">
//                   <motion.span
//                     key={words[index]}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.35 }}
//                     className="font-semibold text-white"
//                   >
//                     {words[index]}
//                   </motion.span>
//                 </AnimatePresence>
//               </div>
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
//               <Card
//                 id="work"
//                 active={active === "work"}
//                 onClick={() => setActive("work")}
//                 onClose={() => setActive("")}
//                 header={
//                   <div
//                     className={`${active === "work" && " hidden "} relative h-20`}
//                   >
//                     <div className="relative space-y-3">
//                       {projects.map((project, index) => (
//                         <div
//                           key={project.title}
//                           onMouseEnter={() => setHoveredProject(index)}
//                           onMouseLeave={() => setHoveredProject(null)}
//                           className="group relative overflow-visible rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700"
//                         >
//                           <div className="flex items-center justify-between px-6 py-5">
//                             <h2 className="text-sm font-semibold text-white">
//                               {project.title}
//                             </h2>

//                             <ArrowUpRight className="text-zinc-500 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
//                           </div>

//                           <AnimatePresence>
//                             {hoveredProject === index && (
//                               <motion.div
//                                 initial={{
//                                   opacity: 0,
//                                   scale: 0.9,
//                                   x: 30,
//                                 }}
//                                 animate={{
//                                   opacity: 1,
//                                   scale: 1,
//                                   x: 0,
//                                 }}
//                                 exit={{
//                                   opacity: 0,
//                                   scale: 0.9,
//                                   x: 30,
//                                 }}
//                                 transition={{
//                                   duration: 0.25,
//                                 }}
//                                 className="
//               absolute
//               right-5
//               top-1/2
//               z-50
//               h-32
//               w-50
//               -translate-y-1/2
//               overflow-hidden
//               rounded-2xl
//               border
//               border-zinc-700
//               shadow-2xl
//             "
//                               >
//                                 <img
//                                   src={project.image}
//                                   alt={project.title}
//                                   className="h-full w-full object-cover"
//                                 />

//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 }
//               >
//                 <Work />
//               </Card>
//             </div>

//             {/* CONTACT */}
//             <div className="relative h-20">
//               {" "}
//               <Card
//                 id="contact"
//                 active={active === "contact"}
//                 onClick={() => setActive("contact")}
//                 onClose={() => setActive("")}
//                 header={
//                   <div
//                     className={`${
//                       active === "contact" ? "hidden" : ""
//                     } flex items-center px-5 py-4`}
//                   >
//                     <h1 className="text-2xl font-semibold text-white">
//                       Contact
//                     </h1>

//                     <div className="mx-4 h-px flex-1 bg-zinc-800" />

//                     <Globe2 className="h-5 w-5 text-zinc-500" />
//                   </div>
//                 }
//               >
//                 <Contact />
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
