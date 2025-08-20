import { getPosts, getCategories } from '@/lib/wordpress'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cavemotions.com'
  
  try {
    // Fetch all posts and categories
    const [posts, categories] = await Promise.all([
      getPosts(1, 1000), // Get all posts
      getCategories()
    ])

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog main page -->
  <url>
    <loc>${baseUrl}/blog-wp</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog posts -->
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog-wp/${post.slug}</loc>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- Blog categories -->
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/blog-wp/category/${category.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  
  <!-- Search page -->
  <url>
    <loc>${baseUrl}/blog-wp/search</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}
