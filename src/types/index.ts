export interface GalleryItem {
  url: string;
  divisionSlug?: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  divisionSlugs: string[];
  category: "Major Projects" | "Projects";
  location: string;
  year: string;
  summary: string;
  scope: string[];
  challenges: string[];
  solutions: string[];
  tags: string[];
  heroImage: string;
  gallery: GalleryItem[];
  metrics: Record<string, string>;
  coordinates?: {
    lat: number;
    lng: number;
  };
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
  gallery: string[];
  bodyBlocks: {
    type: "paragraph" | "quote" | "image";
    content: string;
    author?: string;
  }[];
  relatedSlugs: string[];
}

export interface ClientCategory {
  id: string;
  name: string;
  description: string;
  typical_needs?: string[];
  clients?: Client[];
}

export interface Client {
  id: string;
  name: string;
  image?: string;
  details?: string;
  is_highlighted: boolean;
  category_id: string;
}

export interface QualificationStat {
  id: string;
  qualification_id: string;
  description: string;
  count: number;
  display_order: number;
}

export interface Qualification {
  id: string;
  authority: string;
  logo_url: string | null;
  fallback_icon_name: string;
  stats?: QualificationStat[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string | null;
  bio: string | null;
  image_url: string | null;
  category: "executive" | "division_head" | "other";
  display_order: number;
}
