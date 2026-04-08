"use client";

import React, { useEffect, useRef } from "react";
import { MotionValue, useTransform } from "framer-motion";

interface CarScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const FOLDER_PATH = "/images/ranger-khaki";
const TOTAL_FRAMES = 200;

export default function CarScrollCanvas({ scrollYProgress }: CarScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match canvas resolution to viewport
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const images: HTMLImageElement[] = [];
    let animationFrameId: number;

    // Draw a single frame onto the canvas (cover-fit)
    function drawFrame(frameNumber: number) {
      if (!ctx || !canvas) return;
      const image = images[frameNumber - 1];
      if (!image?.complete || image.naturalWidth === 0) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = image.naturalWidth / image.naturalHeight;

      let dw = canvas.width, dh = canvas.height, dx = 0, dy = 0;

      if (imgRatio > canvasRatio) {
        dw = canvas.height * imgRatio;
        dx = (canvas.width - dw) / 2;
      } else {
        dh = canvas.width / imgRatio;
        dy = (canvas.height - dh) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, dx, dy, dw, dh);
    }

    // Load all frames, throttled to avoid overwhelming the dev server
    const loadImages = async () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `${FOLDER_PATH}/${i}.jpg`;
        images.push(img);
        if (i === 1) img.onload = () => drawFrame(1);
        if (i % 5 === 0) await new Promise(r => setTimeout(r, 20));
      }
    };

    loadImages();

    // rAF loop — driven by scroll progress
    const render = () => {
      let f = Math.round(frameIndex.get());
      if (f < 1) f = 1;
      if (f > TOTAL_FRAMES) f = TOTAL_FRAMES;
      drawFrame(f);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      setSize();
      drawFrame(Math.round(frameIndex.get()) || 1);
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [frameIndex]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "block",
      }}
    />
  );
}
