import React, { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  decimals?: number; // Added decimals prop
}

export const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2,
  className = "",
  decimals = 0, // Default to 0 decimals
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  // Use animate() for precise duration control instead of spring physics
  // limiting the speed effectively.
  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, to, {
        duration: duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, from, to, duration, motionValue]);

  useEffect(() => {
    return motionValue.on("change", (latest: number) => {
      if (ref.current) {
        // Handle decimals
        let value = latest;

        // Format with thousands separators
        // Use standard "en-US" or "en-GB" or undefined for locale
        // Fixing to specific decimals if needed
        const formatted = value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

        ref.current.textContent = formatted;
      }
    });
  }, [motionValue, decimals]);

  // tabular-nums ensures fixed-width numbers to prevent jitter
  return (
    <span
      ref={ref}
      className={`font-variant-numeric:tabular-nums ${className}`}
    />
  );
};
