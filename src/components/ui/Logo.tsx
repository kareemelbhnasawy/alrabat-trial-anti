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

  const wordLogoSrc = isScrolled ? WORD_LOGOS.green : WORD_LOGOS.white;
  const divisionLogoSrc = DIVISION_LOGOS[divisionIndex];

  return (
    <Link
      to="/"
      className="flex flex-col items-center gap-0 w-72 md:w-96 -my-4"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={isScrolled ? "green" : "white"}
          src={wordLogoSrc}
          alt="Alrabat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-20 md:h-28 w-auto object-contain"
        />
      </AnimatePresence>
      <div className="relative h-20 md:h-28 w-full -mt-16 md:-mt-20">
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
