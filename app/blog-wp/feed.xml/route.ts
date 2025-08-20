import { getPosts } from '@/lib/wordpress'
import { extractPlainText } from '@/lib/wordpress'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cavemotions.com'
  
  try {
    const posts = await getPosts(1, 50) // Get latest 50 posts for RSS

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cave Motions Blog</title>
    <description>Expert insights on web development, AI automation, mobile apps, and digital marketing strategies for businesses in Uganda and beyond.</description>
    <link>${baseUrl}/blog-wp</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog-wp/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>info@cavemotions.com (Cave Motions)</managingEditor>
    <webMaster>info@cavemotions.com (Cave Motions)</webMaster>
    <category>Technology</category>
    <category>Web Development</category>
    <category>AI Automation</category>
    <category>Mobile Development</category>
    <category>Digital Marketing</category>
    <category>Business Growth</category>
    
    ${posts.map(post => {
      const plainTextExcerpt = extractPlainText(post.excerpt.rendered)
      const author = post._embedded?.author?.[0]?.name || 'Cave Motions'
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
      
      return `
    <item>
      <title><![CDATA[${post.title.rendered}]]></title>
      <description><![CDATA[${plainTextExcerpt}]]></description>
      <link>${baseUrl}/blog-wp/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog-wp/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>info@cavemotions.com (${author})</author>
      ${featuredImage ? `<enclosure url="${featuredImage}" type="image/jpeg"/>` : ''}
      ${post._embedded?.['wp:term']?.[0]?.map(category => 
        `<category><![CDATA[${category.name}]]></category>`
      ).join('') || ''}
    </item>`
    }).join('')}
  </channel>
</rss>`

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
