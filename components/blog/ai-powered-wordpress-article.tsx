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
  ScrollText,
  Sparkles
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ToastContainer, useToast } from '@/components/ui/toast-notification'
import { cn } from '@/lib/utils'
import { moonshotAI, LayoutRecommendation, formatRecommendationForCSS } from '@/lib/moonshot-ai'
import { useAITheme, useResponsiveTheme } from '@/hooks/use-ai-theme'
import { 
  WordPressPost, 
  WordPressBlogPost,
  convertWordPressPostToBlogPost, 
  getRelatedWordPressPosts,
  extractContentSummaryForAI,
  formatDate,
  calculateReadingTime,
  extractPlainText
} from '@/lib/wordpress'
import '@/styles/blog-styles.css'

// Import types
import { BlogPost } from '@/types/blog-post'

interface AIPoweredWordPressArticleProps {
  post: WordPressPost
  relatedPosts?: WordPressPost[]
}

// AI-Powered WordPress Article Component
export default function AIPoweredWordPressArticle({ 
  post, 
  relatedPosts = [] 
}: AIPoweredWordPressArticleProps) {
  // Safety check for post data
  if (!post) {
    console.error('❌ AIPoweredWordPressArticle: No post data provided')
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The WordPress post could not be loaded.
          </p>
        </div>
      </div>
    )
  }

  // Convert WordPress post to BlogPost for AI analysis
  const blogPost = useMemo(() => {
    try {
      return convertWordPressPostToBlogPost(post)
    } catch (error) {
      console.error('❌ Error converting WordPress post:', error)
      // Return a minimal fallback WordPressBlogPost
      return {
        id: post.id?.toString() || 'unknown',
        slug: post.slug || 'untitled',
        title: post.title?.rendered || 'Untitled',
        excerpt: 'Content not available',
        content: post.content?.rendered || '',
        coverImage: '/images/blog-default.svg',
        publishedAt: post.date || new Date().toISOString(),
        author: 'Cave Motions',
        category: 'General',
        tags: [],
        readTime: 1,
        featured: false,
        metaDescription: 'Content not available',
        keywords: []
      }
    }
  }, [post])
  
  // Create a compatible BlogPost for the AI theme hook
  const aiCompatiblePost: BlogPost = useMemo(() => ({
    id: blogPost.id || 'unknown',
    title: blogPost.title,
    slug: blogPost.slug,
    content: blogPost.content,
    excerpt: blogPost.excerpt,
    publishedAt: blogPost.publishedAt,
    coverImage: blogPost.coverImage,
    author: blogPost.author ? {
      id: 'wp-author',
      name: blogPost.author
    } : undefined,
    tags: blogPost.tags,
    readingTime: blogPost.readTime
  }), [blogPost])
  
  // State for AI recommendations and reading progress
  const [aiRecommendation, setAiRecommendation] = useState<LayoutRecommendation | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)
  const [cssVars, setCssVars] = useState<Record<string, string>>({})
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(42)
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  // Toast notifications
  const { toasts, removeToast, success, info } = useToast()
  
  // WordPress-specific data extraction with safety checks
  const author = post._embedded?.author?.[0]
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
  const categories = post._embedded?.['wp:term']?.[0] || []
  const tags = post._embedded?.['wp:term']?.[1] || []
  const readingTime = calculateReadingTime(post.content?.rendered || '')
  
  // Convert related WordPress posts to BlogPost format
  const relatedBlogPosts = useMemo(() => {
    try {
      return relatedPosts
        .filter(relatedPost => relatedPost && relatedPost.slug) // Filter out any undefined/invalid posts
        .map(relatedPost => {
          try {
            return convertWordPressPostToBlogPost(relatedPost)
          } catch (error) {
            console.error('\u274c Error converting related post:', relatedPost?.slug, error)
            return null
          }
        })
        .filter((post): post is WordPressBlogPost => post !== null) // Remove any failed conversions
    } catch (error) {
      console.error('\u274c Error processing related posts:', error)
      return []
    }
  }, [relatedPosts])
  
  // Use AI theme system with converted blog post
  const { theme, layoutClasses, components, animationClasses } = useAITheme(aiCompatiblePost)
  const { responsiveTheme } = useResponsiveTheme(theme)

  // Generate AI recommendations on mount
  useEffect(() => {
    const generateAIRecommendations = async () => {
      console.log('🌙 Generating AI recommendations for WordPress post:', post.title?.rendered || 'Untitled')
      setIsLoadingAI(true)
      
      try {
        // Extract content for AI analysis with safety checks
        const contentSummary = extractContentSummaryForAI(post)
        console.log('📊 Content summary for AI analysis:', contentSummary)
        
        // Generate AI recommendations
        const recommendation = await moonshotAI.generateLayoutRecommendation(contentSummary)
        setAiRecommendation(recommendation)
        
        // Generate CSS variables
        const generatedVars = formatRecommendationForCSS(recommendation, contentSummary.category)
        setCssVars(generatedVars)
        
        console.log('✅ AI recommendations generated for WordPress post')
      } catch (error) {
        console.error('❌ Failed to generate AI recommendations:', error)
        
        // Check if it's a specific Zod error
        if (error instanceof Error && error.name === 'ZodError') {
          console.error('🔴 Zod Validation Error Details:', (error as any).issues)
          console.log('🔧 Using enhanced fallback due to schema validation failure')
        }
        
        // Use enhanced fallback theme with better error recovery
        const fallbackVars = formatRecommendationForCSS({
          layoutType: 'standard',
          heroStyle: 'clean',
          contentStructure: ['intro', 'main-content', 'conclusion'],
          visualElements: {
            accentColor: '#6366f1',
            backgroundStyle: 'clean',
            cardStyle: 'modern',
            typography: 'readable'
          },
          interactiveElements: ['progress-bar', 'social-share', 'related-articles'],
          readabilityFeatures: ['estimated-time', 'tags']
        }, categories[0]?.name || 'general')
        setCssVars(fallbackVars)
        
        // Set a minimal AI recommendation for UI consistency
        setAiRecommendation({
          layoutType: 'standard',
          heroStyle: 'clean',
          contentStructure: ['intro', 'main-content', 'conclusion'],
          visualElements: {
            accentColor: '#6366f1',
            backgroundStyle: 'clean',
            cardStyle: 'modern',
            typography: 'readable'
          },
          interactiveElements: ['progress-bar', 'social-share'],
          readabilityFeatures: ['estimated-time']
        })
      } finally {
        setIsLoadingAI(false)
      }
    }

    generateAIRecommendations()
  }, [post, categories])

  // Reading progress tracking
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((scrollTop / docHeight) * 100, 100)
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', updateReadingProgress)
    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [])

  // Social interaction handlers
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    // Save to localStorage
    localStorage.setItem(`liked_wp_${post.slug}`, (!isLiked).toString())
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
    const bookmarked = JSON.parse(localStorage.getItem('bookmarkedWPPosts') || '[]')
    if (!isBookmarked) {
      bookmarked.push({ slug: post.slug, title: post.title?.rendered, date: new Date().toISOString() })
      success('Article bookmarked!')
    } else {
      const index = bookmarked.findIndex((item: any) => item.slug === post.slug)
      if (index > -1) bookmarked.splice(index, 1)
      info('Bookmark removed')
    }
    localStorage.setItem('bookmarkedWPPosts', JSON.stringify(bookmarked))
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title?.rendered || 'Article',
      text: extractPlainText(post.excerpt?.rendered || ''),
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
    const liked = localStorage.getItem(`liked_wp_${post.slug}`) === 'true'
    setIsLiked(liked)
    
    const bookmarked = JSON.parse(localStorage.getItem('bookmarkedWPPosts') || '[]')
    const isPostBookmarked = bookmarked.some((item: any) => item.slug === post.slug)
    setIsBookmarked(isPostBookmarked)
  }, [post.slug])

  // Hero component based on AI recommendation
  const renderHero = () => {
    const heroStyle = aiRecommendation?.heroStyle || 'clean'
    
    switch (heroStyle) {
      case 'immersive':
        return (
          <section 
            className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white pt-32 pb-20 min-h-[60vh]"
            style={cssVars}
          >
            {featuredImage && (
              <div className="absolute inset-0 z-0">
                <img
                  src={featuredImage.source_url}
                  alt={featuredImage.alt_text || post.title.rendered}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-indigo-900/80" />
              </div>
            )}
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {/* Back to Blog */}
                <Link href="/blog-wp" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to WordPress Blog
                </Link>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {categories.map((category) => (
                    <Badge key={category.id} className="bg-white/20 hover:bg-white/30 text-white border-none">
                      {category.name}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {post.title?.rendered || 'Untitled'}
                </h1>
                
                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-purple-100 justify-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{readingTime} min read</span>
                  </div>
                  {author && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{author.name}</span>
                    </div>
                  )}
                </div>
                
                {/* Excerpt */}
                <p className="text-lg md:text-xl text-purple-100 mt-6 leading-relaxed max-w-3xl mx-auto">
                  {extractPlainText(post.excerpt?.rendered || '') || 'No excerpt available'}
                </p>
              </div>
            </div>
          </section>
        )
      
      default: // 'clean' style
        return (
          <section className="bg-white dark:bg-gray-900 pt-32 pb-16" style={cssVars}>
            <div className="container mx-auto px-4 max-w-4xl">
              {/* Back to Blog */}
              <Link href="/blog-wp" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to WordPress Blog
              </Link>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title?.rendered || 'Untitled'}
              </h1>
              
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{readingTime} min read</span>
                </div>
                {author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{author.name}</span>
                  </div>
                )}
              </div>
              
              {/* Excerpt */}
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {extractPlainText(post.excerpt?.rendered || '') || 'No excerpt available'}
              </p>
            </div>
          </section>
        )
    }
  }

  return (
    <div className="blog-container min-h-screen bg-gray-50 dark:bg-gray-900" style={cssVars}>
      {/* Reading Progress Bar */}
      {components.showProgressBar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress value={readingProgress} className="h-1 bg-gray-200 dark:bg-gray-800" />
        </div>
      )}

      {/* Hero Section */}
      {renderHero()}

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Featured Image */}
            {featuredImage && (
              <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={featuredImage.source_url}
                  alt={featuredImage.alt_text || post.title.rendered}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Social Share Buttons */}
            {components.showSocialShare && (
              <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBookmark()}
                    className={isBookmarked ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}
                    title="Bookmark this article"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
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
              </div>
            )}

            {/* Article Content - WordPress HTML with AI styling */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none blog-content"
              style={{
                fontSize: 'var(--font-size-base, 1rem)',
                lineHeight: '1.7',
                ...cssVars
              }}
              dangerouslySetInnerHTML={{ __html: post.content?.rendered || '<p>Content not available</p>' }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="hover:bg-purple-100 hover:text-purple-800 transition-colors cursor-pointer">
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {author && components.showAuthorBio && (
              <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatar_urls['96'] || '/placeholder.svg?height=64&width=64'}
                    alt={author.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{author.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {author.description || "Expert developer and technology consultant at Cave Motions, helping businesses transform through innovative digital solutions."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Related WordPress Posts */}
              {components.showRelatedArticles && relatedBlogPosts.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogPosts.slice(0, 3).map((relatedPost) => (
                      <Link key={relatedPost.slug} href={`/blog-wp/${relatedPost.slug}`} className="group block">
                        <div className="flex gap-3 items-start">
                          <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                            <img
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatDate(relatedPost.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              {components.showNewsletterSignup && (
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                  <p className="text-purple-100 mb-4 text-sm">
                    Get the latest insights delivered to your inbox.
                  </p>
                  <div className="space-y-2">
                    <input 
                      type="email"
                      placeholder="Your email address" 
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                      Subscribe
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}