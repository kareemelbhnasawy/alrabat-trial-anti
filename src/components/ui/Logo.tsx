import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <Link to="/" className="flex flex-col leading-none group">
            <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-display font-extrabold text-primary tracking-tighter">ALRABAT</span>
                <span className="text-2xl font-display font-light text-accent">SE</span>
            </div>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-primary/80 font-medium group-hover:text-accent transition-colors">
                Specialized Engineering
            </span>
        </Link>
    );
};
