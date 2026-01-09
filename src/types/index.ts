export interface Project {
  id: string;
  title: string;
  slug: string;
  divisionSlug: string;
  category: "Major Projects" | "Projects";
  location: string;
  year: string;
  summary: string;
  scope: string[];
  challenges: string[];
  solutions: string[];
  tags: string[];
  heroImage: string;
  gallery: string[];
  metrics: Record<string, string>;
}

export interface Division {
  id: string;
  name: string;
  slug: string;
  heroImage: string;
  heroVideo?: string;
  summary: string;
  accentColor?: string;
  introSection?: {
    title: string;
    description: string;
    services: {
      title: string;
      description: string;
    }[];
  };
  capabilities: string[];
  keyServices: string[];
  relatedProjectSlugs: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  heroImage: string;
  bodyBlocks: {
    type: "paragraph" | "quote" | "image";
    content: string;
    author?: string;
  }[];
  relatedSlugs: string[];
}
