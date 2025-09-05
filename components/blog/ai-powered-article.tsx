"use client"

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  BookmarkPlus, 
  ThumbsUp,
  Eye,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  ScrollText
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ToastContainer, useToast } from '@/components/ui/toast-notification'
import { cn } from '@/lib/utils'
import { moonshotAI, LayoutRecommendation, formatRecommendationForCSS } from '@/lib/moonshot-ai'
import { useAITheme, useResponsiveTheme } from '@/hooks/use-ai-theme'
import '@/styles/blog-styles.css'

// Use imported types
import { BlogPost } from '@/types/blog-post'

interface AIPoweredArticleProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
}

// Hero components based on AI recommendations
const HeroComponents = {
  minimal: ({ post, cssVars }: { post: BlogPost, cssVars: Record<string, string> }) => (
    <section className="bg-white dark:bg-gray-900 pt-32 pb-16" style={cssVars}>
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
        
        <div className="mb-6">
          <Badge style={{ backgroundColor: 'var(--ai-accent-color)', color: 'white' }}>
            {post.tags?.[0] || 'Article'}
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</p>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {post.readingTime || 5} min read
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {typeof post.author === 'string' ? post.author : post.author?.name || 'Cave Motions'}
          </div>
        </div>
      </div>
    </section>
  ),

  immersive: ({ post, cssVars }: { post: BlogPost, cssVars: Record<string, string> }) => (
    <section className="relative min-h-screen flex items-center" style={cssVars}>
      {post.coverImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0" 
            style={{ background: `linear-gradient(135deg, ${cssVars['--ai-primary-color']}CC, ${cssVars['--ai-secondary-color']}AA)` }}
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          
          <Badge className="mb-6" style={{ backgroundColor: cssVars['--ai-accent-color'] }}>
            {post.tags?.[0] || 'Article'}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-2xl text-white/90 mb-10 max-w-3xl">{post.excerpt}</p>
          
          <div className="flex flex-wrap items-center gap-8 text-white/80">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {post.readingTime || 5} min read
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {typeof post.author === 'string' ? post.author : post.author?.name || 'Cave Motions'}
            </div>
          </div>
        </div>
      </div>
    </section>
  ),

  gradient: ({ post, cssVars }: { post: BlogPost, cssVars: Record<string, string> }) => (
    <section 
      className="pt-32 pb-20 text-white relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${cssVars['--ai-primary-color']}, ${cssVars['--ai-secondary-color']})`,
        ...cssVars 
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          
          <Badge className="mb-6 bg-white/20 text-white border-none">
            {post.tags?.[0] || 'Article'}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-white/90 mb-10 max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readingTime || 5} min read
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {typeof post.author === 'string' ? post.author : post.author?.name || 'Cave Motions'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Content layout components
const ContentLayouts = {
  standard: ({ content, recommendation }: { content: string, recommendation: LayoutRecommendation }) => (
    <div 
      className={cn(
        "prose prose-lg dark:prose-invert max-w-none",
        recommendation.visualElements.typography === 'elegant' && "prose-serif",
        recommendation.visualElements.typography === 'technical' && "font-mono text-sm",
        recommendation.visualElements.typography === 'casual' && "prose-sm"
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ),

  technical: ({ content, recommendation }: { content: string, recommendation: LayoutRecommendation }) => (
    <div className="space-y-8">
      {recommendation.interactiveElements.includes('table-of-contents') && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ScrollText className="h-5 w-5 mr-2" />
            Table of Contents
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              <ChevronRight className="h-4 w-4 mr-1" />
              Introduction
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              <ChevronRight className="h-4 w-4 mr-1" />
              Implementation
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              <ChevronRight className="h-4 w-4 mr-1" />
              Best Practices
            </div>
          </div>
        </div>
      )}
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none font-mono prose-pre:bg-gray-900 prose-pre:border prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  ),

  tutorial: ({ content, recommendation }: { content: string, recommendation: LayoutRecommendation }) => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-2">What you'll learn</h3>
        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
          <li>• Step-by-step implementation</li>
          <li>• Best practices and tips</li>
          <li>• Common pitfalls to avoid</li>
        </ul>
      </div>
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none prose-h2:bg-gray-50 dark:prose-h2:bg-gray-800 prose-h2:px-4 prose-h2:py-2 prose-h2:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

// InteractiveElements.socialShare component
const SocialShareComponent = ({ post, isLiked, setIsLiked, likeCount, setLikeCount, isBookmarked, setIsBookmarked, handleShare, handleBookmark, handleLike }: {
  post: BlogPost;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
  likeCount: number;
  setLikeCount: (count: number | ((prev: number) => number)) => void;
  isBookmarked: boolean;
  setIsBookmarked: (bookmarked: boolean) => void;
  handleShare: () => void;
  handleBookmark: () => void;
  handleLike: () => void;
}) => (
    <div className="flex items-center gap-3 py-4 border-y dark:border-gray-700">
      <span className="text-sm font-medium">Share this article:</span>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => handleShare()}
          title="Share this article"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleBookmark()}
          className={isBookmarked ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}
          title="Bookmark this article"
        >
          <BookmarkPlus className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${isLiked ? 'bg-red-50 border-red-300 text-red-700' : ''}`}
          onClick={() => handleLike()}
          title="Like this article"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likeCount}</span>
        </Button>
      </div>
    </div>
);

// Interactive elements
const InteractiveElements = {
  progressBar: ({ progress }: { progress: number }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b"
    >
      <Progress value={progress} className="h-1" />
    </motion.div>
  ),

  socialShare: ({ post, isLiked, setIsLiked, likeCount, setLikeCount, isBookmarked, setIsBookmarked, handleShare, handleBookmark, handleLike }: {
    post: BlogPost;
    isLiked: boolean;
    setIsLiked: (liked: boolean) => void;
    likeCount: number;
    setLikeCount: (count: number | ((prev: number) => number)) => void;
    isBookmarked: boolean;
    setIsBookmarked: (bookmarked: boolean) => void;
    handleShare: () => void;
    handleBookmark: () => void;
    handleLike: () => void;
  }) => (
    <SocialShareComponent 
      post={post}
      isLiked={isLiked}
      setIsLiked={setIsLiked}
      likeCount={likeCount}
      setLikeCount={setLikeCount}
      isBookmarked={isBookmarked}
      setIsBookmarked={setIsBookmarked}
      handleShare={handleShare}
      handleBookmark={handleBookmark}
      handleLike={handleLike}
    />
  )
}

export default function AIPoweredArticle({ post, relatedPosts = [] }: AIPoweredArticleProps) {
  console.log('🔵 AIPoweredArticle component initialized with post:', post?.title)
  console.log('🔵 Post data:', { title: post?.title, tags: post?.tags, slug: post?.slug })
  
  const [recommendation, setRecommendation] = useState<LayoutRecommendation | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(24)
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  // Toast notifications
  const { toasts, removeToast, success, info } = useToast()
  
  // Use our new AI theme hook
  const { 
    theme, 
    layoutClasses, 
    components, 
    animationClasses,
  } = useAITheme(post)
  
  // Add responsive adjustments
  const { responsiveTheme, isMobile } = useResponsiveTheme(theme)

  useEffect(() => {
    // Generate AI-powered layout recommendation
    const generateLayout = async () => {
      try {
        console.log('🚀 Starting AI layout generation for:', post.title)
        const layoutRecommendation = await moonshotAI.generateLayoutRecommendation({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.tags?.[0] || 'General',
          tags: post.tags || [],
          readTime: post.readingTime || 5
        })
        
        setRecommendation(layoutRecommendation)
        console.log('🤖 AI Layout Recommendation Generated:', layoutRecommendation)
      } catch (error) {
        console.error('❌ Failed to generate AI layout:', error)
        // Force fallback recommendation to ensure we still get AI styling
        const fallbackRecommendation = moonshotAI.getFallbackRecommendation({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.tags?.[0] || 'General',
          tags: post.tags || [],
          readTime: post.readingTime || 5
        })
        setRecommendation(fallbackRecommendation)
        console.log('🔧 Using fallback recommendation:', fallbackRecommendation)
      } finally {
        setIsLoading(false)
      }
    }

    generateLayout()
  }, [post])

  useEffect(() => {
    // Track scroll progress for progress bar
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((scrollTop / docHeight) * 100, 100)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Social interaction handlers
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    // Save to localStorage
    localStorage.setItem(`liked_${post.slug}`, (!isLiked).toString())
    // Show feedback
    if (!isLiked) {
      success('Article liked!')
    } else {
      info('Like removed')
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // Save to localStorage
    const bookmarked = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]')
    if (!isBookmarked) {
      bookmarked.push({ slug: post.slug, title: post.title, date: new Date().toISOString() })
      success('Article bookmarked!')
    } else {
      const index = bookmarked.findIndex((item: any) => item.slug === post.slug)
      if (index > -1) bookmarked.splice(index, 1)
      info('Bookmark removed')
    }
    localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarked))
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
        fallbackShare()
      }
    } else {
      fallbackShare()
    }
  }

  const fallbackShare = () => {
    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      success('Article URL copied to clipboard!')
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      success('Article URL copied to clipboard!')
    })
  }

  // Load saved states on component mount
  useEffect(() => {
    const liked = localStorage.getItem(`liked_${post.slug}`) === 'true'
    setIsLiked(liked)
    
    const bookmarked = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]')
    const isPostBookmarked = bookmarked.some((item: any) => item.slug === post.slug)
    setIsBookmarked(isPostBookmarked)
  }, [post.slug])

  if (isLoading || !recommendation) {
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

  const cssVars = formatRecommendationForCSS(recommendation, post.tags?.[0] || 'General')
  const HeroComponent = (HeroComponents as any)[recommendation.heroStyle] || HeroComponents.gradient
  const ContentLayout = (ContentLayouts as any)[recommendation.layoutType] || ContentLayouts.standard

  // Enhanced AI-powered styling system based on Moonshot AI recommendations
  return (
    <div className="blog-container min-h-screen" style={{ backgroundColor: cssVars['--ai-background'] }}>
      {/* AI-Generated Progress Bar */}
      {recommendation.interactiveElements.includes('progress-bar') && (
        <InteractiveElements.progressBar progress={scrollProgress} />
      )}

      {/* AI-Generated Hero Section */}
      <HeroComponent post={post} cssVars={cssVars} />
      
      {/* AI-Optimized Article Container */}
      <div className="article-container">
        <div className={cn(
          "article-grid",
          theme.layout.contentLayout === 'sidebar' && !isMobile ? 'grid-cols-3fr-1fr' : 'grid-cols-1'
        )}>
          
          {/* Main Article Content */}
          <article className={cn(layoutClasses.content, "py-16", animationClasses[0])}>
            {/* Featured Image */}
            {post.coverImage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mb-10 overflow-hidden rounded-2xl",
                  layoutClasses.card
                )}
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            )}

            {/* AI-Enhanced Social Share */}
            {components.showSocialShare && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="social-share"
              >
                <SocialShareComponent 
                  post={post}
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                  likeCount={likeCount}
                  setLikeCount={setLikeCount}
                  isBookmarked={isBookmarked}
                  setIsBookmarked={setIsBookmarked}
                  handleShare={handleShare}
                  handleBookmark={handleBookmark}
                  handleLike={handleLike}
                />
              </motion.div>
            )}

            {/* AI-Generated Table of Contents */}
            {components.showTableOfContents && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="table-of-contents"
              >
                <h3 className="toc-title">
                  <ScrollText className="h-5 w-5" />
                  Table of Contents
                </h3>
                <ul className="toc-list">
                  <li className="toc-item">
                    <ChevronRight className="h-4 w-4" />
                    Introduction
                  </li>
                  <li className="toc-item">
                    <ChevronRight className="h-4 w-4" />
                    Key Benefits & Features
                  </li>
                  <li className="toc-item">
                    <ChevronRight className="h-4 w-4" />
                    Implementation Guide
                  </li>
                  <li className="toc-item">
                    <ChevronRight className="h-4 w-4" />
                    Best Practices
                  </li>
                  <li className="toc-item">
                    <ChevronRight className="h-4 w-4" />
                    Conclusion
                  </li>
                </ul>
              </motion.div>
            )}

            {/* AI-Styled Content with Professional Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 article-content"
            >
              <ContentLayout content={post.content} recommendation={recommendation} />
            </motion.div>



            {/* AI-Enhanced Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="tag-cloud"
              >
                <h3 className="blog-h4 mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <a 
                      key={tag} 
                      href={`/blog/tag/${tag}`}
                      className="tag"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI-Enhanced Author Bio */}
            {components.showAuthorBio && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="author-bio"
              >
                <div className="author-avatar">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="author-info">
                  <h3>{typeof post.author === 'string' ? post.author : post.author?.name || 'Cave Motions Team'}</h3>
                  <p>
                    Expert web designers and frontend developers at Cave Motions. We specialize in creating modern, professional blogs with clean typography, balanced white space, and consistent color palettes. Our professional styling ensures optimal user experience and SEO performance.
                  </p>
                </div>
              </motion.div>
            )}
          </article>

          {/* Enhanced Sidebar */}
          {theme.layout.contentLayout === 'sidebar' && !isMobile && (
            <aside className="article-sidebar">
              <div className="space-y-8">
                {/* Reading Stats */}
                <div className={cn(layoutClasses.card, "p-6", animationClasses[0])}>
                  <h3 className="blog-h4 mb-4">Article Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Reading Time
                      </span>
                      <span className="font-medium">{post.readingTime || 5} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Views
                      </span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comments
                      </span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </div>



                {/* Related Articles */}
                {components.showRelatedArticles && relatedPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className={cn(layoutClasses.card, "p-6", animationClasses[0])}
                  >
                    <h3 className="blog-h4 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.slice(0, 3).map((relatedPost) => (
                        <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block">
                          <div className="flex gap-3">
                            {relatedPost.coverImage && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                <img
                                  src={relatedPost.coverImage}
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 group-hover:opacity-80 transition-opacity">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(relatedPost.publishedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Newsletter */}
                {components.showNewsletterSignup && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="newsletter-signup"
                  >
                    <div className="newsletter-content">
                      <h3 className="newsletter-title">Stay Updated</h3>
                      <p className="newsletter-description">
                        Get design insights and web development tips delivered to your inbox.
                      </p>
                      <div className="newsletter-form">
                        <input 
                          type="email"
                          placeholder="Your email address" 
                          className="newsletter-input"
                        />
                        <button className="newsletter-button">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
