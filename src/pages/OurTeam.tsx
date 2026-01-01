import React from "react";
import { Section } from "../components/ui/Section";

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
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80",
                bio: "Driving strategic growth and operational excellence across the region with visionary leadership.",
              },
              {
                name: "Mohamed Ahmed Ghalwash",
                role: "Co-Founder & Chairman",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80",
                bio: "Leading the board with decades of industry expertise and a commitment to sustainable development.",
              },
              {
                name: "Ibrahim Ghalwash",
                role: "Board Member",
                image:
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80",
                bio: "Overseeing corporate governance and strategic partnerships to ensure long-term value.",
              },
              {
                name: "Hussein Ghalwash",
                role: "Board Member",
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
                <p className="text-xs text-accent font-bold uppercase tracking-wider">
                  {member.role}
                </p>
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
                image:
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Sarah El-Sayed",
                role: "Technical Manager",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Omar Khaled",
                role: "Finance Director",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80",
              },
              {
                name: "Nour Mahmoud",
                role: "HR Manager",
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
                <p className="text-xs text-accent font-bold uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};
