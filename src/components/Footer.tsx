import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, ArrowRight, Twitter } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-32 pb-10 slant-divider-lg -mt-20 relative">
            <div className="slant-accent-stripe top-0 left-0" style={{ clipPath: 'polygon(-2px 80px, 80px -2px, calc(100% + 2px) -2px, calc(100% + 2px) 3px, 80px 3px, -2px 83px)' }} />
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div className="space-y-6">
                    <div className="flex flex-col leading-none">
                        <span className="text-3xl font-display font-extrabold tracking-tighter text-white">ALRABAT</span>
                        <span className="text-3xl font-display font-light text-accent">SE</span>
                        <span className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">Specialized Engineering</span>
                    </div>
                    <p className="text-neutral-300 text-sm leading-relaxed max-w-xs">
                        "THE BOND OF SUCCESS"
                        <br className="mb-2" />
                        Providing fully tailored integrated ground solutions with highest quality standards since 2007.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent transition-colors"><Linkedin size={18} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent transition-colors"><Facebook size={18} /></a>
                    </div>
                </div>

                {/* Divisions */}
                <div>
                    <h4 className="font-display font-bold text-lg mb-6 text-accent">Our Divisions</h4>
                    <ul className="space-y-3 text-sm text-neutral-300">
                        <li><Link to="/divisions/foundations" className="hover:text-white transition-colors">Foundations</Link></li>
                        <li><Link to="/divisions/ground-improvement" className="hover:text-white transition-colors">Ground Improvement</Link></li>
                        <li><Link to="/divisions/infrastructure" className="hover:text-white transition-colors">Infrastructure</Link></li>
                        <li><Link to="/divisions/marine" className="hover:text-white transition-colors">Marine</Link></li>
                        <li><Link to="/divisions/equipment" className="hover:text-white transition-colors">Equipment</Link></li>
                        <li><Link to="/divisions/consulting" className="hover:text-white transition-colors">Consulting</Link></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-display font-bold text-lg mb-6 text-accent">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-neutral-300">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                        <li><Link to="/clients" className="hover:text-white transition-colors">Clients</Link></li>
                        <li><Link to="/news" className="hover:text-white transition-colors">News & Insights</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-display font-bold text-lg mb-6 text-accent">Stay Updated</h4>
                    <p className="text-sm text-neutral-300 mb-4">Subscribe to our newsletter for the latest engineering insights.</p>
                    <form className="space-y-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent"
                        />
                        <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold py-3 rounded transition-colors flex items-center justify-center">
                            Subscribe <ArrowRight size={16} className="ml-2" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="container-custom pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
                <p>&copy; {new Date().getFullYear()} Alrabat Specialized Engineering. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link to="/admin" className="hover:text-white">Admin Login</Link>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Use</a>
                </div>
            </div>
        </footer>
    );
};
