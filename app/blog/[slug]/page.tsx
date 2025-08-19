import type { Metadata } from "next"
import { blogPosts } from "@/data/blog-posts"
import BlogPostClient from "./BlogPostClient"

// Server component for metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found | Cave Motions",
      description: "The blog post you are looking for could not be found.",
    }
  }

  return {
    title: `${post.title} | Cave Motions Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords?.join(", "),
    authors: [{ name: post.author || "Todo Humphrey", url: "https://cavemotions.com/about" }],
    creator: post.author || "Todo Humphrey",
    publisher: "Cave Motions",
    category: post.category,
    classification: post.category,
    alternates: {
      canonical: `https://cavemotions.com/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      url: `https://cavemotions.com/blog/${post.slug}`,
      siteName: "Cave Motions",
      locale: "en_US",
      images: [
        {
          url: post.coverImage || "https://cavemotions.com/images/blog-default.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || "Todo Humphrey"],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@cavemotions",
      creator: "@todohumphreydev",
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: [
        {
          url: post.coverImage || "https://cavemotions.com/images/blog-default.jpg",
          alt: post.title,
        },
      ],
    },
    other: {
      "article:author": post.author || "Todo Humphrey",
      "article:published_time": post.date,
      "article:modified_time": post.date,
      "article:section": post.category,
      "article:tag": post.tags?.join(","),
    },
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />
}
