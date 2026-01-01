import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { ProjectCard } from "../components/cards/ProjectCard";
import { useData } from "../context/DataContext";
import type { Division, Project } from "../types";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const DivisionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { divisions, projects } = useData();

  const [division, setDivision] = useState<Division | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (slug) {
      const div = divisions.find((d) => d.slug === slug);
      setDivision(div || null);

      const projs = projects.filter((p) => p.divisionSlug === slug);
      setRelatedProjects(projs);
    }
  }, [slug, divisions, projects]);

  if (!division) {
    return (
      <div className="pt-32 pb-20 container-custom text-center">
        <h1 className="text-2xl">Division not found</h1>
        <Link
          to="/divisions"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Back to Divisions
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center slant-divider-bottom-lg">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/60 z-10" />
          <img
            src={division.heroImage}
            alt={division.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-20 text-white">
          <Link
            to="/divisions"
            className="text-white/60 hover:text-white mb-4 inline-flex items-center text-sm font-bold uppercase tracking-widest"
          >
            <ArrowRight className="rotate-180 mr-2" size={16} /> All Divisions
          </Link>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            {division.name}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl leading-relaxed font-light mb-10">
            {division.summary}
          </p>
          <Button onClick={() => (window.location.href = "/contact")}>
            Discuss {division.name} Scope
          </Button>
        </div>
      </div>

      {/* Intro Section */}
      {division.introSection && (
        <div className="container-custom py-24">
          <div className="max-w-4xl mx-auto">
            {/* Accent Mark */}
            <div
              className="w-16 h-2 mb-6 transform -skew-x-12"
              style={{ backgroundColor: "#F05B22" }}
            />

            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 uppercase leading-tight">
              {division.introSection.title}
            </h2>

            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              {division.introSection.description}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-primary mb-6">
                Our services include:
              </h3>
              <ul className="space-y-6">
                {division.introSection.services.map((service, idx) => (
                  <li key={idx}>
                    <div className="flex items-start">
                      {/* Custom Bullet */}
                      <div
                        className="w-4 h-1 mt-3 mr-4 transform -skew-x-12 flex-shrink-0"
                        style={{
                          backgroundColor: division.accentColor || "#025440",
                        }}
                      />
                      <div>
                        <h4 className="text-lg font-bold text-primary uppercase mb-1">
                          {service.title}
                        </h4>
                        <p className="text-neutral-600 text-lg">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Capabilities & Services */}
      <Section className="bg-neutral-bg">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-display font-bold text-primary mb-8">
              Core Capabilities
            </h2>
            <ul className="space-y-4">
              {division.capabilities.map((cap, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2
                    className="text-accent mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-lg text-neutral-700">{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-display font-bold text-primary mb-8">
              Key Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {division.keyServices.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-50 p-6 slant-br border-l-4 border-primary hover:bg-white hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-primary mb-2">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section className="bg-neutral-50" slantedTop>
          <div className="container-custom">
            <h2 className="text-3xl font-display font-bold text-primary mb-12">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className="bg-primary-dark text-white py-32 slant-divider-lg -mt-20 relative z-10">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to start your project?
          </h2>
          <p className="text-neutral-300 mb-10 max-w-2xl mx-auto">
            Contact our {division.name} experts today for a technical
            consultation and proposal.
          </p>
          <Button
            variant="white"
            size="lg"
            onClick={() => (window.location.href = "/contact")}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </>
  );
};
