import React from "react";
import { Section } from "../components/ui/Section";
import { FadeIn } from "../components/animations/FadeIn";
import {
  ShieldCheck,
  Building2,
  FileCheck,
  Zap,
  Award,
  Landmark,
} from "lucide-react";

export const OurTeam = () => {
  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-20 bg-neutral-dark text-white text-center slant-divider-bottom-lg">
        <div className="container-custom">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
            Our People
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Dedicated professionals driving innovation and excellence across all
            our divisions.
          </p>
        </div>
      </div>

      {/* Team */}
      {/* Leadership */}
      <Section>
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-primary mb-12 border-l-4 border-accent pl-4">
            Executive Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Aman Lashin",
                role: "Co-Founder & Managing Director",
                email: "aman.lashin@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80",
                bio: "Driving strategic growth and operational excellence across the region with visionary leadership.",
              },
              {
                name: "Mohamed Ahmed Ghalwash",
                role: "Co-Founder & Chairman",
                email: "mohamed.ghalwash@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80",
                bio: "Leading the board with decades of industry expertise and a commitment to sustainable development.",
              },
              {
                name: "Ibrahim Ghalwash",
                role: "Board Member",
                email: "ibrahim.ghalwash@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80",
                bio: "Overseeing corporate governance and strategic partnerships to ensure long-term value.",
              },
              {
                name: "Hussein Ghalwash",
                role: "Board Member",
                email: "hussein.ghalwash@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80",
                bio: "Guiding financial stewardship and investment strategies for robust organizational health.",
              },
            ].map((member, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="h-80 bg-neutral-100 mb-6 overflow-hidden slant-br grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center leading-relaxed text-sm">
                      {member.bio}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-accent font-bold uppercase tracking-wider mb-1">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-neutral-500 hover:text-primary transition-colors block lowercase"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Rest of Team */}
      <Section className="bg-neutral-50" slantedTop>
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-primary mb-12 border-l-4 border-accent pl-4">
            Management Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Tarek Hassan",
                role: "Operations Director",
                email: "tarek.hassan@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Sarah El-Sayed",
                role: "Technical Manager",
                email: "sarah.elsayed@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Omar Khaled",
                role: "Finance Director",
                email: "omar.khaled@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Nour Mahmoud",
                role: "HR Manager",
                email: "nour.mahmoud@alrabat.com",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=500&q=80",
              },
            ].map((member, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="h-72 bg-white mb-6 overflow-hidden slant-br grayscale group-hover:grayscale-0 transition-all duration-500 relative shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-accent font-bold uppercase tracking-wider mb-1">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-neutral-500 hover:text-primary transition-colors block lowercase"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* Qualifications Section */}
      <Section className="bg-white" slantedTop>
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-3xl font-display font-bold text-primary mb-12 border-l-4 border-accent pl-4">
              Accreditations & Certified Professionals
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                authority: "Dubai Municipality",
                icon: Building2,
                stats: [
                  { text: "Shoring & Piling Foundation Certified", count: 5 },
                  { text: "Water Supply Lines Certified", count: 2 },
                  { text: "Soil Improvement Qualified", count: 2 },
                  { text: "Sewerage & Pipelines Certified", count: 1 },
                ],
              },
              {
                authority: "Trakhees",
                icon: FileCheck,
                stats: [
                  { text: "Qualified Safety Professionals", count: 5 },
                  { text: "Qualified Quality Control Professionals", count: 2 },
                  { text: "Qualified Structural Professionals", count: 2 },
                ],
              },
              {
                authority: "RTA",
                icon: ShieldCheck,
                stats: [
                  { text: "Approved Safety Professionals", count: 2 },
                  { text: "Approved Shoring & Piling Professionals", count: 2 },
                ],
              },
              {
                authority: "Dubai Development Authority",
                icon: Landmark,
                stats: [{ text: "Qualified Professionals", count: 5 }],
              },
              {
                authority: "DEWA",
                icon: Zap,
                stats: [{ text: "Qualified Professionals", count: 2 }],
              },
              {
                authority: "Nakheel",
                icon: Award,
                stats: [{ text: "Nakheel Qualification", count: 1 }],
              },
            ].map((item, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 0.1}
                className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {item.authority}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {item.stats.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-bold text-accent min-w-[1.5rem]">
                        {s.count}
                      </span>
                      <span className="text-neutral-600 text-sm leading-relaxed">
                        {s.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};
