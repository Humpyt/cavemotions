"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog"
import AIPoweredArticle from "@/components/blog/ai-powered-article"

interface BlogPostClientProps {
  slug: string
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the blog post by slug
    const foundPost = getBlogPostBySlug(slug)
    if (foundPost) {
      setPost(foundPost)
      
      // Get related posts (same category, excluding current post)
      const allPosts = getAllBlogPosts()
      const related = allPosts
        .filter(p => p.category === foundPost.category && p.slug !== foundPost.slug)
        .slice(0, 3)
      setRelatedPosts(related)
    }
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-6"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link href="/blog" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            image: [post.coverImage],
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: post.author || "Todo Humphrey",
              url: "https://cavemotions.com/about",
              sameAs: [
                "https://twitter.com/todohumphreydev",
                "https://linkedin.com/in/todohumphreydev"
              ]
            },
            publisher: {
              "@type": "Organization",
              name: "Cave Motions",
              logo: {
                "@type": "ImageObject",
                url: "https://cavemotions.com/images/logo.png"
              }
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://cavemotions.com/blog/${post.slug}`
            },
            articleSection: post.category,
            keywords: post.keywords?.join(", "),
            wordCount: post.content?.replace(/<[^>]*>/g, '').split(' ').length || 1500,
            timeRequired: `PT${post.readTime}M`,
            inLanguage: "en-US",
            isAccessibleForFree: true,
            about: {
              "@type": "Thing",
              name: post.category
            }
          })
        }}
      />
      
      {/* AI-Powered Article Component */}
      <AIPoweredArticle post={post} relatedPosts={relatedPosts} />
    </>
  )
}
