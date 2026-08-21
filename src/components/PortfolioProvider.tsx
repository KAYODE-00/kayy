"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import * as SiIcons from "react-icons/si";
import * as defaults from "@/data/data";

type PortfolioData = typeof defaults;
type PortfolioContextValue = PortfolioData & { rotatingWord: string; rotatingAlias: string };

const fallbackSocialIcons: Record<string, unknown> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  X: FaXTwitter,
  "X (Twitter)": FaXTwitter,
  Email: MdEmail,
  Instagram: FaInstagram,
};

const fallbackToolIcons: Record<string, unknown> = {
  React: SiIcons.SiReact,
  "Next.js": SiIcons.SiNextdotjs,
  TypeScript: SiIcons.SiTypescript,
  JavaScript: SiIcons.SiJavascript,
  "Tailwind CSS": SiIcons.SiTailwindcss,
  MongoDB: SiIcons.SiMongodb,
  PostgreSQL: SiIcons.SiPostgresql,
  Prisma: SiIcons.SiPrisma,
  Firebase: SiIcons.SiFirebase,
  Supabase: SiIcons.SiSupabase,
  Docker: SiIcons.SiDocker,
  Git: SiIcons.SiGit,
  GitHub: SiIcons.SiGithub,
  Figma: SiIcons.SiFigma,
  Vercel: SiIcons.SiVercel,
  "Framer Motion": SiIcons.SiFramer,
  "Node.js": SiIcons.SiNodedotjs,
  Express: SiIcons.SiExpress,
  Stripe: SiIcons.SiStripe,
  LangChain: SiIcons.SiLangchain,
  "Hugging Face": SiIcons.SiHuggingface,
  Python: SiIcons.SiPython,
  FastAPI: SiIcons.SiFastapi,
  Redis: SiIcons.SiRedis,
};

const normalizeIcon = (value: unknown) =>
  typeof value === "function" ? value : undefined;

const resolveNamedIcon = (name: string | undefined, map: Record<string, unknown>, fallback: unknown) => {
  const candidate = name ? map[name] : undefined;
  return normalizeIcon(candidate) ?? normalizeIcon(fallback);
};

const PortfolioContext = createContext<PortfolioContextValue>({ ...defaults, rotatingWord: defaults.about.rotatingWords[0], rotatingAlias: defaults.about.rotatingAlias[0] });

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaults);
  const [roleIndex, setRoleIndex] = useState(0);

  const roleWords = data.about.rotatingWords?.length ? data.about.rotatingWords : ["software engineer"];

  useEffect(() => {
    setRoleIndex((current) => current % roleWords.length);
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % roleWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roleWords.length]);

  useEffect(() => {
    fetch("/api/portfolio-data")
      .then((response) => response.ok ? response.json() : null)
      .then((remote) => {
        if (!remote) return;
        setData((current) => ({
          ...current,
          ...remote,
          about: { ...current.about, ...(remote.about ?? {}) },
          socials: (remote.socials ?? current.socials).map((item: any, index: number) => ({
            ...current.socials[index],
            ...item,
            icon: resolveNamedIcon(
              item.name,
              fallbackSocialIcons,
              current.socials.find((social) => social.name === item.name)?.icon ?? current.socials[index]?.icon,
            ),
          })),
          tools: (remote.tools ?? current.tools).map((item: any, index: number) => ({
            ...current.tools[index],
            ...item,
            icon: resolveNamedIcon(
              item.name,
              fallbackToolIcons,
              current.tools.find((tool) => tool.name === item.name)?.icon ?? current.tools[index]?.icon,
            ),
          })),
          projects: (remote.projects ?? current.projects).map((project: any, index: number) => ({
            ...current.projects[index],
            ...project,
            stack: (project.stack ?? current.projects[index]?.stack ?? []).map((tool: any, stackIndex: number) => ({
              ...current.projects[index]?.stack?.[stackIndex],
              ...tool,
              icon: resolveNamedIcon(
                tool.name,
                fallbackToolIcons,
                current.projects[index]?.stack?.find((entry) => entry.name === tool.name)?.icon ?? current.projects[index]?.stack?.[stackIndex]?.icon,
              ),
            })),
          })),
        }));
      })
      .catch(() => undefined);
  }, []);

  const aliasWords = data.about.rotatingAlias?.length ? data.about.rotatingAlias : roleWords;
  return <PortfolioContext.Provider value={{ ...data, rotatingWord: roleWords[roleIndex], rotatingAlias: aliasWords[roleIndex % aliasWords.length] }}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
