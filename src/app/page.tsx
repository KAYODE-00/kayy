"use client";

import { useState } from "react";
import Card from "@/components/Card";

export default function Home() {
  const [active, setActive] = useState("");

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-10">
      <div className="grid grid-cols-3 grid-rows-2 gap-6 max-w-7xl w-full">
        {/* ABOUT */}
        <div className="relative col-span-2 row-span-2 h-[520px]">
          <Card
            id="about"
            title="About"
            active={active === "about"}
            onClick={() => setActive("about")}
            onClose={() => setActive("")}
          >
            <h1 className="text-5xl font-bold text-white">
              Hi, I'm Kayode 👋
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Full Stack Developer passionate about building beautiful,
              interactive and performant web applications with Next.js,
              React and TypeScript.
            </p>
          </Card>
        </div>

        {/* WORK */}
        <div className="relative h-[250px]">
          <Card
            id="work"
            title="Work"
            active={active === "work"}
            onClick={() => setActive("work")}
            onClose={() => setActive("")}
          >
            <div className="space-y-5">
              <div className="rounded-xl bg-zinc-900 p-5">
                Portfolio Website
              </div>

              <div className="rounded-xl bg-zinc-900 p-5">
                AI Dashboard
              </div>

              <div className="rounded-xl bg-zinc-900 p-5">
                SaaS Landing Page
              </div>
            </div>
          </Card>
        </div>

        {/* CONTACT */}
        <div className="relative h-[250px]">
          <Card
            id="contact"
            title="Contact"
            active={active === "contact"}
            onClick={() => setActive("contact")}
            onClose={() => setActive("")}
          >
            <div className="space-y-4 text-white">
              <p>📧 kayode@email.com</p>
              <p>💼 linkedin.com/in/kayode</p>
              <p>🐙 github.com/KAYODE-00</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}