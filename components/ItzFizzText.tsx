"use client";

import { motion, Variants } from "framer-motion";

export default function ItzFizzText() {
  const text = "itzFizz".split("");

  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotateX: -90,
      scale: 0.5 
    },
    visible: (index: number) => ({
      opacity: 1,
      y: [0, -35, 0], // floating wave
      rotateX: 0,
      scale: [1, 1.15, 1], // pulsating size
      color: ["#ffffff", "#00e5ff", "#ffffff"], // glowing cyan wave
      textShadow: [
        "0px 10px 30px rgba(0, 0, 0, 0.8)",
        "0px 20px 60px rgba(0, 229, 255, 0.9)",
        "0px 10px 30px rgba(0, 0, 0, 0.8)"
      ],
      transition: {
        // Entrance animations
        opacity: { duration: 0.8, delay: index * 0.15 },
        rotateX: { duration: 0.8, delay: index * 0.15, type: "spring" },
        // Continuous looped animations
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 },
        color: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 },
        textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 },
      }
    })
  };

  return (
    <div style={styles.container}>
      {text.map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={styles.char as React.CSSProperties}
          whileHover={{
            y: -20,
            scale: 1.3,
            color: "#ffdd00",
            textShadow: "0px 30px 60px rgba(255, 221, 0, 1)",
            transition: { duration: 0.3 }
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "inline-flex",
    background: "transparent",
    cursor: "pointer",
    perspective: "1000px", // Adds 3D depth to the rotateX entrance!
  },
  char: {
    // Doubled the text size from the previous version
    fontSize: "clamp(4rem, 12vw, 10rem)",
    fontWeight: "900",
    letterSpacing: "4px",
    display: "inline-block", // Required for physics transforms like y/scale on spans
  },
};
