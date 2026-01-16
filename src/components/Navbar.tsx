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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
            ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container-custom flex items-center justify-between relative px-6 md:px-12">
          {/* Left: Hamburger Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className={clsx(
              "p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors group",
              isScrolled || isOpen ? "text-primary" : "text-white"
            )}
            aria-label="Open Menu"
          >
            <Menu
              size={32}
              className="group-hover:scale-105 transition-transform"
            />
          </button>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo isScrolled={isScrolled || isOpen} />
          </div>

          {/* Right: Search Trigger */}
          <button
            onClick={() => setIsOpen(true)} // Opens same overlay for now, as search is inside
            className={clsx(
              "p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors group",
              isScrolled || isOpen ? "text-primary" : "text-white"
            )}
            aria-label="Search"
          >
            <Search
              size={28}
              className="group-hover:scale-105 transition-transform"
            />
          </button>
        </div>
      </nav>

      {/* Full Screen Navigation Overlay */}
      <NavigationOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
