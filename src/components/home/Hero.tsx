import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/FadeIn";
import { TextReveal } from "../animations/TextReveal";
import { motion } from "framer-motion";

export const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden slant-divider-bottom-lg z-10">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 select-none"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container-custom relative z-20 h-full flex flex-col justify-center text-white pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up" delay={0.2} duration={1.2}>
            <div className="flex justify-center mb-6">
              <img
                src="https://yhidsiecvccoeillkjvq.supabase.co/storage/v1/object/public/media/square-logo.png"
                alt="Alrabat SE Logo"
                className="h-32 md:h-40 w-auto object-cover opacity-90"
              />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4} duration={1.2}>
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight leading-tight mb-6">
              <TextReveal delay={0.4}>THE BOND OF</TextReveal>{" "}
              <span className="text-accent">
                <TextReveal delay={0.6}>SUCCESS</TextReveal>
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
