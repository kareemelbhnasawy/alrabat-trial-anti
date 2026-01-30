import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { useData } from "../../context/DataContext";
import { FadeIn } from "../animations/FadeIn";

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

export const Divisions = () => {
  const { divisions } = useData();

  return (
    <Section className="py-20 bg-neutral-bg">
      <div className="container-custom">
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Divisions.
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {divisions.map((item) => (
            <Link
              key={item.id}
              to={`/divisions/${item.slug}`}
              className="group relative h-[300px] lg:h-[600px] overflow-hidden rounded-2xl bg-white shadow-xl isolate"
            >
              {/* Background Image - Absolute fill */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.heroImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                {/* Logo/Icon Top Left (Absolute in card context) */}
                <div className="absolute top-6 left-6 flex items-center gap-4 opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center p-3 shadow-lg border border-white/20">
                    <img
                      src={getIconPath(item.slug)}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">
                    {item.name}
                  </h3>

                  {/* Summary - Hidden by default, shown on hover */}
                  <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="pt-4 pb-2">
                      <p className="text-white/80 text-sm line-clamp-3 mb-4 font-light">
                        {item.summary}
                      </p>
                      <div className="flex items-center text-white font-bold text-sm uppercase tracking-widest gap-2">
                        Explore Division <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Line Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1 z-20 transition-all duration-300 group-hover:h-2 bg-primary" />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};
