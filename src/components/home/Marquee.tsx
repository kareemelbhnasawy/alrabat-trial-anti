import React, { useMemo } from "react";
import { useData } from "../../context/DataContext";

const FALLBACK_LOGOS = [
  "Emaar",
  "Damac",
  "Nakheel",
  "Aldar",
  "Dubai Properties",
  "Arabtec",
  "ASGC",
  "Six Construct",
  "WSP",
  "Atkins",
];

export const Marquee = () => {
  const { clientCategories } = useData();

  const allClients = useMemo(() => {
    // Flatten clients from categories
    const clients = clientCategories.flatMap((cat) => cat.clients || []);

    // Sort: Developers first (Category ID check or name check might be needed if structure allows,
    // assuming category orders generally reflect importance or simple flattening here).
    // The request says "Developers to be up before consultants".
    // We'll rely on the source data order or specific category IDs if known.
    // For now, let's filter out "Al Safa" as requested.

    const filtered = clients.filter(
      (c) => !c.name.toLowerCase().includes("al safa"),
    );
    const highlighted = filtered.filter((c) => c.is_highlighted);
    return highlighted.length > 0 ? highlighted : filtered;
  }, [clientCategories]);

  const displayItems =
    allClients.length > 0 ? allClients.slice(0, 14) : FALLBACK_LOGOS;

  // Duplicate more times for slower/longer continuous scroll
  const marqueItems = [...displayItems, ...displayItems, ...displayItems];

  return (
    <div className="bg-white py-20 overflow-hidden relative z-10 border-y border-neutral-100">
      <div className="container-custom mb-12 text-center">
        <div className="h-1 w-20 bg-accent mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">
          Trusted By
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        {/* Slower animation speed is handled in tailwind config 'animate-marquee' */}
        {/* We use two identical side-by-side containers that both translate from 0% to -100% of their own width */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap items-center select-none cursor-pointer group-hover:[animation-play-state:paused]">
          <div className="flex space-x-16 md:space-x-24 px-8 md:px-12 items-center">
            {marqueItems.map((item, idx) => (
              <MarqueeItem key={`m1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Second identical container for seamless infinite loop */}
        <div
          className="flex shrink-0 animate-marquee whitespace-nowrap items-center select-none cursor-pointer group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <div className="flex space-x-16 md:space-x-24 px-8 md:px-12 items-center">
            {marqueItems.map((item, idx) => (
              <MarqueeItem key={`m2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MarqueeItem = ({ item }: { item: any }) => {
  const isClientObj = typeof item !== "string";
  return (
    <div className="flex-shrink-0">
      {isClientObj && item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-20 md:h-24 max-w-[200px] object-contain"
          // Removed grayscale classes to show original colors as requested
        />
      ) : (
        <span className="text-2xl md:text-4xl font-display font-bold text-neutral-400 uppercase tracking-widest px-4">
          {isClientObj ? item.name : item}
        </span>
      )}
    </div>
  );
};
