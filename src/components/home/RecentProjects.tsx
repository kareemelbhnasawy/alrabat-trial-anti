import React from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { ProjectCard } from "../cards/ProjectCard";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";

export const RecentProjects = () => {
  const { projects } = useData();
  const recent = projects.slice(0, 3);

  return (
    <Section slantedTop>
      <div className="container-custom mb-12 flex flex-col md:flex-row justify-between items-end">
        <div>
          <span className="text-accent font-normal tracking-widest uppercase text-sm mb-2 block">
            Portfolio
          </span>
          <h2 className="text-4xl font-display font-bold text-primary">
            Featured Projects
          </h2>
        </div>
        <Link to="/projects">
          <Button variant="outline" className="mt-4 md:mt-0">
            View All Projects
          </Button>
        </Link>
      </div>

      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recent.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};
