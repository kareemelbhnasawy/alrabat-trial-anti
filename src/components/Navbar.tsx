import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import divisionsData from "../data/divisions.json";

const NAV_LINKS = [
  { name: "About", href: "", hasDropdown: true },
  { name: "Divisions", href: "", hasDropdown: true },
  { name: "Clients", href: "/clients" },
  { name: "Projects", href: "/projects" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "", hasDropdown: true },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHoveredLink(null);
  }, [location.pathname]);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <div className="container-custom flex items-center justify-between">
        <Logo isScrolled={isScrolled || isOpen} />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.hasDropdown && setHoveredLink(link.name)}
              onMouseLeave={() => link.hasDropdown && setHoveredLink(null)}
            >
              {link.href ? (
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    clsx(
                      "text-sm font-medium tracking-wide transition-colors hover:text-accent flex items-center gap-1",
                      isActive ||
                        (link.hasDropdown &&
                          location.pathname.startsWith("/divisions"))
                        ? "text-accent"
                        : isScrolled
                          ? "text-primary/80"
                          : "text-white"
                    )
                  }
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        hoveredLink === link.name ? "rotate-180" : ""
                      )}
                    />
                  )}
                </NavLink>
              ) : (
                <div
                  className={clsx(
                    "text-sm font-medium tracking-wide transition-colors hover:text-accent flex items-center gap-1 cursor-default",
                    link.hasDropdown &&
                      location.pathname.startsWith("/divisions")
                      ? "text-accent"
                      : isScrolled
                        ? "text-primary/80"
                        : "text-white"
                  )}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        hoveredLink === link.name ? "rotate-180" : ""
                      )}
                    />
                  )}
                </div>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.hasDropdown && hoveredLink === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 10, x: "-50%" }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 pt-4 z-50 min-w-max"
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-neutral-100 overflow-hidden p-1 flex flex-col gap-0.5 w-60">
                      {link.name === "About" && (
                        <>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/about/story");
                              setHoveredLink(null);
                            }}
                            className="w-full px-4 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-neutral-50 rounded-md flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full mr-3 bg-primary transition-transform group-hover:scale-125" />
                            <div className="font-bold text-xs uppercase tracking-wider text-left text-neutral-900 group-hover:text-primary transition-colors">
                              Our Story
                            </div>
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/about/team");
                              setHoveredLink(null);
                            }}
                            className="w-full px-4 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-neutral-50 rounded-md flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full mr-3 bg-primary transition-transform group-hover:scale-125" />
                            <div className="font-bold text-xs uppercase tracking-wider text-left text-neutral-900 group-hover:text-primary transition-colors">
                              Our Team
                            </div>
                          </div>
                        </>
                      )}

                      {link.name === "Divisions" && (
                        <>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/divisions");
                              setHoveredLink(null);
                            }}
                            className="w-full px-4 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-neutral-50 rounded-md flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full mr-3 bg-primary transition-transform group-hover:scale-125" />
                            <div className="font-bold text-xs uppercase tracking-wider text-left text-neutral-900 group-hover:text-primary transition-colors">
                              All Divisions
                            </div>
                          </div>
                          {divisionsData.map((division) => (
                            <div
                              key={division.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/divisions/${division.slug}`);
                                setHoveredLink(null);
                              }}
                              className="w-full px-4 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-neutral-50 rounded-md flex items-center group"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mr-3 transition-transform group-hover:scale-125"
                                style={{
                                  backgroundColor:
                                    division.accentColor || "#F05B22",
                                }}
                              />
                              <div className="font-bold text-xs uppercase tracking-wider text-left text-neutral-600 group-hover:text-neutral-900 transition-colors">
                                {division.name}
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                      {link.name === "Contact" && (
                        <>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/contact");
                              setHoveredLink(null);
                            }}
                            className="w-full px-4 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-neutral-50 rounded-md flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full mr-3 bg-primary transition-transform group-hover:scale-125" />
                            <div className="font-bold text-xs uppercase tracking-wider text-left text-neutral-900 group-hover:text-primary transition-colors">
                              Project Inquiry
                            </div>
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/careers");
                              setHoveredLink(null);
                            }}
                            className="w-full px-4 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-neutral-50 rounded-md flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full mr-3 bg-primary transition-transform group-hover:scale-125" />
                            <div className="font-bold text-xs uppercase tracking-wider text-left text-neutral-900 group-hover:text-primary transition-colors">
                              Careers
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Button size="sm" onClick={() => (window.location.href = "/contact")}>
            Request Proposal
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={clsx(
            "lg:hidden transition-colors",
            isScrolled || isOpen ? "text-primary" : "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
          >
            <div className="container-custom py-8 flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <div key={link.name}>
                  {link.href ? (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        clsx(
                          "text-lg font-medium py-2 border-b border-neutral-50 block",
                          isActive ? "text-accent" : "text-primary"
                        )
                      }
                      onClick={() => !link.hasDropdown && setIsOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <div
                      className={clsx(
                        "text-lg font-medium py-2 border-b border-neutral-50 block",
                        (link.name === "Divisions" &&
                          location.pathname.startsWith("/divisions")) ||
                          (link.name === "About" &&
                            location.pathname.startsWith("/about")) ||
                          (link.name === "Contact" &&
                            (location.pathname.startsWith("/contact") ||
                              location.pathname.startsWith("/careers")))
                          ? "text-accent"
                          : "text-primary"
                      )}
                    >
                      {link.name}
                    </div>
                  )}
                  {link.hasDropdown && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-neutral-100 ml-1">
                      {link.name === "About" && (
                        <>
                          <div
                            onClick={() => {
                              navigate("/about/story");
                              setIsOpen(false);
                            }}
                            className="text-primary/80 py-1 cursor-pointer font-medium hover:text-accent transition-colors"
                          >
                            Our Story
                          </div>
                          <div
                            onClick={() => {
                              navigate("/about/team");
                              setIsOpen(false);
                            }}
                            className="text-primary/80 py-1 cursor-pointer font-medium hover:text-accent transition-colors"
                          >
                            Our Team
                          </div>
                        </>
                      )}

                      {link.name === "Divisions" && (
                        <>
                          <div
                            onClick={() => {
                              navigate("/divisions");
                              setIsOpen(false);
                            }}
                            className="text-primary/80 py-1 cursor-pointer font-medium hover:text-accent transition-colors"
                          >
                            All Divisions
                          </div>
                          {divisionsData.map((division) => (
                            <div
                              key={division.id}
                              onClick={() => {
                                navigate(`/divisions/${division.slug}`);
                                setIsOpen(false);
                              }}
                              className="text-primary/80 py-1 cursor-pointer font-medium hover:text-accent transition-colors"
                              style={{ borderLeftColor: division.accentColor }}
                            >
                              <span
                                style={{ color: division.accentColor }}
                                className="mr-2"
                              >
                                ●
                              </span>{" "}
                              {division.name}
                            </div>
                          ))}
                        </>
                      )}

                      {link.name === "Contact" && (
                        <>
                          <div
                            onClick={() => {
                              navigate("/contact");
                              setIsOpen(false);
                            }}
                            className="text-primary/80 py-1 cursor-pointer font-medium hover:text-accent transition-colors"
                          >
                            Project Inquiry
                          </div>
                          <div
                            onClick={() => {
                              navigate("/careers");
                              setIsOpen(false);
                            }}
                            className="text-primary/80 py-1 cursor-pointer font-medium hover:text-accent transition-colors"
                          >
                            Careers
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button
                  className="w-full"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Request Proposal
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
