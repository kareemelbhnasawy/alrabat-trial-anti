import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Division } from '../../types';

interface DivisionCardProps {
    division: Division;
    index: number;
}

export const DivisionCard = ({ division, index }: DivisionCardProps) => {
    const accentColor = division.accentColor || '#F05B22'; // Default accent

    return (
        <div className="relative group h-full">
            <div
                className="absolute inset-0 rounded-lg translate-x-1.5 translate-y-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"
                style={{ backgroundColor: accentColor }}
            />
            <Link
                to={`/divisions/${division.slug}`}
                className="relative z-10 block overflow-hidden rounded-lg bg-white shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 border border-neutral-100 h-full"
                style={{ '--accent': accentColor } as React.CSSProperties}
            >
                <div className="h-64 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                    src={division.heroImage}
                    alt={division.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="p-8 relative">
                <span className="text-4xl text-neutral-100 font-display font-bold absolute top-4 right-4 z-0 group-hover:text-neutral-200 transition-colors">
                    0{index + 1}
                </span>
                <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-[var(--accent)] transition-colors">
                        {division.name}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        {division.summary}
                    </p>
                    <div className="flex items-center text-primary font-bold text-sm group-hover:text-[var(--accent)] transition-colors">
                        Learn More <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
            </div>
            </Link>
        </div>
    );
};
