"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePortfolio } from "@/components/PortfolioProvider";

type SliderItem = { name: string; role: string; text: string; avatar: string };

const isImageUrl = (value: string) => /^(https?:\/\/|\/)/i.test(value);

export default function TestimonialSlider({ items, reverse = false }: {
  items?: SliderItem[];
  reverse?: boolean;
}) {
  const { testimonials } = usePortfolio();
  const displayItems = items ?? testimonials;
  const trackRef = useRef<HTMLDivElement>(null);
  const translation = useMotionValue(0);
  const cards = [...displayItems, ...displayItems];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstSetWidth = track.scrollWidth / 2;
    const controls = animate(
      translation,
      reverse ? [-firstSetWidth, 0] : [0, -firstSetWidth],
      {
        ease: "linear",
        duration: 26,
        repeat: Infinity,
        repeatType: "loop",
        onRepeat: () => translation.set(reverse ? -firstSetWidth : 0),
      },
    );
    return () => controls.stop();
  }, [translation, reverse, displayItems]);

  return (
    <div className="overflow-hidden" aria-label="Testimonials">
      <motion.div
        ref={trackRef}
        style={{ x: translation }}
        className="flex w-max gap-3 py-2"
        whileHover={{ scale: 0.995 }}
      >
        {cards.map((testimonial, index) => (
          <article
            key={`${testimonial.name}-${index}`}
            className="w-[285px] shrink-0 rounded-2xl border border-zinc-800 bg-black/20 p-6"
          >
            <p className="min-h-24 text-sm leading-7 text-zinc-300">
              “{testimonial.text}”
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-zinc-800 pt-4">
              {isImageUrl(testimonial.avatar) ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="size-9 rounded-full object-cover"
                />
              ) : (
                <span className="grid size-9 place-items-center rounded-full bg-zinc-800 text-xs text-zinc-300">
                  {testimonial.avatar}
                </span>
              )}
              <div>
                <p className="text-sm font-medium text-white">
                  {testimonial.name}
                </p>
                <p className="text-xs text-zinc-500">{testimonial.role}</p>
              </div>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  );
}
