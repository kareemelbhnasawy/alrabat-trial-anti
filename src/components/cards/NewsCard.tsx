import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { NewsArticle } from "../../types";

interface NewsCardProps {
  news: NewsArticle | any; // Allow relaxed type for reuse
  basePath?: string; // Optional base path override
  accentColor?: string; // Optional specific accent color
}

export const NewsCard = ({
  news,
  basePath = "news",
  accentColor,
}: NewsCardProps) => {
  // If accentColor is provided, use it. Otherwise rely on CSS classes (which usually map to generic accent)
  // We'll bind it to a CSS variable for easy hover usage
  const style = accentColor
    ? ({ "--card-accent": accentColor } as React.CSSProperties)
    : undefined;
  // If accentColor is present, title is always that color. Otherwise, primary -> accent on hover.
  // const titleClass = accentColor
  //   ? "text-[var(--card-accent)]"
  //   : "text-primary group-hover:text-accent";
  // Note: Title is now in overlay (white), so we don't need titleClass for the bottom part.

  return (
    <div className="relative group w-full h-[400px]" style={style}>
      <div className="absolute inset-0 slant-br translate-x-3 translate-y-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 border border-neutral-300 bg-neutral-200" />
      <Link
        to={`/${basePath}/${news.slug}`}
        className="relative z-10 block w-full h-full bg-white slant-br shadow-sm transition-all duration-300 overflow-hidden"
      >
        <div className="w-full h-full overflow-hidden relative group-hover:shadow-inner transition-all duration-500">
          <img
            src={news.heroImage}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Sliding Slant Overlay - Covers ~66% */}
          <div
            className="absolute inset-y-0 left-0 bg-primary/95 text-white p-6 md:p-8 flex flex-col justify-between transform -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-30"
            style={{
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
              width: "75%", // Visual coverage ~65-70% depending on aspect ratio
              paddingRight: "15%", // Compensate for the slant
            }}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`text-xs font-bold uppercase tracking-widest ${accentColor ? "text-white" : "text-accent"}`}
                >
                  {news.category || "Update"}
                </div>
                {/* Date hidden on smaller overlay to save space or kept minimal */}
                {news.date && (
                  <span className="text-white/60 text-xs font-light tracking-wider hidden sm:block">
                    {news.date}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-display font-bold text-white leading-tight mb-4 line-clamp-3">
                {news.title || news.name}
              </h3>

              <div className="w-8 h-1 bg-white/20 mb-4" />

              <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                {news.excerpt || news.summary}
              </p>
            </div>

            <div className="mt-auto flex items-center text-sm font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
              Read Full Article{" "}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1 text-accent"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
