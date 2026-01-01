import React from "react";
import { Section } from "../components/ui/Section";
import {
  Target,
  Eye,
  Heart,
  Award,
  Briefcase,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export const OurStory = () => {
  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-20 bg-neutral-dark text-white text-center slant-divider-bottom-lg">
        <div className="container-custom">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About Alrabat SE
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Established in 2007 in Dubai, UAE, as a subsidiary of the Rabat
            Business Group, we are dedicated to delivering fully tailored
            integrated ground solutions.
          </p>
        </div>
      </div>

      {/* Vision/Mission/Values */}
      <Section>
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Eye size={32} />
            </div>
            <h3 className="text-xl font-bold font-display text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              To be the leader in ground solutions, integrating cutting-edge
              technologies to deliver tailored excellence with a legacy of
              trust.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold font-display text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Providing fully tailored integrated ground solutions of the
              highest quality to achieve exceptional customer satisfaction.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center"
          >
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-600">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold font-display text-primary mb-4">
              Our Values
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Safety, quality, and innovative solutions are the core bonds that
              drive our success and relationships.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Story */}
      <Section className="bg-neutral-50" slantedTop>
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-primary mb-16 text-center"
          >
            Our Journey
          </motion.h2>
          <div className="max-w-4xl mx-auto relative pl-12 md:pl-16">
            {/* Animated Timeline Line */}
            <motion.div
              className="absolute left-[11px] md:left-[15px] top-3 w-1 bg-primary/20 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ height: "calc(100% - 24px)" }}
            />

            <div className="space-y-16">
              {[
                {
                  year: "1980",
                  title: "The Foundation",
                  desc: "Rabat Business Group founded in Egypt, focusing on real estate, contracting, and architectural design.",
                },
                {
                  year: "2007",
                  title: "Expansion to UAE",
                  desc: "Alrabat Specialized Engineering established in Dubai to provide advanced piling and ground improvement services.",
                },
                {
                  year: "Today",
                  title: "Integrated Solutions",
                  desc: "A leader in six infrastructure divisions, delivering turnkey projects across the region.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.3 }}
                  className="relative"
                >
                  {/* Animated Dot */}
                  <motion.span
                    className="absolute -left-[37px] md:-left-[41px] top-1 md:top-2 w-6 h-6 rounded-full bg-primary border-4 border-neutral-50 shadow-md"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  />
                  {/* Pulse ring animation */}
                  <motion.span
                    className="absolute -left-[37px] md:-left-[41px] top-1 md:top-2 w-6 h-6 rounded-full bg-primary/30"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + index * 0.3,
                      ease: "easeOut",
                    }}
                  />
                  <h3 className="text-3xl font-bold text-primary mb-2">
                    {item.year}
                  </h3>
                  <p className="text-lg font-bold text-accent mb-2 uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-neutral-600 leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Impact Stats */}
      <Section className="bg-primary text-white" slantedTop>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Engineering Impact
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Building a sustainable legacy through technical excellence and
              unwavering commitment to safety.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                number: "18+",
                label: "Years of Excellence",
                icon: <Award className="w-8 h-8 mb-4 mx-auto text-white" />,
              },
              {
                number: "500+",
                label: "Projects Delivered",
                icon: <Briefcase className="w-8 h-8 mb-4 mx-auto text-white" />,
              },
              {
                number: "6",
                label: "Specialized Divisions",
                icon: <Globe className="w-8 h-8 mb-4 mx-auto text-white" />,
              },
              {
                number: "100%",
                label: "Safety Record",
                icon: (
                  <ShieldCheck className="w-8 h-8 mb-4 mx-auto text-white" />
                ),
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                {stat.icon}
                <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium tracking-wide uppercase text-sm leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};
