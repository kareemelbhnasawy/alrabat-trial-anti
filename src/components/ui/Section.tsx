import React from 'react';
import { clsx } from 'clsx';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    dark?: boolean;
}

export const Section = ({ children, className, id, dark = false }: SectionProps) => {
    return (
        <section
            id={id}
            className={clsx(
                "py-24 relative overflow-hidden",
                dark ? "bg-primary text-white" : "bg-neutral-bg text-neutral-dark",
                className
            )}
        >
            {children}
        </section>
    );
};
