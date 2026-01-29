import React from "react";
import { Section } from "../ui/Section";
import { FadeIn } from "../animations/FadeIn";
import { AnimatedCounter } from "../animations/AnimatedCounter";

export const Statistics = () => {
  return (
    <Section className="bg-primary text-white py-20">
      <div className="container-custom">
        <FadeIn direction="up" delay={0.2} duration={1.0}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Years Experience */}
            <div className="p-8 group hover:-translate-y-2 transition-transform duration-500">
              <h3 className="text-6xl md:text-7xl font-display font-bold text-accent mb-4 flex items-center justify-center">
                <AnimatedCounter to={18} duration={2} />+
              </h3>
              <p className="text-sm md:text-base text-white/80 font-medium uppercase tracking-widest">
                Years Experience
              </p>
            </div>

            {/* Specialized Divisions */}
            <div className="p-8 group hover:-translate-y-2 transition-transform duration-500">
              <h3 className="text-6xl md:text-7xl font-display font-bold text-accent mb-4 flex items-center justify-center">
                <AnimatedCounter to={4} duration={2} />
              </h3>
              <p className="text-sm md:text-base text-white/80 font-medium uppercase tracking-widest">
                Specialized Divisions
              </p>
            </div>

            {/* Safe Man-Hours */}
            <div className="p-8 group hover:-translate-y-2 transition-transform duration-500">
              <h3 className="text-6xl md:text-7xl font-display font-bold text-accent mb-4 flex items-center justify-center">
                <AnimatedCounter to={5} duration={2} decimals={0} />
                M+
              </h3>
              <p className="text-sm md:text-base text-white/80 font-medium uppercase tracking-widest">
                Safe Man-Hours
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};
