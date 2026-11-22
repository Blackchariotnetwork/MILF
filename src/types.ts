export type CategoryName =
  | 'All'
  | 'Fashion Editorial'
  | 'Studio Sessions'
  | 'Fitness & Movement'
  | 'Resort & Travel'
  | 'Backstage'
  | 'Beauty & Glam';

export type VideoSortOption = 'latest' | 'views' | 'rating' | 'longest';

export type ModelSortOption = 'top-rated' | 'most-videos' | 'alphabetical' | 'newest';

export type VoteDirection = 'up' | 'down' | null;

export type BrandAccent = 'pink' | 'blue' | 'lime' | 'yellow';

export interface ModelProfile {
  id: string;
  slug: string;
  name: string;
  location: string;
  debutYear: number;
  specialty: string;
  tagline: string;
  biography: string[];
  portraitUrl: string;
  accent: BrandAccent;
  baseUpvotes: number;
  baseDownvotes: number;
  stats: {
    height: string;
    languages: string;
    agency: string;
    signatureStyle: string;
  };
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  durationSeconds: number;
  views: number;
  publishedAt: string; // ISO date string
  relativeDate: string;
  category: Exclude<CategoryName, 'All'>;
  tags: string[];
  modelIds: string[];
  resolution: '4K' | '1080p';
  accent: BrandAccent;
  likes: number;
}

export type AppView = 'videos' | 'models' | 'model-detail';
