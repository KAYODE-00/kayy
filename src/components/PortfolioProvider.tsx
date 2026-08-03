"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as defaults from "@/data/data";

type PortfolioData = typeof defaults;

const PortfolioContext = createContext<PortfolioData>(defaults);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaults);

  useEffect(() => {
    fetch("/api/portfolio-data")
      .then((response) => response.ok ? response.json() : null)
      .then((remote) => {
        if (!remote) return;
        setData((current) => ({
          ...current,
          ...remote,
          socials: (remote.socials ?? current.socials).map((item: any, index: number) => ({
            ...current.socials[index],
            ...item,
            icon: current.socials.find((social) => social.name === item.name)?.icon ?? current.socials[index]?.icon,
          })),
          tools: (remote.tools ?? current.tools).map((item: any, index: number) => ({
            ...current.tools[index],
            ...item,
            icon: current.tools.find((tool) => tool.name === item.name)?.icon ?? current.tools[index]?.icon,
          })),
          projects: (remote.projects ?? current.projects).map((project: any, index: number) => ({
            ...current.projects[index],
            ...project,
            stack: (project.stack ?? current.projects[index]?.stack ?? []).map((tool: any, stackIndex: number) => ({
              ...current.projects[index]?.stack?.[stackIndex],
              ...tool,
              icon: current.projects[index]?.stack?.find((entry) => entry.name === tool.name)?.icon ?? current.projects[index]?.stack?.[stackIndex]?.icon,
            })),
          })),
        }));
      })
      .catch(() => undefined);
  }, []);

  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
