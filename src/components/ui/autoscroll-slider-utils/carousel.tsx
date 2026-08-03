"use client";

import EmblaCarousel from "embla-carousel";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type CarouselProps = ComponentPropsWithoutRef<"div"> & {
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
};

export function Carousel({ options, plugins, className, children, ...props }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewportRef.current) return;
    const embla = EmblaCarousel(viewportRef.current, options, plugins);
    return () => embla.destroy();
  }, [options, plugins]);

  return (
    <div ref={viewportRef} className={`overflow-hidden ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}

export function SliderContainer({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={`flex ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}

export function Slider({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={`shrink-0 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}

export function SliderDotButton({
  selected,
  onClick,
  ...props
}: ComponentPropsWithoutRef<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-label="Go to slide"
      aria-current={selected}
      onClick={onClick}
      className={`size-2 rounded-full ${selected ? "bg-foreground" : "bg-foreground/30"}`}
      {...props}
    />
  );
}
