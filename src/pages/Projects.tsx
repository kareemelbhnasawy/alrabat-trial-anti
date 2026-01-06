import React, { useState, useMemo } from "react";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { ProjectCard } from "../components/cards/ProjectCard";
import { Search } from "lucide-react";
import { useData } from "../context/DataContext";
import { clsx } from "clsx";

export const Projects = () => {
  const { projects: allProjects, divisions } = useData();

  const [activeCategory, setActiveCategory] = useState<
    "All" | "Major Projects" | "Projects"
  >("All");
  const [activeDivision, setActiveDivision] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchDivision =
        activeDivision === "All" || project.divisionSlug === activeDivision;
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDivision && matchSearch;
    });
  }, [allProjects, activeCategory, activeDivision, searchQuery]);

  return (
    <>
      <div className="bg-neutral-dark text-white pt-32 pb-16">
        <div className="container-custom">
          <h1 className="text-5xl font-display font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-neutral-400 max-w-2xl">
            A portfolio of successful ground engineering challenges solved
            across the UAE and region.
          </p>
        </div>
      </div>

      <div className="sticky top-[88px] z-40 bg-white border-b border-neutral-100 shadow-sm py-4">
        <div className="container-custom flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveDivision("All")}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeDivision === "All"
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              Our Divisions
            </button>
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setActiveDivision(div.slug)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeDivision === div.slug
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                {div.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border border-neutral-200 rounded-full w-full lg:w-64 focus:outline-none focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Section>
        <div className="container-custom">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">
              <p>No projects match your criteria.</p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setActiveDivision("All");
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
};
