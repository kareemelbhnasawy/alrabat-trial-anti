import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './ui/Logo';
import { Button } from './ui/Button';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
    { name: 'About', href: '/about' },
    { name: 'Divisions', href: '/divisions' },
    { name: 'Clients', href: '/clients' },
    { name: 'Projects', href: '/projects' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || isOpen ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                <Logo isScrolled={isScrolled || isOpen} />

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-8">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) =>
                                clsx(
                                    "text-sm font-medium tracking-wide transition-colors hover:text-accent",
                                    isActive ? "text-accent" : (isScrolled ? "text-primary/80" : "text-white")
                                )
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <Button size="sm" onClick={() => window.location.href = '/contact'}>
                        Request Proposal
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={clsx(
                        "lg:hidden transition-colors",
                        isScrolled || isOpen ? "text-primary" : "text-white"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
                    >
                        <div className="container-custom py-8 flex flex-col space-y-4">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    className={({ isActive }) =>
                                        clsx(
                                            "text-lg font-medium py-2 border-b border-neutral-50",
                                            isActive ? "text-accent" : "text-primary"
                                        )
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="pt-4">
                                <Button className="w-full" onClick={() => window.location.href = '/contact'}>Request Proposal</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
