"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* LOGO */}
      <motion.div
        className="logo"
        whileHover={{ scale: 1.1, rotate: -2 }}
      >
        DRIVE
      </motion.div>

      {/* LINKS */}
      <div className="nav-links">
        {["Home", "Cars", "Models", "Contact"].map((item) => (
          <motion.a
            key={item}
            href="#"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {item}
          </motion.a>
        ))}
      </div>

      {/* CTA BUTTON */}
      <motion.button
        className="cta"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        Book Test Drive
      </motion.button>
    </motion.nav>
  );
}
