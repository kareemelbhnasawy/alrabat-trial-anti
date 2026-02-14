import React from "react";
import { clsx } from "clsx";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  slantedTop?: boolean;
  orangeAccent?: boolean;
  primaryAccent?: boolean;
}

export const Section = ({
  children,
  className,
  id,
  dark = false,
  slantedTop = false,
  orangeAccent = false,
  primaryAccent = false,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={clsx(
        "py-24 relative overflow-hidden",
        dark
          ? "bg-primary text-white section-divider-dark"
          : "bg-neutral-bg text-neutral-dark section-divider",
        slantedTop && "slant-divider-lg -mt-20 pt-32",
        className,
      )}
    >
      {slantedTop && orangeAccent && (
        <div
          className="slant-accent-stripe top-0 left-0"
          style={{
            clipPath:
              "polygon(0 80px, 80px 0, 100% 0, 100% 40px, 80px 40px, 0 120px)",
          }}
        />
      )}
      {slantedTop && primaryAccent && (
        <div
          className="slant-primary-stripe top-0 left-0"
          style={{
            clipPath:
              "polygon(0 80px, 80px 0, 100% 0, 100% 40px, 80px 40px, 0 120px)",
          }}
        />
      )}
      {children}
    </section>
  );
};
