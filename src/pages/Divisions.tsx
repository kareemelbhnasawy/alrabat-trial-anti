import React from 'react';
import { Section } from '../components/ui/Section';
import { DivisionCard } from '../components/cards/DivisionCard';
import divisionsData from '../data/divisions.json';
import type { Division } from '../types';

export const Divisions = () => {
    const divisions = divisionsData as unknown as Division[];

    return (
        <>
            {/* Hero */}
            <div className="bg-primary text-white pt-32 pb-40 relative overflow-hidden slant-divider-bottom-lg">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80" alt="Background" className="w-full h-full object-cover" />
                </div>
                <div className="container-custom relative z-10">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Integrated Ground Solutions</h1>
                    <p className="text-xl text-neutral-300 max-w-3xl leading-relaxed">
                        Alrabat SE operates through six specialized divisions, each a leader in its field, working together to deliver turnkey engineering solutions for the most complex challenges.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <Section>
                <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {divisions.map((division, idx) => (
                        <DivisionCard key={division.id} division={division} index={idx} />
                    ))}
                </div>
            </Section>
        </>
    );
};
