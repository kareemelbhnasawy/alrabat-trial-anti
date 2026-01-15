import React from "react";
import { Section } from "../ui/Section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useData } from "../../context/DataContext";

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
    case "consulting":
    default:
      return "/logos/icons/Alrabat SE PNG.png";
  }
};

export const CollageBand = () => {
  const { divisions } = useData();

  return (
    <Section className="!py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {divisions.map((item, idx) => (
          <div key={item.id} className="group relative flex flex-col h-full">
            {/* Image Top */}
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
              <motion.img
                src={item.heroImage}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Card Bottom */}
            <Link
              to={`/divisions/${item.slug}`}
              className="flex-1 p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 bg-neutral-50 border-t-4"
              style={{ borderColor: item.accentColor || "#1a1a1a" }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Icon */}
                  <img
                    src={getIconPath(item.slug)}
                    alt={`${item.name} Icon`}
                    className="h-14 w-auto object-contain opacity-90"
                  />
                </div>

                <h3
                  className="text-3xl font-display font-bold mb-4"
                  style={{ color: item.accentColor || "#1a1a1a" }}
                >
                  {item.name}
                </h3>
                <p className="text-neutral-600 opacity-90 leading-relaxed text-sm lg:text-base line-clamp-3">
                  {item.summary}
                </p>
              </div>
              <div
                className="mt-8 flex items-center font-bold text-sm tracking-wide"
                style={{ color: item.accentColor || "#1a1a1a" }}
              >
                EXPLORE{" "}
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-2"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
};
