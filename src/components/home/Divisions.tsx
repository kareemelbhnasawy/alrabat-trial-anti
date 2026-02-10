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

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, 50); // Small delay to debounce rapid movement
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveId(null);
    }, 50);
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

        {/* Desktop: Horizontal Accordion | Mobile: Vertical Stack (Cards) */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] transition-all duration-300 will-change-[flex]">
          {divisions.map((item) => (
            <Link
              key={item.id}
              to={`/divisions/${item.slug}`}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "relative overflow-hidden rounded-2xl transition-all duration-500 ease-in-out cursor-pointer group shadow-xl",
                // Mobile Styles
                "h-[300px] w-full shrink-0",
                // Desktop Styles
                "lg:h-full lg:w-auto",
                // If active, it grows. If no active, everyone is 1. If active exists, inactive are 1, active is 3.5.
                // Or: inactive 0.5, active 3.
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
                    // Active: Dark gradient at bottom for text readability
                    // Inactive: Darker overall overlay
                    activeId === item.id
                      ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      : "bg-primary-dark/60 lg:group-hover:bg-primary-dark/40",
                  )}
                />
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                {/* Collapsed State (Desktop) - Vertical Text */}
                <div
                  className={cn(
                    "hidden lg:flex absolute inset-0 items-center justify-center transition-opacity duration-300 pointer-events-none p-4",
                    activeId === item.id
                      ? "opacity-0"
                      : "opacity-100 delay-200",
                  )}
                >
                  {/* Centered Icon when collapsed */}
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6">
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 transform whitespace-nowrap">
                      {item.name}
                    </h3>
                    <div className="w-16 h-16 bg-white rounded-full p-3 shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <img
                        src={getIconPath(item.slug)}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded State (Desktop) & Default Mobile View */}
                <div
                  className={cn(
                    "transition-all duration-500 transform flex flex-col justify-end h-full",
                    // Desktop specific transitions:
                    "lg:transition-opacity lg:duration-500",
                    activeId === item.id
                      ? "lg:opacity-100 lg:translate-y-0"
                      : "lg:opacity-0 lg:translate-y-4", // Slightly offset when invisible
                  )}
                >
                  {/* Icon Card (Top Left of Content Area) */}
                  <div
                    className={cn(
                      "w-16 h-16 bg-white backdrop-blur-md rounded-full p-3 shadow-lg mb-4 border border-white/10 hidden lg:block",
                      // Only fade in on desktop active state
                    )}
                  >
                    <img
                      src={getIconPath(item.slug)}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Title & Divider */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <div className="w-12 h-1 bg-accent mb-4 rounded-full" />

                  {/* Summary Text - desktop shows on hover/active, mobile clamps */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500 text-white/90 text-sm md:text-base font-light mb-6 max-w-lg",
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

                {/* Mobile Float Icon (Bottom Right or similar) to ensure brand presence if needed */}
                <div className="lg:hidden absolute top-4 right-4 w-12 h-12 bg-white backdrop-blur-sm rounded-full p-3 border border-white/20 shadow-lg">
                  <img
                    src={getIconPath(item.slug)}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};
