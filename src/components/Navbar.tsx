import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Logo } from "./ui/Logo";
import { clsx } from "clsx";
import { NavigationOverlay } from "./NavigationOverlay";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const nextIsScrolled = window.scrollY > 20;
        setIsScrolled((prev) =>
          prev === nextIsScrolled ? prev : nextIsScrolled,
        );
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || isOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4"
            : "bg-transparent py-4 md:py-6",
        )}
      >
        <div className="container-custom flex items-center justify-between relative px-4 md:px-12">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo isScrolled={isScrolled || isOpen} />
          </div>

          {/* Right: Search & Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className={clsx(
                "p-2 rounded-full hover:bg-white/10 transition-colors group",
                isScrolled || isOpen ? "text-primary" : "text-white",
              )}
              aria-label="Search"
            >
              <Search
                size={24}
                className="group-hover:scale-105 transition-transform"
              />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className={clsx(
                "p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors group",
                isScrolled || isOpen
                  ? "text-primary dark:text-primary"
                  : "text-white",
              )}
              aria-label="Open Menu"
            >
              {/* 3 lines / Menu Icon */}
              <Menu
                size={32}
                className="group-hover:scale-105 transition-transform"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Navigation Overlay */}
      <NavigationOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
