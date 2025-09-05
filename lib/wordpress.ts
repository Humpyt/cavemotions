// WordPress API integration for headless CMS with AI-powered styling
import { BlogPost } from '@/types/blog-post'

// WordPress-compatible BlogPost interface for AI integration
export interface WordPressBlogPost {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  publishedAt: string
  author?: string
  category: string
  tags: string[]
  readTime: number
  featured?: boolean
  metaDescription?: string
  keywords?: string[]
}

// WordPress API URL with Netlify-specific handling
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 
  'https://blog.cavemotions.com/wp-json/wp/v2'

// Log the API URL being used (for debugging on Netlify)
if (typeof window === 'undefined') {
  console.log('WordPress API URL:', WORDPRESS_API_URL)
}

// Enhanced error handling and logging
function logError(context: string, error: any) {
  console.error(`WordPress API Error [${context}]:`, error)
  // In production, you might want to send this to a logging service
}

// Check if WordPress API is available with enhanced Netlify support
export async function checkWordPressConnection(): Promise<boolean> {
  try {
    // Use a simple GET request instead of HEAD for better compatibility
    const response = await fetch(`${WORDPRESS_API_URL}/posts?per_page=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'CaveMotions-Website/1.0'
      },
      next: { revalidate: 60 },
      // Add timeout for Netlify builds
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      console.warn(`WordPress API returned ${response.status}: ${response.statusText}`)
      return false
    }
    
    // Verify the response is valid JSON
    const data = await response.json()
    return Array.isArray(data)
  } catch (error) {
    logError('Connection Check', error)
    return false
  }
}

export interface WordPressPost {
  id: number
  date: string
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  yoast_head?: string
  _embedded?: {
    author: Array<{
      id: number
      name: string
      description: string
      avatar_urls: {
        [key: string]: string
      }
    }>
    'wp:featuredmedia': Array<{
      id: number
      source_url: string
      alt_text: string
    }>
    'wp:term': Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

export interface WordPressCategory {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

export interface WordPressTag {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

// Fetch all posts with enhanced error handling
export async function getPosts(page: number = 1, perPage: number = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?page=${page}&per_page=${perPage}&_embed=true`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
  } catch (error) {
    logError('getPosts', error)
    return []
  }
}

// Fetch a single post by slug with enhanced error handling
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=true`,
      {
        next: { revalidate: 300 },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const posts = await response.json()
    return Array.isArray(posts) && posts.length > 0 ? posts[0] : null
  } catch (error) {
    logError('getPostBySlug', error)
    return null
  }
}

// Fetch featured posts with enhanced error handling
export async function getFeaturedPosts(): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?sticky=true&_embed=true`,
      {
        next: { revalidate: 300 },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured posts')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// Fetch posts by category
export async function getPostsByCategory(categorySlug: string): Promise<WordPressPost[]> {
  try {
    // First get the category ID
    const categoryResponse = await fetch(
      `${WORDPRESS_API_URL}/categories?slug=${categorySlug}`
    )
    
    if (!categoryResponse.ok) {
      throw new Error('Failed to fetch category')
    }
    
    const categories = await categoryResponse.json()
    if (categories.length === 0) {
      return []
    }
    
    const categoryId = categories[0].id
    
    // Then get posts in that category
    const postsResponse = await fetch(
      `${WORDPRESS_API_URL}/posts?categories=${categoryId}&_embed=true`,
      {
        next: { revalidate: 300 },
      }
    )
    
    if (!postsResponse.ok) {
      throw new Error('Failed to fetch posts by category')
    }
    
    return await postsResponse.json()
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

// Fetch all categories
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?per_page=100`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch all tags
export async function getTags(): Promise<WordPressTag[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/tags?per_page=100`,
      {
        next: { revalidate: 3600 },
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch tags')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

// Search posts
export async function searchPosts(query: string): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?search=${encodeURIComponent(query)}&_embed=true`,
      {
        next: { revalidate: 300 },
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to search posts')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

// Helper function to extract plain text from WordPress content
export function extractPlainText(htmlContent: string): string {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return ''
  }
  return htmlContent.replace(/<[^>]*>/g, '').trim()
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  if (!content || typeof content !== 'string') {
    return 1 // Default to 1 minute for empty content
  }
  const plainText = extractPlainText(content)
  const wordsPerMinute = 200
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute)) // Minimum 1 minute
}

// Helper function to format WordPress date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// ============================================================================
// AI INTEGRATION - WordPress to BlogPost Adapter
// ============================================================================

/**
 * Convert WordPress post to BlogPost format for AI-powered styling
 * This adapter enables Moonshot AI integration with WordPress content
 */
export function convertWordPressPostToBlogPost(wpPost: WordPressPost): WordPressBlogPost {
  const author = wpPost._embedded?.author?.[0]
  const featuredImage = wpPost._embedded?.['wp:featuredmedia']?.[0]
  const categories = wpPost._embedded?.['wp:term']?.[0] || []
  const tags = wpPost._embedded?.['wp:term']?.[1] || []
  
  // Safely handle potentially undefined content
  const contentRendered = wpPost.content?.rendered || ''
  const excerptRendered = wpPost.excerpt?.rendered || ''
  const titleRendered = wpPost.title?.rendered || 'Untitled'
  
  // Extract plain text for AI analysis with safety checks
  const plainContent = extractPlainText(contentRendered)
  const plainExcerpt = extractPlainText(excerptRendered)
  
  // Determine category for AI theme selection
  const primaryCategory = categories[0]?.name || 'General'
  
  // Convert WordPress post to BlogPost interface
  const blogPost: WordPressBlogPost = {
    id: wpPost.id?.toString() || wpPost.slug || 'unknown',
    slug: wpPost.slug || 'untitled',
    title: titleRendered,
    excerpt: plainExcerpt || 'No excerpt available',
    content: contentRendered, // Keep HTML for rendering
    coverImage: featuredImage?.source_url || '/images/blog-default.svg',
    publishedAt: wpPost.date || new Date().toISOString(),
    author: author?.name || 'Cave Motions',
    category: primaryCategory,
    tags: tags.map(tag => tag.name || '').filter(Boolean),
    readTime: calculateReadingTime(contentRendered),
    featured: false, // WordPress uses sticky posts for featured
    metaDescription: (plainExcerpt || titleRendered).substring(0, 160),
    keywords: tags.map(tag => tag.name || '').filter(Boolean)
  }
  
  console.log('🔄 WordPress → BlogPost conversion:', {
    title: blogPost.title,
    category: blogPost.category,
    tags: blogPost.tags,
    readTime: blogPost.readTime,
    hasContent: !!contentRendered,
    hasExcerpt: !!excerptRendered
  })
  
  return blogPost
}

/**
 * Convert multiple WordPress posts to BlogPost format
 */
export function convertWordPressPostsToBlogPosts(wpPosts: WordPressPost[]): WordPressBlogPost[] {
  return wpPosts.map(convertWordPressPostToBlogPost)
}

/**
 * Get WordPress post in BlogPost format for AI analysis
 */
export async function getBlogPostFromWordPress(slug: string): Promise<WordPressBlogPost | null> {
  const wpPost = await getPostBySlug(slug)
  if (!wpPost) return null
  
  return convertWordPressPostToBlogPost(wpPost)
}

/**
 * Get multiple WordPress posts in BlogPost format
 */
export async function getBlogPostsFromWordPress(page: number = 1, perPage: number = 10): Promise<WordPressBlogPost[]> {
  const wpPosts = await getPosts(page, perPage)
  return convertWordPressPostsToBlogPosts(wpPosts)
}

/**
 * Get related WordPress posts based on category, converted to BlogPost format
 */
export async function getRelatedWordPressPosts(currentPost: WordPressPost, limit: number = 3): Promise<WordPressBlogPost[]> {
  const categories = currentPost._embedded?.['wp:term']?.[0] || []
  if (categories.length === 0) return []
  
  const primaryCategory = categories[0]
  const categoryPosts = await getPostsByCategory(primaryCategory.slug)
  
  // Filter out current post and limit results
  const relatedPosts = categoryPosts
    .filter(post => post.id !== currentPost.id)
    .slice(0, limit)
  
  return convertWordPressPostsToBlogPosts(relatedPosts)
}

/**
 * Extract AI-friendly content summary for theme analysis
 */
export function extractContentSummaryForAI(wpPost: WordPressPost): {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  readTime: number
} {
  const categories = wpPost._embedded?.['wp:term']?.[0] || []
  const tags = wpPost._embedded?.['wp:term']?.[1] || []
  
  // Safely handle potentially undefined content
  const contentRendered = wpPost.content?.rendered || ''
  const excerptRendered = wpPost.excerpt?.rendered || ''
  const titleRendered = wpPost.title?.rendered || 'Untitled'
  
  return {
    title: titleRendered,
    excerpt: extractPlainText(excerptRendered),
    content: extractPlainText(contentRendered),
    category: categories[0]?.name || 'General',
    tags: tags.map(tag => tag.name || '').filter(Boolean),
    readTime: calculateReadingTime(contentRendered)
  }
}
