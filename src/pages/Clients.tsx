import React from "react";
import { Section } from "../components/ui/Section";
import { useData } from "../context/DataContext";
import { Button } from "../components/ui/Button";

export const Clients = () => {
  const { clientCategories } = useData();

  return (
    <>
      <div className="pt-32 pb-40 bg-neutral-dark text-white text-center slant-divider-bottom-lg">
        <div className="container-custom">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
            Trusted Partners
          </span>
          <h1 className="text-5xl font-display font-bold mb-6">Our Clients</h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Building lasting relationships with the region's leading developers,
            contractors, and consultants.
          </p>
        </div>
      </div>

      <Section>
        <div className="container-custom space-y-32">
          {/* Highlighted Clients Section */}
          <div>
            <h2 className="text-3xl font-display font-bold text-primary mb-12 text-center">
              Key Partners
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20 items-center justify-items-center">
              {clientCategories
                .flatMap((cat) => cat.clients || [])
                .filter((c) => c.is_highlighted)
                .map((client, i) => (
                  <div
                    key={i}
                    className="w-full h-32 flex items-center justify-center group relative"
                  >
                    {(client as any).image ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={(client as any).image}
                          alt={client.name}
                          className="h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 transform hover:scale-110"
                        />
                        {client.details && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg text-center z-10 pointer-events-none">
                            {client.details}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-neutral-400 font-bold text-lg text-center group-hover:text-primary transition-colors">
                        {client.name}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {clientCategories.map((category, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-200 pb-4">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    {category.name}
                  </h2>
                  <p className="text-neutral-600">{category.description}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  {category.typical_needs &&
                    category.typical_needs.map((need, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full"
                      >
                        {need}
                      </span>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-items-center">
                {(category.clients || []).map((client, i) => (
                  <div
                    key={i}
                    className="w-full h-24 flex items-center justify-center group relative"
                  >
                    {(client as any).image ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={(client as any).image}
                          alt={client.name}
                          className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 transform hover:scale-110"
                        />
                        {client.details && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg text-center z-10 pointer-events-none">
                            {client.details}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span
                        className={`font-bold text-sm text-center transition-colors ${client.is_highlighted ? "text-primary" : "text-neutral-300 group-hover:text-neutral-500"}`}
                      >
                        {client.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-primary/5 py-24 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Ready to work together?
        </h2>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => (window.location.href = "/contact")}>
            Contact Us
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/projects")}
          >
            View Portfolio
          </Button>
        </div>
      </div>
    </>
  );
};
