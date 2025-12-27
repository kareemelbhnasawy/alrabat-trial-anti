import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '../../types';
import { useData } from '../../context/DataContext';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const { divisions } = useData();
    const division = divisions.find(d => d.slug === project.divisionSlug);
    const accentColor = division?.accentColor || '#F05B22'; // Default accent if not found

    return (
        <div className="relative group h-full">
            <div
                className="absolute inset-0 slant-br translate-x-2.5 translate-y-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 border border-neutral-300 bg-neutral-200"
            />
            <Link to={`/projects/${project.slug}`} className="relative z-10 block h-full bg-white slant-br shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 overflow-hidden flex flex-col">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Division Chip */}
                    <div className="absolute top-4 left-4 z-20">
                        <span
                            className="text-white text-xs font-normal uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-sm"
                            style={{ backgroundColor: accentColor }}
                        >
                            {division?.name || project.category}
                        </span>
                    </div>

                    <div className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <ArrowUpRight size={18} className="text-primary" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-primary mb-2 line-clamp-2 group-hover:text-opacity-80 transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex items-center text-neutral-500 text-sm">
                            <MapPin size={14} className="mr-1" />
                            {project.location} · {project.year}
                        </div>
                    </div>

                    <p className="text-neutral-600 text-sm line-clamp-2 mb-6 flex-1">
                        {project.summary}
                    </p>


                </div>
            </Link>
        </div>
    );
};
