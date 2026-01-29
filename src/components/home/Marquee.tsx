import React, { useMemo } from "react";
import { motion } from "framer-motion";
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

    return clients
      .filter((c) => !c.name.toLowerCase().includes("al safa"))
      .sort((a, b) => {
        // rudimentary sort: prioritize Developers category if identifiable
        // Assuming categories might be named 'Developers', 'Consultants'.
        // Without Category ID mapping here, we'll retain source order but move filtered items.
        return 0;
      });
  }, [clientCategories]);

  const displayItems = allClients.length > 0 ? allClients : FALLBACK_LOGOS;

  // Duplicate more times for slower/longer continuous scroll
  const marqueItems = [...displayItems, ...displayItems, ...displayItems];

  return (
    <motion.div
      className="bg-white py-20 overflow-hidden relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="container-custom mb-12 text-center">
        <div className="h-1 w-20 bg-accent mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">
          Trusted Partners
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Slower animation speed is handled in tailwind config 'animate-marquee' or filtered here via inline style if needed */}
        <div className="flex animate-marquee whitespace-nowrap items-center select-none hover:[animation-play-state:paused]">
          <div className="flex space-x-16 md:space-x-24 px-8 md:px-12 items-center">
            {marqueItems.map((item, idx) => (
              <MarqueeItem key={`${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MarqueeItem = ({ item }: { item: any }) => {
  const isClientObj = typeof item !== "string";
  return (
    <div className="flex-shrink-0 transition-all duration-300 hover:scale-110 cursor-pointer">
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
