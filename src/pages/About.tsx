import React from "react";
import { Section } from "../components/ui/Section";
import { motion } from "framer-motion";

const STRATEGY_CONTENT = {
  vision: {
    title: "Our Vision",
    icon: "/company-profile/icons/vision.png",
    description:
      "To be a trusted and forward-thinking construction group that shapes the future of the industry by delivering lasting value through integrity, collaboration, and innovation - building authentic partnerships, investing in people, and transforming challenges into sustainable progress with a positive impact on society, guided by the principle that we should consistently learn from experience not repeat the same mistake twice.",
  },
  mission: {
    title: "Our Mission",
    icon: "/company-profile/icons/mission.png",
    description:
      "To deliver high-quality construction solutions through ethical practice, strong partnerships, and creative problem-solving—by empowering our people, standardizing excellence, and continuously improving the way we plan, execute, and collaborate. We commit to agility and continuous adaptability across our operations, business strategies, and societal responsibilities, enabling us to respond effectively to changing environments and evolving needs. We further undertake projects of any scale and take all necessary steps to contribute positively to society, creating sustainable growth and lasting value for our clients, partners, and communities.",
  },
};

const CORE_VALUES = [
  {
    title: "AUTHENTICITY",
    icon: "/company-profile/icons/authenticity.png",
    description:
      "We remain grounded in what is real, reliable, and true. Our actions, decisions, and commitments are consistent across all projects and relationships, fostering trust and long-term credibility.",
  },
  {
    title: "CREATIVITY",
    icon: "/company-profile/icons/creativity.png",
    description:
      "We look beyond limitations and embrace new perspectives. Through thoughtful innovation and adaptive thinking, we transform challenges into opportunities for sustainable progress.",
  },
  {
    title: "BOND",
    icon: "/company-profile/icons/bond.png",
    description:
      "We believe that progress is achieved together. Strong, respectful relationships connect our teams, partners, and clients, ensuring alignment, collaboration, and shared success at every stage.",
  },
  {
    title: "INVESTMENT IN MINDS",
    icon: "/company-profile/icons/investment-in-minds.png",
    description:
      "We believe that investing in people is the most meaningful investment. By nurturing talent, values, and potential, we create success with lasting purpose and impact—both professionally and personally.",
  },
];

export const About = () => {
  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-40 bg-neutral-dark text-white text-center slant-divider-bottom-lg">
        <div className="container-custom">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Company
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About Alrabat SE
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Established in 2007 in Dubai, UAE, as a subsidiary of Alrabat
            Business Group (founded in Egypt in 1980), we deliver fully tailored
            integrated ground solutions across the region.
          </p>
        </div>
      </div>

      {/* Vision/Mission/Values */}
      <Section>
        <div className="container-custom space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[STRATEGY_CONTENT.vision, STRATEGY_CONTENT.mission].map(
              (strategy, idx) => (
                <motion.div
                  key={strategy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <img
                      src={strategy.icon}
                      alt={`${strategy.title} icon`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold font-display text-primary mb-4">
                    {strategy.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {strategy.description}
                  </p>
                </motion.div>
              ),
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 shadow-sm border border-neutral-100 slant-br"
          >
            <h3 className="text-xl md:text-2xl font-bold font-display text-primary mb-6 text-center">
              OUR CORE VALUES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CORE_VALUES.map((value) => (
                <div
                  key={value.title}
                  className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={value.icon}
                      alt={`${value.title} icon`}
                      className="w-7 h-7 object-contain"
                    />
                    <h4 className="text-lg font-bold text-primary">
                      {value.title}
                    </h4>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
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
            Our Story
          </motion.h2>
          <div className="max-w-4xl mx-auto relative pl-12 md:pl-16">
            {/* Animated Timeline Line */}
            <motion.div
              className="absolute left-[11px] md:left-[15px] top-3 w-1 bg-primary/20 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                  desc: "A leader in six specialized divisions, delivering turnkey projects across the region.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  {/* Animated Dot */}
                  <motion.span
                    className="absolute -left-[37px] md:-left-[41px] top-1 md:top-2 w-6 h-6 rounded-full bg-primary border-4 border-neutral-50 shadow-md"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3,
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
                      delay: 0.4,
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

      {/* Team */}
      <Section>
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-primary mb-16 text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Aman Lashin",
                role: "Co-Founder & Managing Director",
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Mohamed Ahmed Ghalwash",
                role: "Co-Founder & Chairman",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Ibrahim Ghalwash",
                role: "Board Member",
                image:
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Hussein Ghalwash",
                role: "Board Member",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80",
              },
            ].map((member, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="h-80 bg-neutral-100 mb-6 overflow-hidden slant-br grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-accent font-bold uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};
