"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { blogPosts } from "@/data/blog-posts"
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Clock,
  Calendar,
  User,
  Search,
  ChevronRight,
  BookmarkPlus,
  Share2,
  ThumbsUp,
  Eye,
  MessageCircle,
  Tag,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowUp,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BlogPostClientProps {
  slug: string
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(42)
  const [viewCount, setViewCount] = useState(1247)
  const [commentCount, setCommentCount] = useState(18)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const articleRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const { toast } = useToast()

  // Transform scroll progress to header opacity
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  useEffect(() => {
    // Find the blog post by slug
    const foundPost = blogPosts.find((post) => post.slug === slug)
    if (foundPost) {
      setPost(foundPost)
    }
    setLoading(false)

    // Set up scroll listener for reading progress and scroll-to-top button
    const handleScroll = () => {
      if (!articleRef.current) return

      const totalHeight = articleRef.current.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const progress = Math.min((scrollPosition / totalHeight) * 100, 100)
      setReadingProgress(progress)

      // Show scroll to top button after scrolling 300px
      setShowScrollTop(scrollPosition > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [slug])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "The article link has been copied to your clipboard",
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Article removed from your bookmarks" : "Article saved to your bookmarks",
    })
  }

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1)
    } else {
      setLikeCount(likeCount - 1)
    }
    setIsLiked(!isLiked)
  }

  const handleShare = (platform: string) => {
    let shareUrl = ""
    const postUrl = encodeURIComponent(window.location.href)
    const postTitle = encodeURIComponent(post?.title || "")

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-10"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded mb-10"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold">Blog post not found</h1>
        <p className="mt-4">The blog post you are looking for does not exist.</p>
        <Button asChild className="mt-6">
          <Link href="/blog">Back to Blog</Link>
        </Button>
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
                url: "https://cavemotions.com/images/cavemo-logo.png"
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

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 z-50"
        style={{ width: `${readingProgress}%` }}
      ></div>

      {/* Hero section */}
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24"
      >
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full"></div>
          <div className="absolute top-20 right-10 w-20 h-20 bg-indigo-500 opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-30 h-30 bg-purple-400 opacity-20 rounded-full"></div>
          <div className="absolute -bottom-10 right-1/3 w-40 h-40 bg-indigo-600 opacity-20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2 text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><ChevronRight className="h-3 w-3" /></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><ChevronRight className="h-3 w-3" /></li>
                <li className="text-white/50 truncate">{post.title}</li>
              </ol>
            </nav>

            <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

            {/* Enhanced meta information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author || "Todo Humphrey"}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span>{viewCount.toLocaleString()} views</span>
              </div>
            </div>

            {/* Article excerpt */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="dark:fill-gray-900"
            ></path>
          </svg>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Social share sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 flex flex-col items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleShare("facebook")}
                aria-label="Share on Facebook"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleShare("twitter")}
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5 text-sky-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={handleCopyLink}
                aria-label="Copy link"
              >
                <Copy className="h-5 w-5" />
              </Button>
              <div className="h-px w-6 bg-gray-200 dark:bg-gray-700 my-2"></div>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isBookmarked ? "text-purple-600 border-purple-600" : ""}`}
                onClick={handleBookmark}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <BookmarkPlus className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isLiked ? "text-red-500 border-red-500" : ""}`}
                onClick={handleLike}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                <ThumbsUp className="h-5 w-5" />
                <span className="sr-only">Like</span>
              </Button>
              <span className="text-sm font-medium">{likeCount}</span>
            </div>
          </div>

          {/* Main content */}
          <article ref={articleRef} className="lg:col-span-8">
            {/* Featured image with overlay info */}
            <div className="mb-10 relative rounded-xl overflow-hidden shadow-2xl group">
              <Image
                src={post.coverImage || "/placeholder.svg?height=600&width=1200"}
                alt={post.title}
                width={1200}
                height={400}
                priority
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{likeCount}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{commentCount}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{viewCount.toLocaleString()}</span>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-none">
                    {post.category}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Enhanced mobile engagement bar */}
            <div className="lg:hidden mb-8">
              {/* Engagement metrics */}
              <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{viewCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{likeCount}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{commentCount}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pb-4 border-b dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-2 ${isLiked ? "text-red-500 border-red-500 bg-red-50 dark:bg-red-950" : ""}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{likeCount}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={isBookmarked ? "text-purple-600 border-purple-600 bg-purple-50 dark:bg-purple-950" : ""}
                    onClick={handleBookmark}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                </div>
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare("facebook")}>
                        <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("twitter")}>
                        <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                        <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                        LinkedIn
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleCopyLink}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Article content with enhanced styling */}
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-950/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-gray-700 dark:prose-li:text-gray-300">

              {/* Article introduction with key points */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-xl p-6 mb-8 border border-purple-100 dark:border-purple-800">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2 mt-0">
                      Key Takeaways
                    </h3>
                    <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1 mb-0">
                      <li>• Comprehensive guide to {post.category.toLowerCase()} in Uganda</li>
                      <li>• Expert insights from Cave Motions professionals</li>
                      <li>• Practical tips and real-world examples</li>
                      <li>• Latest trends and best practices for 2024</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: post.content || "<p>Content loading...</p>",
                }}
              />

              {/* Call-to-action section */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-8 my-12 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Transform your business with Cave Motions' expert {post.category.toLowerCase()} services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Get Free Consultation
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Our Portfolio
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Tags Section */}
            <div className="mt-12 pt-8 border-t dark:border-gray-800">
              <div className="flex items-center mb-4">
                <Tag className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Topics Covered</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {(post.tags || []).map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Enhanced Author Bio */}
            <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-purple-100 dark:ring-purple-900/30">
                    <Image
                      src={post.authorAvatar || "/placeholder.svg?height=80&width=80"}
                      alt={post.author || "Author"}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {post.author || "Todo Humphrey"}
                    </h3>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs">
                      Expert Author
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {post.authorBio ||
                      "Expert developer and technology consultant at Cave Motions, helping businesses transform through innovative digital solutions."}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="h-9 px-3 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-950/50">
                        <Twitter className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm">Follow</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 px-3 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-950/50">
                        <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                        <span className="text-sm">Connect</span>
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">15</span> articles published
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              {/* Enhanced Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-2 h-8 px-3 bg-purple-600 hover:bg-purple-700"
                >
                  Go
                </Button>
              </div>

              {/* Enhanced Table of contents */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">Table of Contents</h3>
                </div>
                <nav className="space-y-3 text-sm">
                  {(post.tableOfContents || []).map((item: string, index: number) => (
                    <a
                      key={index}
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 group"
                    >
                      <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">{index + 1}</span>
                      </div>
                      <span className="flex-1">{item}</span>
                      <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Enhanced Recent posts */}
              <div>
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  <h3 className="text-lg font-bold">Recent Posts</h3>
                </div>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((recentPost, index) => (
                    <Link key={index} href={`/blog/${recentPost.slug}`} className="group block">
                      <div className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={recentPost.coverImage || "/placeholder.svg?height=80&width=80"}
                            alt={recentPost.title}
                            width={80}
                            height={80}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-600 transition-colors mb-2">
                            {recentPost.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{new Date(recentPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <Badge variant="secondary" className="text-xs">
                              {recentPost.readTime}m read
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl p-6 border border-orange-100 dark:border-orange-800">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">Trending Topics</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { topic: "AI Automation", posts: 12, trend: "+15%" },
                    { topic: "Web Development", posts: 18, trend: "+8%" },
                    { topic: "Mobile Apps", posts: 9, trend: "+22%" },
                    { topic: "E-commerce", posts: 6, trend: "+12%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors cursor-pointer">
                      <div>
                        <div className="font-medium text-sm text-orange-900 dark:text-orange-100">{item.topic}</div>
                        <div className="text-xs text-orange-600 dark:text-orange-400">{item.posts} articles</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">
                        {item.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {[
                    { name: "Web Development", count: 12 },
                    { name: "AI Automation", count: 8 },
                    { name: "Software Development", count: 10 },
                    { name: "Mobile Development", count: 6 },
                    { name: "UI/UX Design", count: 4 },
                    { name: "E-commerce", count: 3 },
                    { name: "Digital Marketing", count: 5 },
                  ].map((category, index) => (
                    <Link
                      key={index}
                      href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between py-2 border-b dark:border-gray-800 last:border-0 hover:text-purple-600 transition-colors"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Enhanced Newsletter */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Stay Updated</h3>
                  </div>
                  <p className="text-purple-100 mb-4 text-sm leading-relaxed">
                    Join 2,500+ developers and business owners getting weekly insights on technology trends in Uganda.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your email address"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 h-12"
                    />
                    <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 h-12 font-semibold">
                      Subscribe for Free
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="flex items-center mt-4 text-xs text-purple-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span>No spam, unsubscribe anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}

      {/* Floating engagement metrics for desktop */}
      <div className="hidden lg:block fixed bottom-8 left-8 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{likeCount}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Likes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{commentCount}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(readingProgress)}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Read</div>
          </div>
        </div>
      </div>
    </>
  )
}
