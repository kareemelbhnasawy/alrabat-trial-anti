import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-primary/70 z-10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
                    alt="Construction Site"
                    className="w-full h-full object-cover"
                />
                {/* Placeholder for video - replacing with image for stability if video unavailable */}
            </div>

            {/* Content */}
            <div className="container-custom relative z-20 text-center text-white pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* <span className="inline-block py-2 px-4 border border-white/30 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-white/10 backdrop-blur-sm">
                        Dubai · United Arab Emirates
                    </span> */}

                    <div className="flex justify-center mb-0">
                        <img
                            src="/assets/square-logo.png"
                            alt="Alrabat SE Logo"
                            className="h-40 md:h-20 lg:h-40 w-auto object-cover"
                        />
                    </div>

                    <h1 className="text-[3.6rem] font-medium tracking-tight leading-tight mb-6">
                        THE BOND OF <span className="text-accent">SUCCESS</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 mb-10 font-light leading-relaxed">
                        Your foundation experts in piling, shoring & ground engineering.
                        Delivering fully tailored integrated ground solutions since 2007.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Button size="lg" onClick={() => window.location.href = '/divisions'}>
                            Explore Divisions
                        </Button>
                        <Button variant="white" size="lg" onClick={() => window.location.href = '/projects'}>
                            View Projects
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown size={32} />
            </motion.div>
        </div>
    );
};
