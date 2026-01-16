import React from "react";
import { Section } from "../ui/Section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useData } from "../../context/DataContext";
import { Button } from "../ui/Button";

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
    <div className="flex flex-col">
      {divisions.map((item, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <Section
            key={item.id}
            className="min-h-[70vh] flex items-center py-20 bg-white overflow-hidden relative border-b border-neutral-100"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div
                className={`absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl -z-10 ${isEven ? "-right-20 top-20" : "-left-20 bottom-20"}`}
                style={{ backgroundColor: item.accentColor }}
              />
            </div>

            <div className="container-custom">
              <div
                className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isEven ? "" : "lg:flex-row-reverse"}`}
              >
                {/* Image Side */}
                <motion.div
                  className="w-full lg:w-1/2 relative group"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <motion.img
                      src={item.heroImage}
                      alt={item.name}
                      className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Accent Line on Image */}
                    <div
                      className={`absolute bottom-0 h-2 w-full z-20 transition-all duration-500 group-hover:h-3`}
                      style={{ backgroundColor: item.accentColor || "#1a1a1a" }}
                    />
                  </div>

                  <motion.div
                    className={`absolute top-6 ${isEven ? "right-6" : "left-6"} z-30 hidden md:block`}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <img
                      src={getIconPath(item.slug)}
                      alt={`${item.name} Icon`}
                      className="h-16 w-auto object-contain"
                    />
                  </motion.div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-bold tracking-widest uppercase text-neutral-400">
                      0{idx + 1}
                    </span>
                    <div className="h-px w-12 bg-neutral-300"></div>
                    <span
                      className="text-sm font-bold tracking-widest uppercase"
                      style={{ color: item.accentColor }}
                    >
                      Division
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                    {item.name}
                  </h2>

                  <p className="text-xl text-neutral-600 leading-relaxed mb-10 font-light">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-10">
                    {item.capabilities?.slice(0, 3).map((cap, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-600"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <Link to={`/divisions/${item.slug}`}>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="group pl-0 hover:bg-transparent"
                    >
                      <span
                        className="text-lg font-bold flex items-center"
                        style={{ color: item.accentColor || "#1a1a1a" }}
                      >
                        Explore Division
                        <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </Section>
        );
      })}
    </div>
  );
};
