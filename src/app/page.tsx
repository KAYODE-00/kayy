"use client";

import Image from "next/image";
import Card from "@/components/Card";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Home() {
  const [active, setActive] = useState("");
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
                className={`${active === "about" && " hidden "} relative col-span-2 row-span-2 h-full`}
              >
                <div>
                  <img src="/developer.png" alt="" className="h-50" />
                </div>
                <div className="rounded-2xl  p-5 font-mono text-sm leading-7">
                  <h1 className="text-2xl font-bold text-white">
                    Hi, I'm Kayode
                  </h1>
                  <p className="mt-3 flex items-center gap-1 text-zinc-400">
                    <span>He who</span>

                    <AnimatePresence mode="wait">
                      <motion.span
                        key={words[index]}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="font-medium text-white"
                      >
                        {words[index]}
                      </motion.span>
                    </AnimatePresence>

                 
                  </p>
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
                  {" "}
                  <Image
                    src="/projects/project1.png"
                    alt="Project Preview"
                    width={500}
                    height={300}
                    className="h-44 w-full rounded-2xl object-cover"
                  />
                  <p className="mt-3 font-mono text-zinc-400">
                    Featured Project
                  </p>
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
              header={
                <div className={`${active === "contact" && " hidden "}`}>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-blue-400">contact</span> = {"{"}
                  <br />
                  &nbsp;&nbsp;email:
                  <span className="text-green-400"> "kayode@email.com"</span>
                  ,
                  <br />
                  &nbsp;&nbsp;status:
                  <span className="text-green-400"> "Available"</span>
                  ,
                  <br />
                  {"}"}
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
