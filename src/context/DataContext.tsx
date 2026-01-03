import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import initialProjects from "../data/projects.json";
import initialNews from "../data/news.json";
import initialDivisions from "../data/divisions.json";
import type { Project, NewsArticle, Division } from "../types";

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
  // Load initial data from localStorage or fallback to JSON
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem("alrabat_projects");
    return stored
      ? JSON.parse(stored)
      : (initialProjects as unknown as Project[]);
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const stored = localStorage.getItem("alrabat_news");
    return stored
      ? JSON.parse(stored)
      : (initialProjects as unknown as NewsArticle[]);
  });

  const [divisions] = useState<Division[]>(
    initialDivisions as unknown as Division[]
  );

  // Persist changes
  React.useEffect(() => {
    localStorage.setItem("alrabat_projects", JSON.stringify(projects));
  }, [projects]);

  React.useEffect(() => {
    localStorage.setItem("alrabat_news", JSON.stringify(news));
  }, [news]);

  const addProject = (project: Project) =>
    setProjects((prev) => [...prev, project]);
  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };
  const deleteProject = (id: string) =>
    setProjects((prev) => prev.filter((p) => p.id !== id));

  const addNews = (article: NewsArticle) =>
    setNews((prev) => [...prev, article]);
  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };
  const deleteNews = (id: string) =>
    setNews((prev) => prev.filter((n) => n.id !== id));

  return (
    <DataContext.Provider
      value={{
        projects,
        news,
        divisions,
        addProject,
        updateProject,
        deleteProject,
        addNews,
        updateNews,
        deleteNews,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
