import React from 'react';
import { Section } from '../components/ui/Section';
import { Target, Eye, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

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
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Eye size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-display text-primary mb-4">Our Vision</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            To be the leader in ground solutions, integrating cutting-edge technologies to deliver tailored excellence with a legacy of trust.
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center"
                    >
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-display text-primary mb-4">Our Mission</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Providing fully tailored integrated ground solutions of the highest quality to achieve exceptional customer satisfaction.
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 shadow-sm border border-neutral-100 slant-br text-center"
                    >
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-600">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-display text-primary mb-4">Our Values</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Safety, quality, and innovative solutions are the core bonds that drive our success and relationships.
                        </p>
                    </motion.div>
                </div>
            </Section>

            {/* Story */}
            <Section className="bg-neutral-50" slantedTop>
                <div className="container-custom">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-display font-bold text-primary mb-16 text-center"
                    >
                        Our Story
                    </motion.h2>
                    <div className="max-w-4xl mx-auto relative pl-12 md:pl-16">
                        {/* Animated Timeline Line */}
                        <motion.div
                            className="absolute left-[11px] md:left-[15px] top-3 w-1 bg-primary/20 origin-top"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ height: 'calc(100% - 24px)' }}
                        />

                        <div className="space-y-16">
                            {[
                                { year: "1980", title: "The Foundation", desc: "Rabat Business Group founded in Egypt, focusing on real estate, contracting, and architectural design." },
                                { year: "2007", title: "Expansion to UAE", desc: "Alrabat Specialized Engineering established in Dubai to provide advanced piling and ground improvement services." },
                                { year: "Today", title: "Integrated Solutions", desc: "A leader in six infrastructure divisions, delivering turnkey projects across the region." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.3 }}
                                    className="relative"
                                >
                                    {/* Animated Dot */}
                                    <motion.span
                                        className="absolute -left-[37px] md:-left-[41px] top-1 md:top-2 w-6 h-6 rounded-full bg-primary border-4 border-neutral-50 shadow-md"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.5 + index * 0.3,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 15
                                        }}
                                    />
                                    {/* Pulse ring animation */}
                                    <motion.span
                                        className="absolute -left-[37px] md:-left-[41px] top-1 md:top-2 w-6 h-6 rounded-full bg-primary/30"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.6 + index * 0.3,
                                            ease: "easeOut"
                                        }}
                                    />
                                    <h3 className="text-3xl font-bold text-primary mb-2">{item.year}</h3>
                                    <p className="text-lg font-bold text-accent mb-2 uppercase tracking-wide">{item.title}</p>
                                    <p className="text-neutral-600 leading-relaxed max-w-2xl">{item.desc}</p>
                                </motion.div>
                            ))}
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
                            { 
                                name: "Aman Lashin", 
                                role: "Co-Founder & Managing Director",
                                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80"
                            },
                            { 
                                name: "Mohamed Ahmed Ghalwash", 
                                role: "Co-Founder & Chairman",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80"
                            },
                            { 
                                name: "Ibrahim Ghalwash", 
                                role: "Board Member",
                                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80"
                            },
                            { 
                                name: "Hussein Ghalwash", 
                                role: "Board Member",
                                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80"
                            }
                        ].map((member, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="h-80 bg-neutral-100 mb-6 overflow-hidden slant-br grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                                <p className="text-xs text-accent font-bold uppercase tracking-wider">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
};
