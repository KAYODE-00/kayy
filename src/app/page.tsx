"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "@/components/Card";
import About from "@/components/About";
import Work from "@/components/Work";

export default function Home() {
  const [active, setActive] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 md:p-10">
      <div className="flex items-center justify-center h-100  w-full max-w-7xl grid-cols-3 grid-rows-2 gap-4">
        {/* ABOUT */}
        <div
          className={`${active === "about" && " bottom-34 -ml-33 md:-ml-130 "} relative col-span-2 row-span-2 h-full `}
        >
          <Card
            id="about"
            active={active === "about"}
            onClick={() => setActive("about")}
            onClose={() => setActive("")}
            header={
              <div className={` ${active === "about" && " hidden "} `}>
                <div>
                  <img src="/developer.png" alt="" className="h-50" />
                </div>
                <div className="rounded-2xl  p-5 font-mono text-sm leading-7">
                  <h1 className="text-2xl font-bold text-white">
                    Hi, I'm Kayode
                  </h1>
                  <p className="mt-3 text-zinc-400">
                    He who codes, learns, and creates.
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
          <div
            className={`${active === "work" && " bottom-34 "} relative h-100`}
          >
            <Card
              id="work"
              active={active === "work"}
              onClick={() => setActive("work")}
              onClose={() => setActive("")}
              header={
                <div>
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
  <Work/>
            </Card>
          </div>

          {/* CONTACT */}
          <div className={`${active && "top-30 "} relative h-20`}>
            {" "}
            <Card
              id="contact"
              active={active === "contact"}
              onClick={() => setActive("contact")}
              onClose={() => setActive("")}
              header={
                <div className="rounded-2xl bg-zinc-900 p-5 font-mono text-sm leading-7">
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
              <h2 className="mb-6 text-3xl font-bold text-white">
                Let's Connect
              </h2>

              <div className="space-y-3 text-zinc-300">
                <p>📧 kayode@email.com</p>
                <p>💼 LinkedIn</p>
                <p>🐙 GitHub</p>
                <p>𝕏 Twitter</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
