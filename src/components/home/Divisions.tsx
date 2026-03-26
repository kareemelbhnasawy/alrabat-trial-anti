import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { useData } from "../../context/DataContext";
import { FadeIn } from "../animations/FadeIn";
import { cn } from "../../lib/utils";
import { useShouldReduceMotion } from "../../hooks/useShouldReduceMotion";

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

const getOptimizedDivisionImage = (url: string) => {
  // Supabase Image Transform (/render/image/) requires a Pro plan.
  // Return the original URL directly to avoid broken images on Free plans.
  return url;
};

export const Divisions = () => {
  const { divisions } = useData();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shouldReduceMotion = useShouldReduceMotion();

  const handleMobileClick = (e: React.MouseEvent, id: string) => {
    if (activeId !== id && window.innerWidth < 1024) {
      e.preventDefault();
      setActiveId(id);

      requestAnimationFrame(() => {
        const element = document.getElementById(`division-${id}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      });
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

        {/* Desktop: CSS-only hover accordion for smoother interactions */}
        <div className="hidden lg:flex lg:flex-row lg:gap-4 lg:h-[600px]">
          {divisions.map((item, index) => (
            <Link
              key={item.id}
              to={`/divisions/${item.slug}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "relative min-w-0 flex-1 overflow-hidden rounded-2xl group shadow-md [transform:translateZ(0)]",
                !shouldReduceMotion &&
                  "transition-[flex] duration-150 ease-out",
                hoveredId === item.id ? "flex-[3.2]" : "flex-1",
                !hoveredId && "hover:flex-[3.2]", // Fallback for pure CSS hover before state updates
              )}
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={getOptimizedDivisionImage(item.heroImage)}
                  alt={item.name}
                  loading="eager"
                  fetchPriority={index < 3 ? "high" : "auto"}
                  decoding="async"
                  className={cn(
                    "w-full h-full object-cover",
                    !shouldReduceMotion && "transition-transform duration-300",
                    hoveredId === item.id ? "scale-[1.015]" : "scale-100",
                    !hoveredId && "group-hover:scale-[1.015]",
                  )}
                />

                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent",
                    !shouldReduceMotion && "transition-colors duration-200",
                    hoveredId === item.id ? "from-black/80 via-black/20" : "",
                    !hoveredId &&
                      "group-hover:from-black/80 group-hover:via-black/20",
                  )}
                />
              </div>

              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center pointer-events-none p-4",
                    shouldReduceMotion
                      ? "opacity-100"
                      : "transition-opacity duration-150",
                    hoveredId === item.id ? "opacity-0" : "opacity-100",
                    !hoveredId && "group-hover:opacity-0",
                  )}
                >
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                      {item.name}
                    </h3>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full p-2.5 md:p-3 shadow-xl flex items-center justify-center">
                      <img
                        src={getIconPath(item.slug)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex-col justify-end h-full",
                    shouldReduceMotion
                      ? "hidden"
                      : "flex transition-opacity duration-200",
                    hoveredId === item.id
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none",
                    !hoveredId &&
                      "group-hover:opacity-100 group-hover:pointer-events-auto",
                  )}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 leading-tight">
                    {item.name}
                  </h3>
                  <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
                  <div className="overflow-hidden text-white/90 text-sm md:text-base font-light mb-6 max-w-lg">
                    <p className="line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest w-fit">
                    <span className="border-b-2 border-accent pb-1">
                      View Projects
                    </span>
                    <ArrowRight className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile/Tablet: click-to-expand */}
        <div
          className={cn(
            "flex lg:hidden flex-row gap-2 overflow-x-auto pb-4 px-4 -mx-4 md:mx-0 md:px-0 no-scrollbar custom-scrollbar",
          )}
        >
          {divisions.map((item, index) => (
            <Link
              key={item.id}
              id={`division-${item.id}`}
              to={`/divisions/${item.slug}`}
              onClick={(e) => handleMobileClick(e, item.id)}
              className={cn(
                "relative overflow-hidden rounded-2xl cursor-pointer group shadow-md [transform:translateZ(0)]",
                "h-[450px] shrink-0 transition-none",
                activeId === item.id ? "w-[85vw] md:w-[400px]" : "w-[110px]",
              )}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={getOptimizedDivisionImage(item.heroImage)}
                  alt={item.name}
                  loading="eager"
                  fetchPriority={index < 3 ? "high" : "auto"}
                  decoding="async"
                  className={cn(
                    "w-full h-full object-cover",
                    activeId === item.id ? "scale-[1.01]" : "scale-100",
                  )}
                />

                {/* Overlay Gradient */}
                <div
                  className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
                    activeId === item.id
                      ? "lg:bg-gradient-to-t lg:from-black/80 lg:via-black/20 lg:to-transparent"
                      : "lg:bg-primary-dark/60",
                  )}
                />
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                {/* Vertical Text State (Visible when NOT active on mobile, or collapsed on desktop) */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center pointer-events-none p-4 transition-opacity",
                    shouldReduceMotion ? "duration-0" : "duration-200",
                    activeId === item.id ? "opacity-0" : "opacity-100",
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
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded State (Desktop AND Mobile Active) */}
                <div
                  className={cn(
                    "flex-col justify-end h-full",
                    activeId === item.id
                      ? "flex opacity-100"
                      : "hidden opacity-0",
                  )}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 leading-tight">
                    {item.name}
                  </h3>
                  <div className="w-12 h-1 bg-accent mb-6 rounded-full" />

                  <div className="overflow-hidden text-white/90 text-sm md:text-base font-light mb-6 max-w-lg">
                    <p className="line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest group/btn w-fit">
                    <span className="border-b-2 border-accent pb-1">
                      View Projects
                    </span>
                    <ArrowRight className="w-5 h-5 text-accent" />
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
