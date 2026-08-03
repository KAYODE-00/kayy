"use client";

import { useEffect, useRef } from "react";

export default function MosaicPortrait({ imageUrl = "/developer.PNG" }: { imageUrl?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onerror = () => {
      image.onerror = null;
      image.crossOrigin = "";
      image.src = imageUrl;
    };
    image.src = imageUrl;
    image.decoding = "async";

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let sourceCanvas: HTMLCanvasElement;
    let sourceContext: CanvasRenderingContext2D;
    let sourceData: ImageData;
    let canProcessPixels = true;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(bounds.width * ratio));
      height = Math.max(1, Math.floor(bounds.height * ratio));
      canvas.width = width;
      canvas.height = height;
      sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = width;
      sourceCanvas.height = height;
      sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true })!;
      const scale = Math.max(width / image.width, height / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      sourceContext.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      try {
        sourceData = sourceContext.getImageData(0, 0, width, height);
        canProcessPixels = true;
      } catch {
        canProcessPixels = false;
      }
    };

    const render = (time: number) => {
      if (!sourceData) {
        if (!canProcessPixels) {
          context.clearRect(0, 0, width, height);
          const scale = Math.max(width / image.width, height / image.height);
          const drawWidth = image.width * scale;
          const drawHeight = image.height * scale;
          context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
          animationFrame = requestAnimationFrame(render);
          return;
        }
        animationFrame = requestAnimationFrame(render);
        return;
      }
      const cellSize = Math.max(8, Math.round(width / 42));
      context.fillStyle = "#090909";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      context.font = `${Math.max(8, cellSize * 0.9)}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          let red = 0;
          let green = 0;
          let blue = 0;
          let count = 0;
          for (let sampleY = y; sampleY < Math.min(y + cellSize, height); sampleY += 2) {
            for (let sampleX = x; sampleX < Math.min(x + cellSize, width); sampleX += 2) {
              const index = (sampleY * width + sampleX) * 4;
              red += sourceData.data[index];
              green += sourceData.data[index + 1];
              blue += sourceData.data[index + 2];
              count += 1;
            }
          }
          red /= count;
          green /= count;
          blue /= count;
          const luminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
          const wave = Math.sin(time * 0.0018 + x * 0.025 + y * 0.018) * 0.12;
          const radius = Math.max(1, cellSize * (0.18 + luminance * 0.68 + wave));
          const centerX = x + cellSize / 2;
          const centerY = y + cellSize / 2;
          const colorBoost = 0.55 + luminance * 0.55;
          context.fillStyle = `rgb(${Math.min(255, Math.round(red * colorBoost))}, ${Math.min(255, Math.round(green * colorBoost))}, ${Math.min(255, Math.round(blue * colorBoost))})`;
          context.fillRect(centerX - radius / 2, centerY - radius / 2, radius, radius);
        }
      }

      const vignette = context.createRadialGradient(width / 2, height / 45, width * 0.12, width / 2, height / 2, width * 0.72);
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(0,0,0,.78)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
      context.fillStyle = "rgba(255,255,255,.045)";
      for (let line = 0; line < height; line += Math.max(3, cellSize / 2)) context.fillRect(0, line, width, 1);
      animationFrame = requestAnimationFrame(render);
    };

    image.onload = () => {
      resize();
      animationFrame = requestAnimationFrame(render);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} aria-label="Animated mosaic portrait of Kayode" className="h-full w-full" />;
}
