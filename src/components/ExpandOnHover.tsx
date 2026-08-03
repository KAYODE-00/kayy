"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import type { EmblaOptionsType } from "embla-carousel";
import {
  Carousel,
  Slider,
  SliderContainer,
} from "@/components/ui/autoscroll-slider-utils/carousel";
import { usePortfolio } from "@/components/PortfolioProvider";



export function Skiper52() {
  const { projects } = usePortfolio();
  const options: EmblaOptionsType = { loop: true, align: "center" };

  return (
    <Carousel
      options={options}
      plugins={[
        AutoScroll({
          speed: 1.5,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          startDelay: 100,
        }),
      ]}
      className="mx-auto h-100  w-full  overflow-hidden "
    >
      <SliderContainer className="gap-5 h-full  bg-black text-md md:text-3xl">
        {projects.map((project) => (
          <Slider
            key={project.title}
            className="relative min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] overflow-hidden rounded-xl bg-zinc-900  uppercase"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full  object-cover "
            />

            {/* Centered the text just in case, but you can change this back to just p-4 */}
            <div className="relative z-10 flex h-full items-end p-6">
              <p className="text-white font-bold">{project.title}</p>
            </div>
          </Slider>
        ))}
      </SliderContainer>
    </Carousel>
  );
}
