import {
  socials,
  tools,
  builds,
  about,
  stats,
  testimonials,
} from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import TestimonialSlider from "@/components/TestimonialSlider";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  const [buildIndex, setBuildIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildIndex((prev) => (prev + 1) % builds.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex items-center justify-center  mx-auto w-full  py-12 md:px-6 md:py-20">
      {/* MAIN GRID */}
      <div className="">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-5 rounded-2xl bg-zinc-900 p-6 md:col-span-2 md:gap-8 md:rounded-3xl md:p-10"
        >
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.125em] text-zinc-500">
              {about.subHeading}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-4xl">
              {about.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg">
              {about.description}
            </p>

            {/* Stats */}
            {/* <div className="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="min-w-[110px] flex-1 rounded-xl border border-transparent bg-black/20 p-4 transition-colors hover:border-zinc-700 sm:rounded-2xl sm:p-6"
                >
                  <h2 className="text-2xl font-bold text-white sm:text-4xl">
                    {stat.number}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div> */}

            {/* I Build (Animated Text) */}
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/20 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-zinc-400 sm:text-base">
                {about.iBuildText}
              </h3>
              <div className="mt-3 h-8 overflow-hidden sm:h-10 sm:mt-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={builds[buildIndex]}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-medium text-zinc-200 sm:text-2xl"
                  >
                    {builds[buildIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
