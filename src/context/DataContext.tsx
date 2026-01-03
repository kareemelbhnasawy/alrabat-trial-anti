import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import initialProjects from "../data/projects.json";
import initialNews from "../data/news.json";
import initialDivisions from "../data/divisions.json";
import type { Project, NewsArticle, Division } from "../types";
import { supabase } from "../lib/supabase";

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
  // Initialize with empty arrays to prevent mapping errors before fetch
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [divisions] = useState<Division[]>(
    initialDivisions as unknown as Division[]
  );

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Projects
      const { data: projData, error: projError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projError) console.error("Error fetching projects:", projError);
      else if (projData) setProjects(projData as unknown as Project[]);

      // Fetch News
      const { data: newsData, error: newsError } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (newsError) console.error("Error fetching news:", newsError);
      else if (newsData) setNews(newsData as unknown as NewsArticle[]);
    };

    fetchData();
  }, []);

  // CRUD Operations - Optimistic updates not strictly needed for this scale,
  // but simplified state update after confirming DB success is safer.

  const addProject = async (project: Project) => {
    const { error } = await supabase.from("projects").insert(project);
    if (error) {
      console.error("Error adding project:", error);
      alert("Failed to save project");
    } else {
      setProjects((prev) => [project, ...prev]);
    }
  };

  const updateProject = async (id: string, updated: Partial<Project>) => {
    const { error } = await supabase
      .from("projects")
      .update(updated)
      .eq("id", id);
    if (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project");
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      );
    }
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } else {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const addNews = async (article: NewsArticle) => {
    const { error } = await supabase.from("news").insert(article);
    if (error) {
      console.error("Error adding news:", error);
      alert("Failed to save article");
    } else {
      setNews((prev) => [article, ...prev]);
    }
  };

  const updateNews = async (id: string, updated: Partial<NewsArticle>) => {
    const { error } = await supabase.from("news").update(updated).eq("id", id);
    if (error) {
      console.error("Error updating news:", error);
      alert("Failed to update article");
    } else {
      setNews((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
      );
    }
  };

  const deleteNews = async (id: string) => {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete article");
    } else {
      setNews((prev) => prev.filter((n) => n.id !== id));
    }
  };

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
