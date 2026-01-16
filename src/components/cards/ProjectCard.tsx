import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "../../types";
import { useData } from "../../context/DataContext";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { divisions } = useData();
  const divisionSlug = project.divisionSlugs?.[0];
  const division = divisions.find((d) => d.slug === divisionSlug);
  const accentColor = division?.accentColor || "#F05B22";

  return (
    <motion.div
      className="relative group w-full h-[400px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="absolute inset-0 slant-br translate-x-3 translate-y-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 border border-neutral-300 bg-neutral-200" />
      <Link
        to={`/projects/${project.slug}`}
        className="relative z-10 block h-full w-full bg-white slant-br shadow-sm transition-all duration-300 overflow-hidden"
      >
        <div className="relative w-full h-full overflow-hidden group-hover:shadow-inner transition-all duration-500">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 z-10 pointer-events-none" />
          <motion.img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Division Chip */}
          <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-2">
            {project.divisionSlugs && project.divisionSlugs.length > 0 ? (
              project.divisionSlugs.map((slug) => {
                const div = divisions.find((d) => d.slug === slug);
                if (!div) return null;
                return (
                  <span
                    key={slug}
                    className="text-white text-xs font-normal uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-sm group-hover:opacity-0 transition-opacity duration-300"
                    style={{ backgroundColor: div.accentColor || "#F05B22" }}
                  >
                    {div.name}
                  </span>
                );
              })
            ) : (
              <span
                className="text-white text-xs font-normal uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-sm group-hover:opacity-0 transition-opacity duration-300"
                style={{ backgroundColor: "#F05B22" }}
              >
                {project.category}
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg delay-100">
            <ArrowUpRight size={18} className="text-primary" />
          </div>

          {/* Sliding Slant Overlay - Covers ~66% */}
          <div
            className="absolute inset-y-0 left-0 bg-primary/95 text-white p-6 md:p-8 flex flex-col justify-between transform -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-30"
            style={{
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
              width: "75%", // Visual coverage ~65-70% depending on aspect ratio
              paddingRight: "15%", // Compensate for the slant
            }}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
              <h3 className="text-xl font-display font-bold text-white mb-4 line-clamp-2 leading-tight">
                {project.title}
              </h3>

              <div className="w-8 h-1 bg-accent mb-4" />

              <ul className="space-y-2">
                {project.scope?.slice(0, 3).map((s, i) => (
                  <li
                    key={i}
                    className="text-xs font-light leading-snug flex items-start"
                  >
                    <span className="w-1 h-full min-h-[1.2em] bg-accent mr-2 block flex-shrink-0" />
                    <span className="line-clamp-2">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" />
                <span className="truncate max-w-[100px]">
                  {project.location}
                </span>
              </div>
              <span className="mr-6 font-display">{project.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
