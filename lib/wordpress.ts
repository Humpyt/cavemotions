// WordPress API integration for headless CMS
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2'

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

// Fetch all posts
export async function getPosts(page: number = 1, perPage: number = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?page=${page}&per_page=${perPage}&_embed=true`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=true`,
      {
        next: { revalidate: 300 },
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }
    
    const posts = await response.json()
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Fetch featured posts
export async function getFeaturedPosts(): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?sticky=true&_embed=true`,
      {
        next: { revalidate: 300 },
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
  return htmlContent.replace(/<[^>]*>/g, '').trim()
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const plainText = extractPlainText(content)
  const wordsPerMinute = 200
  const wordCount = plainText.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
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
