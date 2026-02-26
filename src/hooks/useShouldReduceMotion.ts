import React from "react";
import { useReducedMotion } from "framer-motion";

export const useShouldReduceMotion = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isLowPowerDevice, setIsLowPowerDevice] = React.useState(false);

  React.useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;

    const lowMemory = typeof memory === "number" ? memory <= 4 : false;
    setIsLowPowerDevice(cores <= 4 || lowMemory);
  }, []);

  return Boolean(prefersReducedMotion || isLowPowerDevice);
};

