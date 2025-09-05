// Blog post type definitions for AI-powered blog

// Author information
export interface Author {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

// Tag/category type
export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

// Related article reference
export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt: string;
}

// AI Layout recommendation types
export interface AILayoutRecommendation {
  heroStyle: 'minimal' | 'gradient' | 'immersive';
  contentLayout: 'single-column' | 'sidebar' | 'wide';
  colorTheme: string;
  typographyStyle: 'sans-serif' | 'serif' | 'mono';
  callouts: AICallout[];
  tableOfContents: boolean;
  socialSharing: boolean;
  progressBar: boolean;
  relatedArticles: boolean;
  authorBio: boolean;
  newsletterSignup: boolean;
  reasoning: string;
}

// AI Callout type for specific content highlights
export interface AICallout {
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  content: string;
  position: 'after-paragraph' | 'sidebar' | 'floating';
  paragraphIndex?: number;
}

// SEO metadata
export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

// Main blog post type
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string;
  author?: Author;
  tags?: string[];
  readingTime?: number;
  seo?: SEOMetadata;
  aiLayoutRecommendation?: AILayoutRecommendation;
  relatedArticles?: RelatedArticle[];
}

// Blog post with content sections
export interface StructuredBlogPost extends BlogPost {
  contentSections: ContentSection[];
}

// Content section types
export type ContentSection = 
  | TextSection
  | ImageSection
  | CodeSection
  | QuoteSection
  | ListSection
  | EmbedSection;

// Text content (paragraphs, headings)
export interface TextSection {
  type: 'text';
  content: string;
  tag: 'h2' | 'h3' | 'h4' | 'p';
}

// Image section
export interface ImageSection {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// Code block
export interface CodeSection {
  type: 'code';
  language: string;
  code: string;
  filename?: string;
  showLineNumbers?: boolean;
}

// Blockquote
export interface QuoteSection {
  type: 'quote';
  quote: string;
  author?: string;
  source?: string;
}

// Unordered or ordered list
export interface ListSection {
  type: 'list';
  items: string[];
  listType: 'ordered' | 'unordered';
}

// Embedded content (tweets, videos, etc.)
export interface EmbedSection {
  type: 'embed';
  embedType: 'youtube' | 'twitter' | 'vimeo' | 'codepen' | 'custom';
  embedCode: string;
  caption?: string;
}

// AI Layout recommendation response
export interface AILayoutResponse {
  recommendation: AILayoutRecommendation;
  timestamp: string;
  processingTimeMs: number;
  confidence: number;
}
