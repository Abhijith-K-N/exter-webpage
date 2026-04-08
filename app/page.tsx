"use client";

import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import CarScrollCanvas from "@/components/CarScrollCanvas";
import Navbar from "@/components/Navbar";
import ItzFizzText from "@/components/ItzFizzText";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // 300vh scroll space restores the smooth animation feel
    <div ref={containerRef} style={{ position: "relative", height: "190vh", background: "#000" }}>

      {/* The Requested Navbar Component */}
      <Navbar />

      {/* Scroll-driven Canvas */}
      <CarScrollCanvas scrollYProgress={scrollYProgress} />

      {/* Animated Text Overlay - Strictly Bottom Right */}
      <div 
        className="fixed z-[100] pointer-events-auto flex items-end justify-end"
        style={{ bottom: "2rem", right: "2rem" }}
      >
        <ItzFizzText />
      </div>

    </div>
  );
}
