import React from 'react';
import { Section } from '../components/ui/Section';
import clientsData from '../data/clients.json';
import { Button } from '../components/ui/Button';

export const Clients = () => {
    return (
        <>
            <div className="pt-32 pb-20 bg-neutral-dark text-white text-center">
                <div className="container-custom">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Trusted Partners</span>
                    <h1 className="text-5xl font-display font-bold mb-6">Our Clients</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Building lasting relationships with the region's leading developers, contractors, and consultants.
                    </p>
                </div>
            </div>

            <Section>
                <div className="container-custom space-y-24">
                    {clientsData.map((category, idx) => (
                        <div key={idx}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-200 pb-4">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl font-bold text-primary mb-4">{category.category}</h2>
                                    <p className="text-neutral-600">{category.description}</p>
                                </div>
                                <div className="mt-4 md:mt-0 flex gap-2">
                                    {category.typicalNeeds && category.typicalNeeds.map((need, i) => (
                                        <span key={i} className="text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full">{need}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                {category.exampleLogos.map((logo, i) => (
                                    <div key={i} className="aspect-square bg-white border border-neutral-100 rounded-lg flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-shadow group">
                                        <span className="text-neutral-300 font-bold text-lg text-center group-hover:text-primary transition-colors">{logo}</span>
                                        {/* In real app, img tag here */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <div className="bg-primary/5 py-24 text-center">
                <h2 className="text-3xl font-bold text-primary mb-6">Ready to work together?</h2>
                <div className="flex justify-center space-x-4">
                    <Button onClick={() => window.location.href = '/contact'}>Contact Us</Button>
                    <Button variant="outline" onClick={() => window.location.href = '/projects'}>View Portfolio</Button>
                </div>
            </div>
        </>
    );
};
