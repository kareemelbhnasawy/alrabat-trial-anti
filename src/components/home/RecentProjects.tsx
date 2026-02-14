import React from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { ProjectCard } from "../cards/ProjectCard";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { FadeIn } from "../animations/FadeIn";

export const RecentProjects = () => {
  const { projects } = useData();
  const recent = projects.slice(0, 3);

  return (
    <Section slantedTop>
      <div className="container-custom mb-12 flex flex-col md:flex-row justify-between items-end">
        <FadeIn direction="right" fullWidth>
          <div>
            <span className="text-accent font-normal tracking-widest uppercase text-sm mb-2 block">
              Portfolio
            </span>
            <h2 className="text-4xl font-display font-bold text-primary">
              Featured Projects
            </h2>
          </div>
        </FadeIn>
        <FadeIn direction="left" delay={0.2}>
          <Link to="/projects">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Projects
            </Button>
          </Link>
        </FadeIn>
      </div>

      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 container-custom no-scrollbar">
        {recent.map((project, index) => (
          <FadeIn
            key={project.id}
            delay={index * 0.1}
            duration={0.8}
            fullWidth
            className="min-w-[75vw] md:min-w-0 snap-center"
          >
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
