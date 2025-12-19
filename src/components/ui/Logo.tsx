import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
    isScrolled?: boolean;
}

export const Logo = ({ isScrolled = false }: LogoProps) => {
    return (
        <Link to="/" className="flex items-center gap-3 group">
            {/* Square Logo Icon - white when not scrolled, colored when scrolled */}
            <img
                src={isScrolled ? "/assets/square-logo.png" : "/assets/square-logo-white.png"}
                alt="Alrabat SE"
                className="h-16 w-16 object-contain transition-opacity duration-300"
            />

            {/* ALRABAT SE Text Logo - transparent when not scrolled, green when scrolled */}
            <img
                src={isScrolled ? "/assets/ALRABAT_SE_logo_green.png" : "/assets/alrabat_se_logo_transparent.png"}
                alt="ALRABAT SE"
                className="h-8 w-auto object-contain transition-opacity duration-300"
            />
        </Link>
    );
};
