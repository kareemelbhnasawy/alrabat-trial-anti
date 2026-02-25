import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [divisionIndex, setDivisionIndex] = useState(0);

  // Map slugs to logo indices based on DIVISION_LOGOS order:
  // 0: Foundation
  // 1: Ground Improvement
  // 2: Infrastructure
  // 3: Marine
  // 4: Equipment
  // 5: SE (Specialized Engineering)
  const slugToIndex: Record<string, number> = {
    foundations: 0,
    "ground-improvement": 1,
    infrastructure: 2,
    marine: 3,
    equipment: 4,
    "specialized-engineering": 5,
  };

  useEffect(() => {
    // Check if we are on a division detail page
    const pathParts = location.pathname.split("/");
    const isDivisionDetail =
      pathParts[1] === "divisions" && pathParts[2] && pathParts[2] !== "";

    if (isDivisionDetail) {
      const slug = pathParts[2];
      if (slugToIndex[slug] !== undefined) {
        setDivisionIndex(slugToIndex[slug]);
        return; // Pause animation
      }
    }

    const interval = setInterval(() => {
      setDivisionIndex((prev) => (prev + 1) % DIVISION_LOGOS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [location.pathname]);

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
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="h-full w-auto object-contain absolute left-1/2"
          />
        </AnimatePresence>
      </div>
    </Link>
  );
};
