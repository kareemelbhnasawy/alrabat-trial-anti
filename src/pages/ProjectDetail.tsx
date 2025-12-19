import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/cards/ProjectCard';
import { ArrowLeft, Check, Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import type { Project } from '../types';

export const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    // Use context data instead of direct json import
    const { projects } = useData();

    const [project, setProject] = useState<Project | null>(null);
    const [related, setRelated] = useState<Project[]>([]);

    useEffect(() => {
        if (slug) {
            const p = projects.find(item => item.slug === slug);
            setProject(p || null);
            if (p) {
                setRelated(projects.filter(other => other.divisionSlug === p.divisionSlug && other.id !== p.id).slice(0, 3));
            }
        }
    }, [slug, projects]);

    if (!project) return <div className="pt-40 text-center">Project not found</div>;

    return (
        <>
            {/* Hero */}
            <div className="relative h-[70vh] w-full">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10" />
                    <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="container-custom relative z-20 h-full flex flex-col justify-end pb-20 text-white">
                    <Link to="/projects" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white mb-6">
                        <ArrowLeft className="mr-2" size={16} /> Back to Projects
                    </Link>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">{project.category}</span>
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded backdrop-blur-md">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">{project.title}</h1>
                    <div className="flex flex-col sm:flex-row gap-8 text-neutral-300">
                        <div className="flex items-center"><MapPin size={20} className="mr-2 text-accent" /> {project.location}</div>
                        <div className="flex items-center"><Calendar size={20} className="mr-2 text-accent" /> {project.year}</div>
                    </div>
                </div>
            </div>

            {/* Overview & Scope */}
            <Section>
                <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-display font-bold text-primary mb-6">Project Overview</h2>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-12">
                            {project.summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-4">Challenges</h3>
                                <ul className="space-y-3">
                                    {project.challenges.length > 0 ? project.challenges.map((c, i) => (
                                        <li key={i} className="flex items-start text-neutral-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 mr-3 flex-shrink-0" />
                                            {c}
                                        </li>
                                    )) : <li className="text-neutral-400">None listed.</li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-4">Solutions</h3>
                                <ul className="space-y-3">
                                    {project.solutions.length > 0 ? project.solutions.map((s, i) => (
                                        <li key={i} className="flex items-start text-neutral-600">
                                            <Check className="text-primary mt-1 mr-3 flex-shrink-0" size={16} />
                                            {s}
                                        </li>
                                    )) : <li className="text-neutral-400">Standard execution.</li>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-50 p-8 rounded-lg h-fit border border-neutral-100">
                        <h3 className="text-xl font-bold text-primary mb-6 uppercase tracking-wider">Scope of Work</h3>
                        <ul className="space-y-4">
                            {project.scope.map((s, i) => (
                                <li key={i} className="pb-4 border-b border-neutral-200 last:border-0 last:pb-0">
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Metrics */}
            {Object.keys(project.metrics).length > 0 && (
                <div className="bg-primary text-white py-16">
                    <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.entries(project.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="text-4xl lg:text-5xl font-bold mb-2 text-accent">{value}</div>
                                <div className="text-sm uppercase tracking-widest opacity-70">{key}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Gallery */}
            {project.gallery.length > 0 && (
                <Section>
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-primary mb-8">Project Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.gallery.map((img, i) => (
                                <img key={i} src={img} alt={`Gallery ${i}`} className="rounded-lg shadow-sm hover:shadow-lg transition-shadow w-full h-64 object-cover" />
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* Related */}
            {related.length > 0 && (
                <Section className="bg-neutral-50">
                    <div className="container-custom">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-3xl font-bold text-primary">Similar Projects</h2>
                            <Button variant="outline" onClick={() => window.location.href = '/projects'}>View All</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related.map(p => <ProjectCard key={p.id} project={p} />)}
                        </div>
                    </div>
                </Section>
            )}
        </>
    );
};
