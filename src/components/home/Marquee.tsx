import React from 'react';

const LOGOS = [
    "Emaar", "Damac", "Nakheel", "Aldar", "Dubai Properties",
    "Arabtec", "ASGC", "Six Construct", "WSP", "Atkins"
];

export const Marquee = () => {
    return (
        <div className="bg-primary-dark py-12 overflow-hidden border-y border-white/5">
            <div className="relative w-full flex">
                <div className="flex animate-marquee whitespace-nowrap space-x-16 items-center">
                    {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
                        <span key={idx} className="text-2xl md:text-3xl font-display font-bold text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default">
                            {logo}
                        </span>
                    ))}
                </div>
                <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap space-x-16 items-center ml-16">
                    {/* Duplicate simpler mechanism handled by the first list if wide enough, 
               but for true infinite loop usually we duplicate the list. 
               The CSS 'animate-marquee' handles the translation. 
           */}
                </div>
            </div>
        </div>
    );
};
