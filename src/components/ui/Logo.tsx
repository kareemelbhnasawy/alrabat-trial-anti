import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LogoProps {
  isScrolled?: boolean;
}

const LOGOS = [
  {
    light:
      "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos/Alrabat%20Division%20Logo%20AI%20-01.png",
    dark: "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos-dark/Alrabat-Foundation%20PNG.png",
  },
  {
    light:
      "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos/Alrabat%20Division%20Logo%20AI%20-02.png",
    dark: "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos-dark/Alrabat-Ground%20Improvement%20PNG.png",
  },
  {
    light:
      "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos/Alrabat%20Division%20Logo%20AI%20-03.png",
    dark: "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos-dark/Alrabat-Infrastructure%20PNG.png",
  },
  {
    light:
      "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos/Alrabat%20Division%20Logo%20AI%20-04.png",
    dark: "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos-dark/Alrabat-Marine%20PNG.png",
  },
  {
    light:
      "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos/Alrabat%20Division%20Logo%20AI%20-05.png",
    dark: "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos-dark/Alrabat-Equipment%20PNG.png",
  },
  {
    light:
      "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos/Alrabat%20Division%20Logo%20AI%20-06.png",
    dark: "https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/logos-dark/Alrabat-SE%20PNG.png",
  },
];

export const Logo = ({ isScrolled = false }: LogoProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOGOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentLogo = LOGOS[index];
  const logoSrc = isScrolled ? currentLogo.dark : currentLogo.light;

  return (
    <Link to="/" className="relative h-12 w-48 block">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={`${index}-${isScrolled ? "dark" : "light"}`}
          src={logoSrc}
          alt="Alrabat Division Logo"
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full w-full object-contain absolute inset-0 left-0"
        />
      </AnimatePresence>
    </Link>
  );
};
