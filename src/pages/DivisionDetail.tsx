import React, { Suspense, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { ProjectCard } from "../components/cards/ProjectCard";
import { useData } from "../context/DataContext";
import type { Division, Project } from "../types";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { FadeIn } from "../components/animations/FadeIn";

const ProjectMap = React.lazy(() =>
  import("../components/ui/ProjectMap").then((module) => ({
    default: module.ProjectMap,
  })),
);

const SlashMark = ({
  className,
  color,
}: {
  className: string;
  color: string;
}) => (
  <span
    className={`inline-block -skew-x-[38deg] ${className}`}
    style={{ backgroundColor: color }}
  />
);

export const DivisionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { divisions, projects } = useData();

  const [division, setDivision] = useState<Division | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (slug) {
      const div = divisions.find((d) => d.slug === slug);
      setDivision(div || null);

      const projs = projects.filter((p) => p.divisionSlugs?.includes(slug));
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
  const heroAccent = "#013D2F";
  const accent = division.accentColor || "#013D2F";

  return (
    <>
      {/* Hero */}
      <div className="relative pt-32 pb-20 md:py-0 w-full md:h-[70vh] md:min-h-[600px] flex items-center slant-divider-bottom-lg overflow-hidden">
        <div className="absolute inset-0 z-0 bg-neutral-900">
          {/* Color Gradient Overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to right, ${heroAccent}B3, ${heroAccent}4D)`,
            }}
          />

          {/* Actual Un-cropped Media */}
          {division.heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center md:object-bottom"
              poster={division.heroImage}
            >
              <source src={division.heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={division.heroImage}
              alt={division.name}
              className="w-full h-full object-cover object-center md:object-bottom opacity-90"
            />
          )}
        </div>
        <div className="container-custom relative z-30 text-white mt-0 md:mt-0">
          <FadeIn delay={0.1}>
            <Link
              to="/divisions"
              className="text-white/80 hover:text-white mb-6 inline-flex items-center text-lg font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowRight className="rotate-180 mr-2" size={16} /> All Divisions
            </Link>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              {division.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed font-light mb-10">
              {division.summary}
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <Button
              onClick={() => (window.location.href = "/contact")}
              className="bg-white text-primary border-none hover:bg-white/90"
              style={{ color: heroAccent }}
            >
              Discuss {division.name} Scope
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Intro Section */}
      {division.introSection && (
        <div className="container-custom py-24">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <SlashMark
                className="w-14 h-2.5 md:w-20 md:h-3 mb-6"
                color={accent}
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase leading-[0.95] text-primary">
                {division.introSection.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl text-neutral-600 leading-relaxed mb-12">
                {division.introSection.description}
              </p>
            </FadeIn>

            <div className="mb-8">
              <FadeIn delay={0.3}>
                <h3 className="text-lg font-bold mb-6 text-primary">
                  Our services include:
                </h3>
              </FadeIn>
              <ul className="space-y-6">
                {division.introSection.services.map((service, idx) => (
                  <FadeIn key={idx} delay={0.4 + idx * 0.1}>
                    <li>
                      <div className="flex items-start gap-4 md:gap-5">
                        <SlashMark
                          className="w-6 h-2 mt-2.5 md:mt-3 md:w-8 md:h-2.5 flex-shrink-0"
                          color={accent}
                        />
                        <div>
                          <h4 className="text-xl md:text-2xl font-display font-bold uppercase mb-1 text-primary">
                            {service.title}
                          </h4>
                          <p className="text-neutral-700 text-lg md:text-2xl leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  </FadeIn>
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
            <FadeIn>
              <h2 className="text-3xl font-display font-bold mb-8 text-primary">
                Core Capabilities
              </h2>
            </FadeIn>
            <ul className="space-y-4">
              {division.capabilities.map((cap, idx) => (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <li className="flex items-start">
                    <CheckCircle2
                      className="mr-3 mt-1 flex-shrink-0"
                      size={20}
                      style={{ color: accent }}
                    />
                    <span className="text-lg text-neutral-700">{cap}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>

          <div>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl font-display font-bold mb-8 text-primary">
                Key Services
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {division.keyServices.map((service, idx) => (
                <FadeIn key={idx} delay={0.3 + idx * 0.05}>
                  <div
                    className="bg-neutral-50 p-6 slant-br border-l-4 hover:bg-white hover:shadow-md transition-all"
                    style={{ borderColor: accent }}
                  >
                    <h3 className="font-bold mb-2 text-primary">{service}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Division Project Map */}
      {relatedProjects.length > 0 && (
        <Suspense
          fallback={
            <div className="h-[600px] w-full bg-neutral-900 flex items-center justify-center text-white/20">
              Loading Map...
            </div>
          }
        >
          <ProjectMap projects={relatedProjects} />
        </Suspense>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section className="bg-neutral-50" slantedTop>
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-3xl font-display font-bold mb-12 text-primary">
                Related Projects
              </h2>
            </FadeIn>
            <div className="flex flex-row overflow-x-auto snap-x snap-mandatory pb-4 gap-4 px-4 -mx-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:px-0 md:mx-0 no-scrollbar">
              {relatedProjects.map((project, idx) => (
                <FadeIn
                  key={project.id}
                  delay={idx * 0.1}
                  className="min-w-[85vw] md:min-w-0 snap-center"
                >
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <div
        className="text-white py-32 slant-divider-lg -mt-20 relative z-10"
        style={{ backgroundColor: accent }}
      >
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-4xl font-display font-bold mb-6">
              Ready to start your project?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/80 mb-10 max-w-2xl mx-auto">
              Contact our {division.name} experts today for a technical
              consultation and proposal.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Button
              variant="white"
              size="lg"
              onClick={() => (window.location.href = "/contact")}
              style={{ color: accent }}
            >
              Get in Touch
            </Button>
          </FadeIn>
        </div>
      </div>
    </>
  );
};
