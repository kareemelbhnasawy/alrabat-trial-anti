import React from "react";
import { Section } from "../components/ui/Section";
import { Users, User, Briefcase, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "../components/animations/AnimatedCounter";

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
            About Alrabat
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Established in 2007 in Dubai, UAE, as a subsidiary of Alrabat
            Business Group, we are dedicated to delivering fully tailored
            integrated ground solutions.
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
        </div>
      </Section>

      {/* Core Values - Full Width Dark Green Background */}
      <Section className="bg-primary text-white py-20 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-12 text-center">
              OUR CORE VALUES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {CORE_VALUES.map((value) => (
                <div
                  key={value.title}
                  className="rounded-lg border border-white/20 bg-white/5 p-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <img
                        src={value.icon}
                        alt={`${value.title} icon`}
                        className="w-5 h-5 object-contain filter brightness-0 invert"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-white tracking-wide">
                      {value.title}
                    </h4>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm lg:text-base font-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Story */}
      <Section className="bg-neutral-50 pb-40 lg:pb-56" slantedTop>
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

      {/* Impact Stats */}
      <Section dark slantedTop>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Company Statistics
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Key figures from the latest Alrabat Company Profile (2026).
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: 300,
                suffix: "+",
                label: "Satisfied Clients",
                icon: <Users className="w-8 h-8 mb-4 mx-auto text-white" />,
              },
              {
                value: 600,
                suffix: "+",
                label: "Staff Members",
                icon: <User className="w-8 h-8 mb-4 mx-auto text-white" />,
              },
              {
                value: 2000,
                suffix: "+",
                label: "Completed Projects",
                icon: <Briefcase className="w-8 h-8 mb-4 mx-auto text-white" />,
              },
              {
                value: 95,
                suffix: "%",
                label: "Annual Revenue Growth",
                icon: (
                  <TrendingUp className="w-8 h-8 mb-4 mx-auto text-white" />
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
                <div className="text-4xl md:text-5xl font-display font-bold mb-2 flex justify-center items-center text-accent">
                  <AnimatedCounter to={stat.value} duration={2} />
                  {stat.suffix}
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
