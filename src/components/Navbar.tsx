import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './ui/Logo';
import { Button } from './ui/Button';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import divisionsData from '../data/divisions.json';

const NAV_LINKS = [
    { name: 'About', href: '/about' },
    { name: 'Divisions', href: '/divisions', hasDropdown: true },
    { name: 'Clients', href: '/clients' },
    { name: 'Projects', href: '/projects' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setHoveredLink(null);
    }, [location.pathname]);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || isOpen ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
            )}
            onMouseLeave={() => setHoveredLink(null)}
        >
            <div className="container-custom flex items-center justify-between">
                <Logo isScrolled={isScrolled || isOpen} />

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-8">
                    {NAV_LINKS.map((link) => (
                        <div
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => link.hasDropdown && setHoveredLink(link.name)}
                            onMouseLeave={() => link.hasDropdown && setHoveredLink(null)}
                        >
                            <NavLink
                                to={link.href}
                                className={({ isActive }) =>
                                    clsx(
                                        "text-sm font-medium tracking-wide transition-colors hover:text-accent flex items-center gap-1",
                                        isActive || (link.hasDropdown && location.pathname.startsWith('/divisions')) ? "text-accent" : (isScrolled ? "text-primary/80" : "text-white")
                                    )
                                }
                            >
                                {link.name}
                                {link.hasDropdown && (
                                    <ChevronDown size={14} className={clsx("transition-transform", hoveredLink === link.name ? "rotate-180" : "")} />
                                )}
                            </NavLink>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {link.hasDropdown && hoveredLink === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                                        exit={{ opacity: 0, y: 10, x: "-50%" }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 pt-4 z-50 min-w-max"
                                    >
                                        <div className="bg-white rounded-lg shadow-xl border border-neutral-100 overflow-hidden py-3 px-3 flex gap-2">
                                            {divisionsData.map((division) => (
                                                <div
                                                    key={division.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/divisions/${division.slug}`);
                                                        setHoveredLink(null);
                                                    }}
                                                    className="px-4 py-3 cursor-pointer group/item transition-all duration-200 rounded-md hover:scale-105"
                                                    style={{
                                                        // Using the accent color for text always
                                                        color: division.accentColor,
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = `${division.accentColor}15`; // 8% opacity background
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    <div className="font-semibold text-sm whitespace-nowrap">
                                                        {division.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
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
                                <div key={link.name}>
                                    <NavLink
                                        to={link.href}
                                        className={({ isActive }) =>
                                            clsx(
                                                "text-lg font-medium py-2 border-b border-neutral-50 block",
                                                isActive ? "text-accent" : "text-primary"
                                            )
                                        }
                                        onClick={() => !link.hasDropdown && setIsOpen(false)}
                                    >
                                        {link.name}
                                    </NavLink>
                                    {link.hasDropdown && (
                                        <div className="pl-4 mt-2 space-y-2 border-l-2 border-neutral-100 ml-1">
                                            {divisionsData.map((division) => (
                                                <div
                                                    key={division.id}
                                                    onClick={() => {
                                                        navigate(`/divisions/${division.slug}`);
                                                        setIsOpen(false);
                                                    }}
                                                    className="text-primary/80 py-1 cursor-pointer font-medium hover:text-accent transition-colors"
                                                    style={{ borderLeftColor: division.accentColor }}
                                                >
                                                   <span style={{ color: division.accentColor }} className="mr-2">●</span> {division.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
