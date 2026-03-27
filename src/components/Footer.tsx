import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Instagram,
  ArrowRight,
  Twitter,
} from "lucide-react";
import { Logo } from "./ui/Logo";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-32 pb-10 slant-divider-lg -mt-20 relative z-20">
      <div className="container-custom grid grid-cols-1 gap-12 mb-16 relative md:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.85fr)_minmax(15rem,0.85fr)] lg:gap-x-24 lg:gap-y-12 lg:items-start">
        {/* Brand */}
        <div className="space-y-2 max-w-[34rem] lg:pr-8">
          <Logo className="-ml-60 md:-ml-14 lg:-ml-44 -mt-10" />
          <div className="space-y-4 max-w-[29rem]">
            <p className="text-neutral-300 text-sm leading-relaxed text-justify">
              "THE BOND OF SUCCESS"
              <br className="mb-2" />
              Providing fully tailored integrated ground solutions with highest
              quality standards since 2007.
            </p>
            <div className="text-xs text-neutral-300 space-y-3 text-justify">
              <p>+971 4 267 6054 / +971 4 337 8073</p>
              <p>info@alrabatse.com</p>
              <p>401, Red Crescent Building, Al Garhoud, Dubai, U.A.E</p>
              <p>411, DBCS Building, Al Garhoud, Dubai, U.A.E</p>
            </div>
          </div>
          {/* <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-accent transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-accent transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-accent transition-colors"
            >
              <Facebook size={18} />
            </a>
          </div> */}
        </div>

        {/* Divisions */}
        <div className="max-w-[18rem] justify-self-start lg:pt-4">
          <h4 className="font-display font-bold text-lg mb-8 text-accent">
            Our Divisions
          </h4>
          <ul className="space-y-4 text-sm text-neutral-300">
            <li>
              <Link
                to="/divisions/foundations"
                className="hover:text-white transition-colors"
              >
                Foundations
              </Link>
            </li>
            <li>
              <Link
                to="/divisions/ground-improvement"
                className="hover:text-white transition-colors"
              >
                Ground Improvement
              </Link>
            </li>
            <li>
              <Link
                to="/divisions/infrastructure"
                className="hover:text-white transition-colors"
              >
                Infrastructure
              </Link>
            </li>
            <li>
              <Link
                to="/divisions/marine"
                className="hover:text-white transition-colors"
              >
                Marine
              </Link>
            </li>
            <li>
              <Link
                to="/divisions/equipment"
                className="hover:text-white transition-colors"
              >
                Equipment
              </Link>
            </li>
            <li>
              <Link
                to="/divisions/specialized-engineering"
                className="hover:text-white transition-colors"
              >
                Specialized Engineering
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="max-w-[18rem] justify-self-start lg:pt-4">
          <h4 className="font-display font-bold text-lg mb-8 text-accent">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm text-neutral-300">
            <li>
              <Link to="/about/story" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="hover:text-white transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                className="hover:text-white transition-colors"
              >
                Clients
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-white transition-colors">
                News & Insights
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* <div>
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
                </div> */}
      </div>

      <div className="container-custom pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
        <p>
          &copy; {new Date().getFullYear()} Alrabat Specialized Engineering. All
          rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/admin" className="hover:text-white">
            Admin Login
          </Link>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
};
