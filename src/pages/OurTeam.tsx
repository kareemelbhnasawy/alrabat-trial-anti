import React, { useEffect, useState } from "react";
import { Section } from "../components/ui/Section";
import { FadeIn } from "../components/animations/FadeIn";
import { DynamicIcon } from "../components/ui/DynamicIcon";
import { supabase } from "../lib/supabase";
import type { Qualification, TeamMember } from "../types";

import { AnimatedCounter } from "../components/animations/AnimatedCounter";

export const OurTeam = () => {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Qualifications
        const { data: qualData, error: qualError } = await supabase
          .from("qualifications")
          .select("*, stats:qualification_stats(*)")
          .order("id");

        if (qualError) throw qualError;

        if (qualData) {
          const sortedQuals = qualData.map((q: any) => ({
            ...q,
            stats: q.stats?.sort(
              (a: any, b: any) => a.display_order - b.display_order,
            ),
          }));
          setQualifications(sortedQuals);
        }

        // Fetch Team Members
        const { data: teamData, error: teamError } = await supabase
          .from("team_members")
          .select("*")
          .order("display_order", { ascending: true });

        if (teamError) throw teamError;
        setTeamMembers(teamData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-neutral-50 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers
                .filter((m) => m.category === "executive")
                .map((member, idx) => (
                  <FadeIn
                    key={member.id}
                    delay={(idx % 3) * 0.1}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={member.image_url || "https://placehold.co/400x500"}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <p className="text-white text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-primary">
                        {member.name}
                      </h3>
                      <div className="text-accent text-xs font-bold uppercase tracking-wider mb-1">
                        {member.role}
                      </div>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-neutral-500 text-sm hover:text-accent transition-colors"
                        >
                          {member.email}
                        </a>
                      )}
                    </div>
                  </FadeIn>
                ))}
            </div>
          )}
        </div>
      </Section>

      {/* Qualifications Section */}
      <Section className="bg-white mt-32 md:mt-60" slantedTop primaryAccent>
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-3xl font-display font-bold text-primary mb-12 border-l-4 border-accent pl-4">
              Accreditations & Certified Professionals
            </h2>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-neutral-50 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {qualifications.map((item, idx) => (
                <FadeIn
                  key={item.id}
                  delay={idx * 0.1}
                  className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 overflow-hidden p-2">
                      <DynamicIcon
                        iconName={item.fallback_icon_name}
                        logoUrl={item.logo_url}
                        className="w-6 h-6"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">
                      {item.authority}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {item.stats?.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center text-xs leading-none shrink-0">
                          <AnimatedCounter to={s.count} duration={1.2} />
                        </span>
                        <span className="text-neutral-600 text-sm leading-relaxed">
                          {s.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
};
