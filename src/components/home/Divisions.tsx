import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { useData } from "../../context/DataContext";
import { FadeIn } from "../animations/FadeIn";
import { cn } from "../../lib/utils";

const getIconPath = (slug: string) => {
  switch (slug) {
    case "foundations":
      return "/logos/icons/Alrabat Foundation PNG.png";
    case "marine":
      return "/logos/icons/Alrabat Marine PNG.png";
    case "ground-improvement":
      return "/logos/icons/Alrabat Ground Improvement PNG.png";
    case "infrastructure":
      return "/logos/icons/Alrabat Infrastructure PNG.png";
    case "equipment":
      return "/logos/icons/Alrabat Equipment PNG.png";
    case "specialized-engineering":
    default:
      return "/logos/icons/Alrabat SE PNG.png";
  }
};

const getDivisionColor = (slug: string) => {
  switch (slug) {
    case "foundations":
      return "bg-[#961E1E]";
    case "marine":
      return "bg-[#005C9B]";
    case "ground-improvement":
      return "bg-[#996200]";
    case "infrastructure":
      return "bg-[#703000]";
    case "equipment":
      return "bg-[#137C1A]";
    case "specialized-engineering":
    default:
      return "bg-[#4B5563]";
  }
};

export const Divisions = () => {
  const { divisions } = useData();
  const [activeId, setActiveId] = useState<string | null>(null);
  const timeoutRef = React.useRef<any>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (id: string) => {
    // Only for desktop hover logic (if needed to separate from mobile click)
    if (window.innerWidth >= 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActiveId(id);
      }, 50);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActiveId(null);
      }, 50);
    }
  };

  const handleMobileClick = (e: React.MouseEvent, id: string) => {
    // Check if mobile/tablet (using width check or just rely on state)
    // If not active, prevent nav and set active
    if (activeId !== id && window.innerWidth < 1024) {
      e.preventDefault();
      setActiveId(id);

      // Immediate scroll start (smooth)
      setTimeout(() => {
        const element = document.getElementById(`division-${id}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }, 0);

      // Correction scroll after expansion finishes (300ms)
      setTimeout(() => {
        const element = document.getElementById(`division-${id}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }, 310);
    }
  };

  return (
    <Section className="py-20 bg-neutral-bg">
      <div className="container-custom">
        <div className="text-center mb-12">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
              Our Divisions
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
            <p className="mt-6 text-lg text-neutral-light max-w-2xl mx-auto">
              Delivering excellence through specialized expertise across every
              discipline.
            </p>
          </FadeIn>
        </div>

        {/* Desktop: Horizontal Accordion | Mobile: Horizontal Scroll (Vertical Bars) */}
        <div
          ref={scrollContainerRef}
          className={cn(
            // Mobile: Horizontal Scroll (Removed snap-x)
            "flex flex-row gap-2 overflow-x-auto pb-4 px-4 -mx-4 md:mx-0 md:px-0 no-scrollbar custom-scrollbar",
            // Desktop: Accordion
            "lg:flex-row lg:gap-4 lg:h-[600px] lg:overflow-visible l:pb-0",
            "transition-all duration-300 will-change-[flex]",
          )}
        >
          {divisions.map((item) => (
            <Link
              key={item.id}
              id={`division-${item.id}`}
              to={`/divisions/${item.slug}`}
              onClick={(e) => handleMobileClick(e, item.id)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "relative overflow-hidden rounded-2xl transition-all duration-300 ease-in-out cursor-pointer group shadow-xl",
                // Mobile Styles: Dynamic Width (Removed snap-center)
                "h-[450px] shrink-0 transition-all duration-300",
                activeId === item.id ? "w-[85vw] md:w-[400px]" : "w-[110px]",
                // Desktop Styles: Flexible width
                "lg:h-full lg:w-auto",
                // Desktop Active Logic
                activeId === item.id ? "lg:flex-[3.5]" : "lg:flex-[1]",
                !activeId && "lg:flex-[1]",
              )}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.heroImage}
                  alt={item.name}
                  loading="lazy"
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-700",
                    activeId === item.id || !activeId
                      ? "grayscale-0"
                      : "grayscale",
                    "group-hover:scale-110",
                  )}
                />

                {/* Overlay Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    // Mobile: Always dark bottom
                    "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
                    // Desktop Active Override
                    activeId === item.id
                      ? "lg:bg-gradient-to-t lg:from-black/80 lg:via-black/20 lg:to-transparent"
                      : "lg:bg-primary-dark/60 lg:group-hover:bg-primary-dark/40",
                  )}
                />
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                {/* Vertical Text State (Visible when NOT active on mobile, or collapsed on desktop) */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none p-4",
                    // Mobile: Hidden when active
                    activeId === item.id ? "opacity-0" : "opacity-100",
                    // Desktop: Hidden when active
                    "lg:flex",
                    activeId === item.id
                      ? "lg:opacity-0"
                      : "lg:opacity-100 lg:delay-200",
                  )}
                >
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 transform whitespace-nowrap">
                      {item.name}
                    </h3>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full p-2.5 md:p-3 shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <img
                        src={getIconPath(item.slug)}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded State (Desktop AND Mobile Active) */}
                <div
                  className={cn(
                    "transition-all duration-500 transform flex-col justify-end h-full",
                    // Mobile: Visible ONLY when active
                    activeId === item.id
                      ? "flex opacity-100 translate-y-0"
                      : "hidden opacity-0 translate-y-4",
                    // Desktop: Always flex, but opacity controlled
                    "lg:flex",
                    "lg:transition-opacity lg:duration-500",
                    activeId === item.id
                      ? "lg:opacity-100 lg:translate-y-0"
                      : "lg:opacity-0 lg:translate-y-4", // Slightly offset when invisible
                  )}
                >
                  {/* Icon removed as per request */}

                  {/* Title & Divider */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 leading-tight">
                    {item.name}
                  </h3>
                  <div className="w-12 h-1 bg-accent mb-6 rounded-full" />

                  {/* Summary Text */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500 text-white/90 text-sm md:text-base font-light mb-6 max-w-lg",
                      // Mobile: Ensure visible text
                    )}
                  >
                    <p className="line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest group/btn w-fit">
                    <span className="border-b-2 border-accent pb-1 group-hover/btn:border-white transition-colors">
                      View Projects
                    </span>
                    <ArrowRight className="w-5 h-5 text-accent group-hover/btn:text-white transition-colors transform group-hover/btn:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};
