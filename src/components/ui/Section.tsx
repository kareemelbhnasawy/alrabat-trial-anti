import React from 'react';
import { clsx } from 'clsx';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    dark?: boolean;
    slantedTop?: boolean;
    orangeAccent?: boolean;
}

export const Section = ({ children, className, id, dark = false, slantedTop = false, orangeAccent = false }: SectionProps) => {
    return (
        <section
            id={id}
            className={clsx(
                "py-24 relative overflow-hidden",
                dark ? "bg-primary text-white" : "bg-neutral-bg text-neutral-dark",
                slantedTop && "slant-divider-lg -mt-20 pt-32",
                className
            )}
        >
            {slantedTop && orangeAccent && (
                <div className="slant-accent-stripe top-0 left-0" style={{ clipPath: 'polygon(-2px 80px, 80px -2px, calc(100% + 2px) -2px, calc(100% + 2px) 3px, 80px 3px, -2px 83px)' }} />
            )}
            {children}
        </section>
    );
};
