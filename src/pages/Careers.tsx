import React, { useState } from "react";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

export const Careers = () => {
  return (
    <>
      <div className="pt-32 pb-40 bg-neutral-dark text-white text-center slant-divider-bottom-lg">
        <h1 className="text-5xl font-display font-bold mb-4">Join Our Team</h1>
        <p className="text-neutral-400">
          Build your future with Alrabat Specialized Engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Info Side */}
        <div className="bg-primary text-white p-12 lg:p-20 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-10">Why Join Us?</h2>
          <div className="space-y-8 text-neutral-300">
            <p className="leading-relaxed">
              We are committed to fostering a culture of safety, innovation, and
              professional growth. At Alrabat, you will work on challenging
              projects that shape the infrastructure of tomorrow.
            </p>

            <div className="mt-8">
              <h3 className="text-white font-bold mb-4">Values We Look For</h3>
              <ul className="space-y-2 list-disc list-inside text-neutral-300">
                <li>Commitment to Safety and Quality</li>
                <li>Technical Excellence and Innovation</li>
                <li>Integrity and Teamwork</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Mail className="mr-3" size={20} /> HR Contact
            </h3>
            <p className="text-neutral-300 mb-2">
              Prefer to email us directly?
            </p>
            <a
              href="mailto:careers@alrabat-se.ae"
              className="text-accent hover:text-white font-bold transition-colors"
            >
              careers@alrabat-se.ae
            </a>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12 lg:p-20 bg-white">
          <div className="mb-10 pb-6 border-b border-neutral-100">
            <h2 className="text-2xl font-bold text-primary">Apply Now</h2>
            <p className="text-neutral-500 mt-2">
              Submit your details and we will get back to you.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-600">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-600">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600">
                Position of Interest
              </label>
              <input
                type="text"
                className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors"
                placeholder="e.g. Civil Engineer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600">
                Experience / Cover Letter
              </label>
              <textarea
                className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors h-40"
                placeholder="Briefly describe your experience..."
              />
            </div>
            <Button className="w-full">Submit Application</Button>
          </form>
        </div>
      </div>
    </>
  );
};
