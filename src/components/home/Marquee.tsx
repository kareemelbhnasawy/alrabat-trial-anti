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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Marquee = () => {
  const { clientCategories } = useData();

  const allClients = useMemo(() => {
    const clients = clientCategories.flatMap((cat) => cat.clients || []);
    return clients.length > 0 ? clients : null;
  }, [clientCategories]);

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

  const displayItems = allClients || FALLBACK_LOGOS;

  // Duplicate list 4 times for seamless loop on wide screens
  // We animate from 0% to -50% of the container.
  // Container has 2 sets of items (Original + Duplicate).
  // Actually, simple marquee usually translates the inner container.
  // Let's create a seamless loop by duplicating the list enough times.
  const marqueItems = [
    ...displayItems,
    ...displayItems,
    ...displayItems,
    ...displayItems,
  ];

  return (
    <motion.div
      className="bg-primary-dark py-16 overflow-hidden border-y border-white/5 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    >
      {/* Gradient Masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-dark to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-dark to-transparent z-20 pointer-events-none" />

      <div className="container-custom mb-10 text-center">
        <h2 className="text-xl md:text-2xl font-display font-light text-white/40 tracking-widest uppercase">
          Trusted Partners
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* 
                   We need a container purely for animation.
                   If we translate -50%, we need 2 full sets.
                */}
        <div className="flex animate-marquee whitespace-nowrap items-center select-none hover:[animation-play-state:paused]">
          {/* First Set */}
          <div className="flex space-x-16 md:space-x-24 px-8 md:px-12">
            {marqueItems.map((item, idx) => (
              <MarqueeItem key={`1-${idx}`} item={item} />
            ))}
          </div>
          {/* Duplicate Set for smooth loop (if using standard translateX(-100%) on one element, but here using a long chain)
                       Actually if css is translate -50%, we simply need the content to be duplicated once overall.
                       Let's just use one long strip and rely on standard technique: transform the parent.
                    */}
        </div>
      </div>
    </motion.div>
  );
};

const MarqueeItem = ({ item }: { item: any }) => {
  const isClientObj = typeof item !== "string";
  return (
    <div className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-700 opacity-70 hover:opacity-100 cursor-pointer bg-white/5 p-4 rounded-xl hover:bg-white/10">
      {isClientObj && item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-12 md:h-16 max-w-[180px] object-contain"
        />
      ) : (
        <span className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-widest px-4">
          {isClientObj ? item.name : item}
        </span>
      )}
    </div>
  );
};
