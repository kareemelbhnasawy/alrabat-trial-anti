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

      <Section className="bg-neutral-50" slantedTop>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container-custom space-y-24">
          {/* Highlighted Clients Section */}
          <div>
            <h2 className="text-3xl font-display font-bold text-primary mb-12 text-center">
              Key Partners
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20 items-center justify-items-center">
              {clientCategories
                .flatMap((cat) => cat.clients || [])
                .filter((c) => c.is_highlighted)
                .filter((c) => !c.name.toLowerCase().includes("al safa"))
                .map((client, i) => (
                  <div
                    key={i}
                    className="w-full h-32 flex items-center justify-center relative"
                  >
                    {(client as any).image ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={(client as any).image}
                          alt={client.name}
                          className="h-20 w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-neutral-400 font-bold text-lg text-center">
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
                {(category.clients || [])
                  .filter((client) => !client.name.toLowerCase().includes("al safa"))
                  .map((client, i) => (
                  <div
                    key={i}
                    className="w-full h-24 flex items-center justify-center relative"
                  >
                    {(client as any).image ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={(client as any).image}
                          alt={client.name}
                          className="h-16 w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <span
                        className={`font-bold text-sm text-center ${client.is_highlighted ? "text-primary" : "text-neutral-300"}`}
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
