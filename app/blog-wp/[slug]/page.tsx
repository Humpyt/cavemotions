import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts, getRelatedWordPressPosts } from '@/lib/wordpress'
import { extractPlainText } from '@/lib/wordpress'
import AIPoweredWordPressArticle from '@/components/blog/ai-powered-wordpress-article'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Cave Motions',
      description: 'The requested blog post could not be found.',
    }
  }

  const plainTextExcerpt = extractPlainText(post.excerpt.rendered)
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return {
    title: `${post.title.rendered} | Cave Motions Blog`,
    description: plainTextExcerpt,
    keywords: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
    authors: [{ name: post._embedded?.author?.[0]?.name || 'Cave Motions' }],
    openGraph: {
      title: post.title.rendered,
      description: plainTextExcerpt,
      url: `https://cavemotions.com/blog-wp/${post.slug}`,
      siteName: 'Cave Motions',
      images: featuredImage ? [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post._embedded?.author?.[0]?.name || 'Cave Motions'],
      section: post._embedded?.['wp:term']?.[0]?.[0]?.name,
      tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description: plainTextExcerpt,
      images: featuredImage ? [featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related WordPress posts (keeping them as WordPressPost[])
  const relatedWordPressPosts = await getPosts(1, 3)
  // Filter out current post from related posts
  const filteredRelatedPosts = relatedWordPressPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <>
      {/* AI-Powered WordPress Article Component */}
      <AIPoweredWordPressArticle post={post} relatedPosts={filteredRelatedPosts} />
    </>
  )
}
