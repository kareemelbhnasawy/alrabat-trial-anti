import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { NewsArticle } from '../../types';

interface NewsCardProps {
    news: NewsArticle | any; // Allow relaxed type for reuse
    basePath?: string; // Optional base path override
    accentColor?: string; // Optional specific accent color
}

export const NewsCard = ({ news, basePath = 'news', accentColor }: NewsCardProps) => {
    // If accentColor is provided, use it. Otherwise rely on CSS classes (which usually map to generic accent)
    // We'll bind it to a CSS variable for easy hover usage
    const style = accentColor ? { '--card-accent': accentColor } as React.CSSProperties : undefined;
    const itemsClass = accentColor ? 'text-[var(--card-accent)]' : 'text-accent';
    // If accentColor is present, title is always that color. Otherwise, primary -> accent on hover.
    const titleClass = accentColor ? 'text-[var(--card-accent)]' : 'text-primary group-hover:text-accent';

    return (
        <div className="relative group h-full" style={style}>
            <div className="absolute inset-0 slant-br translate-x-2.5 translate-y-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 border border-neutral-300 bg-neutral-200" />
            <Link to={`/${basePath}/${news.slug}`} className="relative z-10 block h-full bg-white slant-br shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 border border-neutral-100 overflow-hidden flex flex-col">
                <div className="h-56 overflow-hidden">
                    <img
                        src={news.heroImage}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-8 flex flex-col flex-1">
                    <div className={`flex items-center text-xs font-normal uppercase tracking-wider mb-3 ${itemsClass}`}>
                        <span>{news.category || 'Division'}</span>
                        {news.date && (
                            <>
                                <span className="mx-2 text-neutral-300">•</span>
                                <span className="text-neutral-500">{news.date}</span>
                            </>
                        )}
                    </div>
                    <h3 className={`text-xl font-display font-bold mb-3 ${titleClass} transition-colors`}>
                        {news.title || news.name} 
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-1">
                        {news.excerpt || news.summary}
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm">
                        Read Article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </div>
    );
};
