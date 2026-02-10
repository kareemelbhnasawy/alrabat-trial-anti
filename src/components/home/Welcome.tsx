import React from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/FadeIn";
import { TextReveal } from "../animations/TextReveal";

export const Welcome = () => {
  return (
    <Section className="py-20 md:py-32">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up" delay={0.2} duration={1.2}>
            <span className="text-accent font-normal tracking-widest uppercase text-sm mb-4 block">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-8 leading-tight">
              <TextReveal delay={0.2} className="justify-center">
                Building the foundation
              </TextReveal>{" "}
              <br className="hidden md:block" />{" "}
              <TextReveal delay={0.4} className="justify-center">
                of the future since 2007.
              </TextReveal>
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-10" />

            <p className="text-base md:text-xl text-neutral-600 mb-8 leading-relaxed font-light">
              Alrabat Specialized Engineering, a subsidiary of the Rabat
              Business Group (est. 1980), delivers fully integrated ground
              solutions across specialized engineering, foundations, ground
              improvement, infrastructure, marine, and equipment services. We
              unite expertise, people, and technology to deliver safe, efficient
              outcomes across the full project lifecycle.
            </p>

            <div className="flex justify-center space-x-6">
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
      </div>
    </Section>
  );
};
