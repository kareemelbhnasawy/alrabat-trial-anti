import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

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

  // Split text into words
  const words = children.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
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
