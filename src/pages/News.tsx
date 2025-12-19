import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { NewsCard } from '../components/cards/NewsCard';
import { Search } from 'lucide-react';
import { useData } from '../context/DataContext';

export const News = () => {
    const { news } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Derive categories from data
    const categories = ['All', ...Array.from(new Set(news.map(n => n.category)))];

    const filteredNews = news.filter(item => {
        const matchCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <>
            {/* Hero */}
            <div className="bg-neutral-dark text-white pt-32 pb-16">
                <div className="container-custom">
                    <h1 className="text-5xl font-display font-bold mb-6">News & Insights</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl">
                        Latest updates, awards, and technical articles from Alrabat Specialized Engineering.
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="sticky top-[88px] z-40 bg-white border-b border-neutral-100 shadow-sm py-4">
                <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-accent text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="pl-10 pr-4 py-2 border border-neutral-200 rounded-full w-full md:w-64 focus:outline-none focus:border-accent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <Section>
                <div className="container-custom">
                    {filteredNews.length === 0 ? (
                        <div className="text-center py-20 text-neutral-500">No articles found.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                            {filteredNews.map(item => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
};
