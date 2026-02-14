import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { ProjectCard } from "../components/cards/ProjectCard";
import { useData } from "../context/DataContext";
import type { Division, Project } from "../types";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ProjectMap } from "../components/ui/ProjectMap";
import { FadeIn, StaggerContainer } from "../components/animations/FadeIn";

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

export const DivisionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { divisions, projects } = useData();
  const accent = "#013D2F"; // Primary Brand Color

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

  return (
    <>
      {/* Hero */}
      <div className="relative pt-32 pb-20 md:py-0 md:h-[60vh] md:min-h-[500px] flex items-center slant-divider-bottom-lg">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to right, ${accent}B3, ${accent}4D)`,
            }}
          />
          {division.heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster={division.heroImage}
            >
              <source src={division.heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={division.heroImage}
              alt={division.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="container-custom relative z-20 text-white mt-0 md:mt-0">
          <FadeIn delay={0.1}>
            <Link
              to="/divisions"
              className="text-white/80 hover:text-white mb-6 inline-flex items-center text-lg font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowRight className="rotate-180 mr-2" size={16} /> All Divisions
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={getIconPath(division.slug)}
                alt={`${division.name} Icon`}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
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
              style={{ color: accent }}
            >
              Discuss {division.name} Scope
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Intro Section */}
      {division.introSection && (
        <div className="container-custom py-24">
          <div className="max-w-4xl mx-auto">
            {/* Accent Mark */}
            <FadeIn>
              <div
                className="w-16 h-2 mb-6 transform -skew-x-12"
                style={{ backgroundColor: accent }}
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2
                className="text-4xl md:text-5xl font-display font-bold mb-8 uppercase leading-tight"
                style={{ color: accent }}
              >
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
                <h3
                  className="text-lg font-bold mb-6"
                  style={{ color: accent }}
                >
                  Our services include:
                </h3>
              </FadeIn>
              <ul className="space-y-6">
                {division.introSection.services.map((service, idx) => (
                  <FadeIn key={idx} delay={0.4 + idx * 0.1}>
                    <li>
                      <div className="flex items-start">
                        {/* Custom Bullet */}
                        <div
                          className="w-4 h-1 mt-3 mr-4 transform -skew-x-12 flex-shrink-0"
                          style={{ backgroundColor: accent }}
                        />
                        <div>
                          <h4
                            className="text-lg font-bold uppercase mb-1"
                            style={{ color: accent }}
                          >
                            {service.title}
                          </h4>
                          <p className="text-neutral-600 text-lg">
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
              <h2
                className="text-3xl font-display font-bold mb-8"
                style={{ color: accent }}
              >
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
              <h2
                className="text-3xl font-display font-bold mb-8"
                style={{ color: accent }}
              >
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
                    <h3 className="font-bold mb-2" style={{ color: accent }}>
                      {service}
                    </h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Division Project Map */}
      {relatedProjects.length > 0 && <ProjectMap projects={relatedProjects} />}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section className="bg-neutral-50" slantedTop>
          <div className="container-custom">
            <FadeIn>
              <h2
                className="text-3xl font-display font-bold mb-12"
                style={{ color: accent }}
              >
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
