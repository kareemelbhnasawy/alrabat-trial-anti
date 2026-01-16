import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { useData } from "../context/DataContext";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationOverlay = ({
  isOpen,
  onClose,
}: NavigationOverlayProps) => {
  const navigate = useNavigate();
  const { divisions, projects, news } = useData();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  // Define Nav Structure based on "Old Nav" data
  const NAV_STRUCTURE = useMemo(
    () => [
      {
        name: "About",
        href: null, // No direct link, relies on sub-links
        subLinks: [
          { name: "Our Story", href: "/about/story" },
          { name: "Our Team", href: "/about/team" },
        ],
      },
      {
        name: "Divisions",
        href: "/divisions",
        subLinks: divisions.map((d) => ({
          name: d.name,
          href: `/divisions/${d.slug}`,
          accent: d.accentColor,
        })),
      },
      { name: "Clients", href: "/clients", subLinks: [] },
      { name: "Projects", href: "/projects", subLinks: [] },
      { name: "News", href: "/news", subLinks: [] },
      {
        name: "Contact",
        href: "/contact",
        subLinks: [
          { name: "Project Inquiry", href: "/contact" },
          { name: "Careers", href: "/careers" },
        ],
      },
    ],
    [divisions]
  );

  // Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    // Combine projects and news
    const pResults = projects
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((p) => ({ ...p, type: "Project", link: `/projects/${p.slug}` }));
    const nResults = news
      .filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((n) => ({ ...n, type: "News", link: `/news/${n.slug}` }));
    return [...pResults, ...nResults].slice(0, 6); // Limit to 6
  }, [searchQuery, projects, news]);

  // Determine what to show in Right Panel
  // Priority: Search Query > Active Hover > Default
  const currentSubLinks = useMemo(() => {
    if (activeCategory) {
      const cat = NAV_STRUCTURE.find((n) => n.name === activeCategory);
      return cat?.subLinks || [];
    }
    return [];
  }, [activeCategory, NAV_STRUCTURE]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"
            onClick={onClose}
          />

          {/* Left Panel - Blue/Primary - Navigation */}
          {/* Reference image shows Left Panel as Blue/Primary (Cyan) and Right as Deep Navy? 
             User said: "like the homepage but with our structure...". 
             Reference image: Left Blue, Right Dark. 
             Let's Use: Left = Brand Blue (Accent or Primary?), Right = Dark Navy (Primary Base).
             Actually user brand Primary is Navy (#202c39). Accent is Orange/Blue.
             Let's stick to: Left = Primary Navy, Right = Darker/Black or filtered.
             OR Left = White (Clean), Right = Navy (Contrast)?
             User request: "like the reference". Reference: Left Bright Blue, Right Dark Blue.
             I will use: Left = Primary (Navy), Right = Dark Neutral or Light? 
             Ref Image: Cyan Left, Navy Right. 
             I will try: Left = Primary (#202c39), Right = Darker (#1a242f) or Accent?
             Let's stick to the previous Clean Style (Left White, Right Navy) as it matches the rest of the site better unless forced.
             Wait, user said "like the reference image... but with our structure and theme". "Our Theme" is Navy/Orange/White.
             The previous iteration (Left White, Right Navy) was "Morgan Style". 
             I'll stick to Left White / Right Navy for contrast and legibility, but align items.
          */}
          <motion.div
            className="w-full md:w-1/2 h-full bg-white relative z-10 flex flex-col" // Left Panel White
            initial={{ x: "-100%" }}
            animate={{
              x: 0,
              transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
            }}
            exit={{
              x: "-100%",
              transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
            }}
          >
            {/* Header: Close Button (Fixed at top) */}
            <div className="flex-none p-8 md:p-12 lg:p-16">
              <button
                onClick={onClose}
                className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors group"
              >
                <X
                  size={32}
                  className="text-primary group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 md:px-16 lg:px-24 flex flex-col justify-start md:justify-center">
              {/* Mobile Search Input */}
              <div className="mt-0 mb-8 md:hidden">
                <div className="relative border-b border-neutral-200 pb-2 flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-primary text-xl w-full placeholder:text-primary/30 font-display font-medium"
                  />
                  <Search className="text-primary/50" size={24} />
                </div>
                {/* Mobile Search Results */}
                {searchQuery && (
                  <div className="mt-4 space-y-4 max-h-60 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((res: any) => (
                        <div
                          key={res.id}
                          onClick={() => handleNav(res.link)}
                          className="block text-lg text-neutral-600 font-medium font-display"
                        >
                          <span className="text-xs text-neutral-400 block mb-1 uppercase tracking-wide">
                            {res.type}
                          </span>
                          {res.title}
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-400 italic">
                        No results found.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <nav className="flex flex-col space-y-4">
                {NAV_STRUCTURE.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.1 + index * 0.05 },
                    }}
                  >
                    <div
                      className="group flex flex-col"
                      onMouseEnter={() => {
                        // Desktop: Hover sets active
                        if (window.innerWidth >= 768) {
                          setActiveCategory(item.name);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {/* The indicator line or active state */}
                        <span
                          className={`hidden md:block h-1 w-0 bg-accent mr-4 transition-all duration-300 ${activeCategory === item.name ? "w-12 md:w-16" : "group-hover:w-8"}`}
                        />

                        <button
                          onClick={() => {
                            const isMobile = window.innerWidth < 768;
                            if (isMobile && item.subLinks.length > 0) {
                              setActiveCategory(
                                activeCategory === item.name ? null : item.name
                              );
                            } else if (item.href) {
                              handleNav(item.href);
                            }
                          }}
                          className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold transition-colors text-left ${activeCategory === item.name ? "text-primary" : "text-primary/40 hover:text-primary/70"}`}
                        >
                          {item.name}
                        </button>
                      </div>

                      {/* Mobile Sub-Links (Accordion) */}
                      <AnimatePresence>
                        {activeCategory === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden pl-4 mt-2 mb-4 space-y-3 border-l-2 border-accent/20"
                          >
                            {/* 'View All' Link for categories with a main page */}
                            {item.href && (
                              <div
                                onClick={() => handleNav(item.href!)}
                                className="text-2xl font-display font-medium text-neutral-800 active:text-primary py-1 mb-2"
                              >
                                View All {item.name}
                              </div>
                            )}

                            {item.subLinks.map((subLink, subIndex) => (
                              <div
                                key={subIndex}
                                onClick={() => handleNav(subLink.href)}
                                className="text-2xl font-display font-medium text-neutral-500 active:text-primary py-1"
                              >
                                {subLink.name}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </nav>

              {/* Secondary / Footer Links */}
              <div className="mt-12 ml-16 md:ml-20 flex gap-6 text-sm font-medium text-neutral-400">
                {/* <span
                className="hover:text-primary cursor-pointer transition-colors"
                onClick={() => handleNav("/privacy")}
              >
                Privacy
              </span>
              <span
                className="hover:text-primary cursor-pointer transition-colors"
                onClick={() => handleNav("/terms")}
              >
                Terms
              </span> */}
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Navy - SubLinks & Search */}
          <motion.div
            className="hidden md:flex w-1/2 h-full bg-primary relative z-10 flex-col p-16 lg:p-24 justify-center"
            initial={{ x: "100%" }}
            animate={{
              x: 0,
              transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
            }}
            exit={{
              x: "100%",
              transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
            }}
          >
            {/* Search Bar Always Visible at Top? or part of content? 
                 User: "make sure the search is working". 
                 Let's put search at the top of Right Panel.
             */}
            <div className="absolute top-16 right-16 w-full max-w-sm">
              <div className="relative border-b border-white/20 hover:border-white/60 transition-colors pb-2 flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white text-lg w-full placeholder:text-white/30 font-sans"
                />
                <Search className="text-white/50" size={20} />
              </div>
            </div>

            <div className="mt-12 h-full flex flex-col justify-center">
              {/* Mode 1: Search Results */}
              {searchQuery ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-accent text-sm font-bold uppercase tracking-widest mb-6">
                    Search Results
                  </h3>

                  {searchResults.length > 0 ? (
                    <div className="space-y-6">
                      {searchResults.map((res: any) => (
                        <div
                          key={res.id}
                          onClick={() => handleNav(res.link)}
                          className="group cursor-pointer"
                        >
                          <div className="text-xs text-white/40 mb-1">
                            {res.type}
                          </div>
                          <h4 className="text-xl text-white font-medium group-hover:text-accent transition-colors">
                            {res.title}
                          </h4>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/50 italic">No results found.</p>
                  )}
                </motion.div>
              ) : (
                /* Mode 2: Dynamic Sub-Links */
                <motion.div
                  key={activeCategory || "default"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentSubLinks.length > 0 ? (
                    <div className="flex flex-col space-y-6">
                      {currentSubLinks.map((link: any) => (
                        <div
                          key={link.name}
                          onClick={() => handleNav(link.href)}
                          className="group cursor-pointer flex items-center"
                        >
                          {/* Optional color dot for divisions */}
                          {link.accent && (
                            <span
                              className="w-2 h-2 rounded-full mr-4 transition-transform group-hover:scale-150"
                              style={{ backgroundColor: link.accent }}
                            />
                          )}
                          <h3
                            className={`text-3xl md:text-5xl font-display font-light text-white/70 group-hover:text-white transition-colors ${!link.accent && "hover:translate-x-2 transition-transform"}`}
                          >
                            {link.name}
                          </h3>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Mode 3: Default Empty State (or "Featured") */
                    <div className="text-white/30 text-4xl md:text-5xl font-display font-medium tracking-tight">
                      {activeCategory
                        ? `Explore ${activeCategory}`
                        : "Select a category"}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
