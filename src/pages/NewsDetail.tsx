import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { useData } from '../context/DataContext';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { NewsCard } from '../components/cards/NewsCard';
import type { NewsArticle } from '../types';

export const NewsDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { news } = useData();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [readNext, setReadNext] = useState<NewsArticle[]>([]);

    useEffect(() => {
        if (slug) {
            const found = news.find(n => n.slug === slug);
            setArticle(found || null);
            if (found) {
                setReadNext(news.filter(n => n.id !== found.id).slice(0, 3));
            }
        }
    }, [slug, news]);

    if (!article) return <div className="pt-40 text-center">Article not found</div>;

    return (
        <>
            {/* Hero */}
            <div className="pt-32 pb-16 bg-neutral-50">
                <div className="container-custom max-w-4xl">
                    <Link to="/news" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-primary mb-8">
                        <ArrowLeft className="mr-2" size={16} /> Back to News
                    </Link>
                    <div className="flex items-center space-x-4 mb-6 text-sm">
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded font-bold uppercase tracking-wider">{article.category}</span>
                        <span className="text-neutral-500 flex items-center"><Calendar size={14} className="mr-1" /> {article.date}</span>
                        <span className="text-neutral-500 flex items-center"><Clock size={14} className="mr-1" /> {article.readingTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 leading-tight">{article.title}</h1>
                </div>
                <div className="container-custom">
                    <img src={article.heroImage} alt={article.title} className="w-full h-[50vh] object-cover rounded-xl shadow-lg" />
                </div>
            </div>

            {/* Content */}
            <Section className="py-16">
                <div className="container-custom max-w-3xl">
                    <div className="prose prose-lg prose-neutral ">
                        <p className="lead text-xl text-neutral-600 font-medium mb-8">{article.excerpt}</p>
                        {article.bodyBlocks.map((block, idx) => {
                            if (block.type === 'paragraph') return <p key={idx} className="mb-6">{block.content}</p>;
                            if (block.type === 'quote') return (
                                <blockquote key={idx} className="border-l-4 border-accent pl-6 py-2 my-8 bg-neutral-50 rounded-r-lg">
                                    <p className="text-xl italic font-display font-bold text-primary mb-2">"{block.content}"</p>
                                    {block.author && <cite className="text-sm uppercase tracking-widest text-neutral-500 not-italic">- {block.author}</cite>}
                                </blockquote>
                            );
                            if (block.type === 'image') return <img key={idx} src={block.content} alt="" className="rounded-lg w-full my-8" />;
                            return null;
                        })}
                    </div>
                </div>
            </Section>

            {/* Read Next */}
            {readNext.length > 0 && (
                <Section className="bg-neutral-50 border-t border-neutral-200">
                    <div className="container-custom">
                        <h2 className="text-3xl font-display font-bold text-primary mb-8">Read Next</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {readNext.map(item => <NewsCard key={item.id} news={item} />)}
                        </div>
                    </div>
                </Section>
            )}
        </>
    );
};
