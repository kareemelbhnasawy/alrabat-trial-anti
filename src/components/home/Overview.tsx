import React from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/FadeIn";
import { TextReveal } from "../animations/TextReveal";
import { AnimatedCounter } from "../animations/AnimatedCounter";

export const Overview = () => {
  return (
    <Section>
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn direction="right" delay={0.2} duration={1.2}>
            <span className="text-accent font-normal tracking-widest uppercase text-sm mb-2 block">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              <TextReveal delay={0.2}>Building the foundation</TextReveal>{" "}
              <br /> <TextReveal delay={0.4}>of the future.</TextReveal>
            </h2>
            <div className="h-1 w-20 bg-accent mb-8" />
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              Established in 2007 in Dubai, UAE, Alrabat Specialized Engineering
              is a subsidiary of the Rabat Business Group, which has been
              driving development since 1980.
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Our name signifies unity and integration. We are committed to
              delivering the highest standards of safety and quality in piling,
              shoring, and ground improvement solutions across the region.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => (window.location.href = "/about")}>
                More About Us
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/divisions")}
              >
                Our Capabilities
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="relative">
          {/* Abstract shape or secondary image */}
          <FadeIn direction="left" delay={0.2} duration={1.2}>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-6 mt-8">
                {/* Years Experience */}
                <div className="bg-primary p-8 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 rounded-none border-l-4 border-accent">
                  <h3 className="text-5xl font-bold text-accent mb-2 flex items-center tracking-tight">
                    <AnimatedCounter to={15} duration={2} />+
                  </h3>
                  <p className="text-sm text-white/80 font-medium uppercase tracking-widest">
                    Years Experience
                  </p>
                </div>

                {/* Specialized Divisions */}
                <div className="bg-primary p-8 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 rounded-none border-l-4 border-accent">
                  <h3 className="text-5xl font-bold text-accent mb-2 flex items-center tracking-tight">
                    <AnimatedCounter to={6} duration={2} />
                  </h3>
                  <p className="text-sm text-white/80 font-medium uppercase tracking-widest">
                    Specialized Divisions
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="hidden md:block h-16" /> {/* Spacer */}
                {/* Safe Man-Hours */}
                <div className="bg-primary p-8 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 rounded-none border-l-4 border-accent">
                  <h3 className="text-5xl font-bold text-accent mb-2 flex items-center tracking-tight">
                    <AnimatedCounter to={5} duration={2} decimals={0} />
                    M+
                  </h3>
                  <p className="text-sm text-white/80 font-medium uppercase tracking-widest">
                    Safe Man-Hours
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
};
