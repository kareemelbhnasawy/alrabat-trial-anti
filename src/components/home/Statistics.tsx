import React from "react";
import { Section } from "../ui/Section";
import { FadeIn } from "../animations/FadeIn";
import { AnimatedCounter } from "../animations/AnimatedCounter";

const COMPANY_STATS = [
  { value: 300, prefix: "+", label: "Satisfied Clients" },
  { value: 600, prefix: "+", label: "Staff Members" },
  { value: 2000, prefix: "+", label: "Completed Projects" },
  { value: 95, suffix: "%", label: "Annual Revenue Growth" },
];

export const Statistics = () => {
  return (
    <Section className="bg-primary text-white py-20">
      <div className="container-custom">
        <FadeIn direction="up" delay={0.2} duration={1.0}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-center">
            {COMPANY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-8 border border-white/10 rounded-lg group hover:-translate-y-2 transition-transform duration-500"
              >
                <h3 className="text-5xl md:text-6xl font-display font-bold text-accent mb-4 flex items-center justify-center">
                  {stat.prefix || ""}
                  <AnimatedCounter to={stat.value} duration={2} />
                  {stat.suffix || ""}
                </h3>
                <p className="text-sm md:text-base text-white/80 font-medium uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};
