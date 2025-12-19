import React from 'react';
import { Section } from '../components/ui/Section';
import { Target, Eye, Heart } from 'lucide-react';

export const About = () => {
    return (
        <>
            {/* Hero */}
            <div className="pt-32 pb-40 bg-neutral-dark text-white text-center slant-divider-bottom-lg">
                <div className="container-custom">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Our Company</span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">About Alrabat SE</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Established in 2007 in Dubai, UAE, as a subsidiary of the Rabat Business Group, we are dedicated to delivering fully tailored integrated ground solutions.
                    </p>
                </div>
            </div>

            {/* Vision/Mission/Values */}
            <Section>
                <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Eye size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-display text-primary mb-4">Our Vision</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            To be the leader in ground solutions, integrating cutting-edge technologies to deliver tailored excellence with a legacy of trust.
                        </p>
                    </div>
                    <div className="bg-white p-8 shadow-sm border border-neutral-100 rounded-lg text-center">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-display text-primary mb-4">Our Mission</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Providing fully tailored integrated ground solutions of the highest quality to achieve exceptional customer satisfaction.
                        </p>
                    </div>
                    <div className="bg-white p-8 shadow-sm border border-neutral-100 rounded-lg text-center">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-600">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-display text-primary mb-4">Our Values</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Safety, quality, and innovative solutions are the core bonds that drive our success and relationships.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Story */}
            <Section className="bg-neutral-50" slantedTop>
                <div className="container-custom">
                    <h2 className="text-3xl font-display font-bold text-primary mb-12 text-center">Our Story</h2>
                    <div className="max-w-4xl mx-auto border-l-4 border-primary/20 pl-8 space-y-12">
                        <div className="relative">
                            <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-sm" />
                            <h3 className="text-2xl font-bold text-primary mb-2">1980</h3>
                            <p className="text-lg font-medium text-accent mb-2">The Foundation</p>
                            <p className="text-neutral-600">Rabat Business Group founded in Egypt, focusing on real estate, contracting, and architectural design.</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-sm" />
                            <h3 className="text-2xl font-bold text-primary mb-2">2007</h3>
                            <p className="text-lg font-medium text-accent mb-2">Expansion to UAE</p>
                            <p className="text-neutral-600">Alrabat Specialized Engineering established in Dubai to provide advanced piling and ground improvement services.</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-sm" />
                            <h3 className="text-2xl font-bold text-primary mb-2">Today</h3>
                            <p className="text-lg font-medium text-accent mb-2">Integrated Solutions</p>
                            <p className="text-neutral-600">A leader in six infrastructure divisions, delivering turnkey projects across the region.</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Team */}
            <Section>
                <div className="container-custom">
                    <h2 className="text-4xl font-display font-bold text-primary mb-16 text-center">Leadership Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Aman Lashin", role: "Co-Founder & Managing Director" },
                            { name: "Mohamed Ahmed Ghalwash", role: "Co-Founder & Chairman" },
                            { name: "Ibrahim Ghalwash", role: "Board Member" },
                            { name: "Hussein Ghalwash", role: "Board Member" }
                        ].map((member, idx) => (
                            <div key={idx} className="group">
                                <div className="h-80 bg-neutral-100 mb-6 overflow-hidden slant-br grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <img src={`https://source.unsplash.com/random/400x500?portrait&sig=${idx}`} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                                <p className="text-sm text-accent font-bold uppercase tracking-wider">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
};
