import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useShouldReduceMotion } from "../../hooks/useShouldReduceMotion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const TextReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useShouldReduceMotion();

  // Split text into words
  const words = children.split(" ");

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
      willChange: "transform, opacity",
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ overflow: "hidden", display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
