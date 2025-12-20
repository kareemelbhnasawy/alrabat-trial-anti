import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { NewsArticle } from '../../types';

interface NewsCardProps {
    news: NewsArticle;
}

export const NewsCard = ({ news }: NewsCardProps) => {
    return (
        <div className="relative group h-full">
            <div className="absolute inset-0 bg-accent slant-br translate-x-1.5 translate-y-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0" />
            <Link to={`/news/${news.slug}`} className="relative z-10 block h-full bg-white slant-br shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 border border-neutral-100 overflow-hidden flex flex-col">
                <div className="h-56 overflow-hidden">
                    <img
                        src={news.heroImage}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center text-xs font-normal text-accent uppercase tracking-wider mb-3">
                        <span>{news.category}</span>
                        <span className="mx-2 text-neutral-300">•</span>
                        <span className="text-neutral-500">{news.date}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                        {news.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-1">
                        {news.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm">
                        Read Article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </div>
    );
};
