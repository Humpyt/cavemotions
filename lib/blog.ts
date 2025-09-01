import { blogPosts } from '@/data/blog-posts'

export function getAllBlogPosts() {
  return blogPosts
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}

export function getFeaturedBlogPosts(limit = 3) {
  return blogPosts.filter(post => post.featured).slice(0, limit)
}

export function getBlogPostsByCategory(category: string) {
  if (category === 'All') return blogPosts
  return blogPosts.filter(post => post.category === category)
}

export function getBlogCategories() {
  const categories = new Set(blogPosts.map(post => post.category))
  return ['All', ...Array.from(categories)]
}

// Debug function
export function debugBlogPosts() {
  console.log('Blog posts debug:', {
    total: blogPosts.length,
    categories: getBlogCategories(),
    featured: getFeaturedBlogPosts().length,
    firstPost: blogPosts[0]?.title || 'No posts found'
  })
  return blogPosts.length > 0
}