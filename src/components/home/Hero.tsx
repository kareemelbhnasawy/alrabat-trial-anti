import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/FadeIn";
import { TextReveal } from "../animations/TextReveal";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 500]);

  return (
    <div className="relative h-screen w-full overflow-hidden z-10">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0 select-none" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply" />
        <iframe
          src="https://player.vimeo.com/video/1124183061?h=f5c700219a&background=1&autoplay=1&loop=1&byline=0&title=0"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Hero Video"
        />
      </motion.div>

      <div className="container-custom relative z-20 h-full flex flex-col justify-center text-white pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* <FadeIn direction="up" delay={0.2} duration={1.2}>
            <div className="flex justify-center mb-6">
              <img
                src="/logos/icons/Alrabat SE PNG.png"
                alt="Alrabat SE Logo"
                className="h-32 md:h-40 w-auto object-cover opacity-90"
              />
            </div>
          </FadeIn> */}

          <FadeIn direction="up" delay={0.4} duration={1.2}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-[0.9] mb-6 flex flex-col items-center text-center">
              <TextReveal delay={0.4}>THE</TextReveal>
              <TextReveal delay={0.5}>BOND</TextReveal>
              <TextReveal delay={0.6}>OF</TextReveal>
              <span className="text-accent mt-2">
                <TextReveal delay={0.7}>SUCCESS</TextReveal>
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.6} duration={1.2}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 mb-10 font-light leading-relaxed">
              Your foundation experts in piling, shoring & ground engineering.
              Delivering fully tailored integrated ground solutions since 2007.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.8} duration={1.0}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/divisions">
                <Button size="lg">Explore Divisions</Button>
              </Link>
              <Link to="/projects">
                <Button variant="white" size="lg">
                  View Projects
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={32} />
      </motion.div>
    </div>
  );
};
