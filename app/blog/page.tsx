import type { Metadata } from "next"
import BlogClientPage from "./BlogClientPage"
import { getAllBlogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog | Insights on AI, Web Development & Digital Innovation",
  description:
    "Explore Cave Motions' blog for expert insights, trends, and best practices in AI automation, web development, software solutions, and digital innovation.",
  alternates: {
    canonical: "https://cavemotions.com/blog",
  },
  openGraph: {
    title: "Blog | Insights on AI, Web Development & Digital Innovation",
    description:
      "Explore Cave Motions' blog for expert insights, trends, and best practices in AI automation, web development, software solutions, and digital innovation.",
    url: "https://cavemotions.com/blog",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Blog - Digital Innovation Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function BlogPage() {
  // Pre-load blog posts on server side to ensure they're available
  const posts = getAllBlogPosts()
  console.log(`🔍 Server-side blog posts loaded: ${posts.length} posts`)
  
  return <BlogClientPage />
}
