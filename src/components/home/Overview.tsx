import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export const Overview = () => {
    return (
        <Section>
            <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Who We Are</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                        Building the foundation <br /> of the future.
                    </h2>
                    <div className="h-1 w-20 bg-accent mb-8" />
                    <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                        Established in 2007 in Dubai, UAE, Alrabat Specialized Engineering is a subsidiary of the Rabat Business Group, which has been driving development since 1980.
                    </p>
                    <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                        Our name signifies unity and integration. We are committed to delivering the highest standards of safety and quality in piling, shoring, and ground improvement solutions across the region.
                    </p>
                    <div className="flex space-x-4">
                        <Button onClick={() => window.location.href = '/about'}>More About Us</Button>
                        <Button variant="outline" onClick={() => window.location.href = '/divisions'}>Our Capabilities</Button>
                    </div>
                </div>

                <div className="relative">
                    {/* Abstract shape or secondary image */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                    <div className="relative z-10 grid grid-cols-2 gap-4">
                        <div className="space-y-4 mt-8">
                            <div className="bg-white p-6 shadow-xl slant-br relative overflow-hidden group">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />
                                <h3 className="text-4xl font-bold text-primary mb-1 mt-2">15+</h3>
                                <p className="text-sm text-neutral-500 font-medium uppercase">Years Experience</p>
                            </div>
                            <div className="bg-primary p-6 shadow-xl slant-tl text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-1.5 bg-accent" />
                                <h3 className="text-4xl font-bold mb-1 mt-2">6</h3>
                                <p className="text-sm text-white/70 font-medium uppercase">Specialized Divisions</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-neutral-bg p-6"></div> {/* Spacer */}
                            <div className="bg-white p-6 shadow-xl slant-br relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
                                <h3 className="text-4xl font-bold text-primary mb-1 mt-2">5M+</h3>
                                <p className="text-sm text-neutral-500 font-medium uppercase">Safe Man-Hours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};
