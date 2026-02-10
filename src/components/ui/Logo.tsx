import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LogoProps {
  isScrolled?: boolean;
}

const WORD_LOGOS = {
  green: "/logos/word/Green Logo.png",
  white: "/logos/word/White Logo.png",
};

const DIVISION_LOGOS = [
  "/logos/divisions/Foundation.png",
  "/logos/divisions/Ground Improvment.png",
  "/logos/divisions/Infrastructure.png",
  "/logos/divisions/Marine.png",
  "/logos/divisions/Equipment.png",
  "/logos/divisions/SE.png",
];

export const Logo = ({ isScrolled = false }: LogoProps) => {
  const [divisionIndex, setDivisionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDivisionIndex((prev) => (prev + 1) % DIVISION_LOGOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const divisionLogoSrc = DIVISION_LOGOS[divisionIndex];

  return (
    <Link
      to="/"
      className="flex flex-col items-center gap-0 -my-4 relative z-50 group"
    >
      <div className="relative h-20 md:h-28 w-auto flex items-center justify-center">
        {/* White Logo - Visible when NOT scrolled */}
        <motion.img
          src={WORD_LOGOS.white}
          alt="Alrabat"
          initial={{ opacity: 1 }}
          animate={{ opacity: isScrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 h-full w-auto object-contain"
        />
        {/* Green Logo - Visible when scrolled */}
        {/* We keep this one relative to define the container's width */}
        <motion.img
          src={WORD_LOGOS.green}
          alt="Alrabat"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative h-full w-auto object-contain"
          style={{ opacity: isScrolled ? 1 : 0 }} // Ensure initial state match
        />
      </div>

      <div className="relative h-20 md:h-28 w-full -mt-14 md:-mt-20 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={divisionIndex}
            src={divisionLogoSrc}
            alt="Alrabat Division"
            initial={{ opacity: 0, y: 8, filter: "blur(4px)", x: "-50%" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", x: "-50%" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)", x: "-50%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full w-auto object-contain absolute left-1/2"
          />
        </AnimatePresence>
      </div>
    </Link>
  );
};
