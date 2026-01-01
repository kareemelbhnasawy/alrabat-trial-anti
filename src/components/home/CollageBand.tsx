import React from "react";
import { Section } from "../ui/Section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ITEMS = [
  {
    title: "Foundations",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    color: "bg-primary",
    textComp: "text-white",
    desc: "Deep piling & shoring for high-rise structures.",
    link: "/divisions/foundations",
  },
  {
    title: "Marine",
    image:
      "https://images.unsplash.com/photo-1691732615771-1d6cada73c20?auto=format&fit=crop&w=800&q=80",
    color: "bg-accent",
    textComp: "text-white",
    desc: "Coastal protection and quay wall construction.",
    link: "/divisions/marine",
  },
  {
    title: "Ground Improvement",
    image:
      "https://images.unsplash.com/photo-1758634057888-7a4f9e50322a?auto=format&fit=crop&w=800&q=80",
    color: "bg-white",
    textComp: "text-primary",
    desc: "Advanced soil stabilization techniques.",
    link: "/divisions/ground-improvement",
  },
];

export const CollageBand = () => {
  return (
    <Section className="!py-0">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {ITEMS.map((item, idx) => (
          <div key={idx} className="group relative flex flex-col">
            {/* Image Top */}
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Card Bottom */}
            <Link
              to={item.link}
              className={`flex-1 p-10 ${item.color} ${item.textComp} flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2`}
            >
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-4">
                  Division 0{idx + 1}
                </span>
                <h3 className="text-3xl font-display font-bold mb-4">
                  {item.title}
                </h3>
                <p className="opacity-80 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 flex items-center font-bold text-sm tracking-wide">
                EXPLORE{" "}
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-2"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
};
