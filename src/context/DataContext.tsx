import React, { createContext, useContext, useState, type ReactNode } from 'react';
import initialProjects from '../data/projects.json';
import initialNews from '../data/news.json';
import initialDivisions from '../data/divisions.json';
import type { Project, NewsArticle, Division } from '../types';

interface DataContextType {
    projects: Project[];
    news: NewsArticle[];
    divisions: Division[];
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    addNews: (article: NewsArticle) => void;
    updateNews: (id: string, article: Partial<NewsArticle>) => void;
    deleteNews: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    // Cast initial data
    const [projects, setProjects] = useState<Project[]>(initialProjects as unknown as Project[]);
    const [news, setNews] = useState<NewsArticle[]>(initialNews as unknown as NewsArticle[]);
    const [divisions] = useState<Division[]>(initialDivisions as unknown as Division[]); // Divisions static for now

    const addProject = (project: Project) => setProjects([...projects, project]);
    const updateProject = (id: string, updated: Partial<Project>) => {
        setProjects(projects.map(p => p.id === id ? { ...p, ...updated } : p));
    };
    const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));

    const addNews = (article: NewsArticle) => setNews([...news, article]);
    const updateNews = (id: string, updated: Partial<NewsArticle>) => {
        setNews(news.map(n => n.id === id ? { ...n, ...updated } : n));
    };
    const deleteNews = (id: string) => setNews(news.filter(n => n.id !== id));

    return (
        <DataContext.Provider value={{
            projects, news, divisions,
            addProject, updateProject, deleteProject,
            addNews, updateNews, deleteNews
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
