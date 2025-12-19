import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { NewsCard } from '../cards/NewsCard';
import { useData } from '../../context/DataContext';

export const LatestNews = () => {
    const { news } = useData();
    const latest = news.slice(0, 3);

    return (
        <Section className="bg-neutral-50" slantedTop>
            <div className="container-custom mb-12 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block text-neutral-500">Updates</span>
                    <h2 className="text-4xl font-display font-bold text-primary">Latest News</h2>
                </div>
                <Button variant="outline" onClick={() => window.location.href = '/news'} className="mt-4 md:mt-0">
                    View All News
                </Button>
            </div>

            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latest.map((item) => (
                    <NewsCard key={item.id} news={item} />
                ))}
            </div>
        </Section>
    );
};
