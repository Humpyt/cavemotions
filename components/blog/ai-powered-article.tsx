"use client"

import { useState, useEffect } from 'react'
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
import { cn } from '@/lib/utils'
import { moonshotAI, LayoutRecommendation, formatRecommendationForCSS } from '@/lib/moonshot-ai'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  date: string
  author?: string
  category: string
  tags: string[]
  readTime?: number
}

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
            {post.category}
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</p>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(post.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {post.readTime || 5} min read
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {post.author || 'Cave Motions'}
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
            {post.category}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-2xl text-white/90 mb-10 max-w-3xl">{post.excerpt}</p>
          
          <div className="flex flex-wrap items-center gap-8 text-white/80">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {post.readTime || 5} min read
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {post.author || 'Cave Motions'}
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
            {post.category}
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
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readTime || 5} min read
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author || 'Cave Motions'}
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

// Interactive elements
const InteractiveElements = {
  'progress-bar': ({ progress }: { progress: number }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b"
    >
      <Progress value={progress} className="h-1" />
    </motion.div>
  ),

  'social-share': ({ post, cssVars }: { post: BlogPost, cssVars: Record<string, string> }) => (
    <div className="flex items-center gap-3 py-4 border-y dark:border-gray-700">
      <span className="text-sm font-medium">Share this article:</span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm">
          <BookmarkPlus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <ThumbsUp className="h-4 w-4" />
          <span>24</span>
        </Button>
      </div>
    </div>
  )
}

export default function AIPoweredArticle({ post, relatedPosts = [] }: AIPoweredArticleProps) {
  const [recommendation, setRecommendation] = useState<LayoutRecommendation | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate AI-powered layout recommendation
    const generateLayout = async () => {
      try {
        const layoutRecommendation = await moonshotAI.generateLayoutRecommendation({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          tags: post.tags,
          readTime: post.readTime
        })
        
        setRecommendation(layoutRecommendation)
        console.log('🤖 AI Layout Recommendation:', layoutRecommendation)
      } catch (error) {
        console.error('Failed to generate AI layout:', error)
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

  const cssVars = formatRecommendationForCSS(recommendation, post.category)
  const HeroComponent = HeroComponents[recommendation.heroStyle] || HeroComponents.gradient
  const ContentLayout = ContentLayouts[recommendation.layoutType] || ContentLayouts.standard

  return (
    <div className="min-h-screen" style={{ backgroundColor: cssVars['--ai-background'] }}>
      {/* AI-Generated Progress Bar */}
      {recommendation.interactiveElements.includes('progress-bar') && (
        <InteractiveElements.progress-bar progress={scrollProgress} />
      )}

      {/* AI-Generated Hero Section */}
      <HeroComponent post={post} cssVars={cssVars} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Article Content */}
          <article className="lg:col-span-8">
            {/* Featured Image */}
            {post.coverImage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mb-10 overflow-hidden",
                  recommendation.visualElements.cardStyle === 'modern' && "rounded-2xl shadow-2xl",
                  recommendation.visualElements.cardStyle === 'minimal' && "rounded-lg",
                  recommendation.visualElements.cardStyle === 'glass' && "rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                )}
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            )}

            {/* Social Share */}
            {recommendation.interactiveElements.includes('social-share') && (
              <InteractiveElements.social-share post={post} cssVars={cssVars} />
            )}

            {/* AI-Generated Content Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <ContentLayout content={post.content} recommendation={recommendation} />
            </motion.div>

            {/* Tags */}
            {recommendation.readabilityFeatures.includes('tags') && post.tags.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="hover:opacity-80 cursor-pointer transition-opacity"
                      style={{ backgroundColor: `${cssVars['--ai-accent-color']}20` }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Author Bio */}
            {recommendation.interactiveElements.includes('author-bio') && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <div 
                  className={cn(
                    "p-6",
                    recommendation.visualElements.cardStyle === 'modern' && "bg-gray-100 dark:bg-gray-800 rounded-2xl",
                    recommendation.visualElements.cardStyle === 'glass' && "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700",
                    recommendation.visualElements.cardStyle === 'minimal' && "border-l-4 pl-6 border-gray-300 dark:border-gray-600"
                  )}
                  style={{ 
                    borderLeftColor: recommendation.visualElements.cardStyle === 'minimal' ? cssVars['--ai-accent-color'] : undefined 
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500 dark:text-gray-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{post.author || 'Cave Motions Team'}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Expert developer and technology consultant at Cave Motions, helping businesses transform through innovative digital solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Reading Stats */}
              {recommendation.readabilityFeatures.includes('estimated-time') && (
                <div 
                  className={cn(
                    "p-6",
                    recommendation.visualElements.cardStyle === 'modern' && "bg-white dark:bg-gray-800 rounded-2xl shadow-lg",
                    recommendation.visualElements.cardStyle === 'glass' && "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <h3 className="font-semibold mb-4">Article Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Reading Time
                      </span>
                      <span className="font-medium">{post.readTime || 5} min</span>
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
              )}

              {/* Related Articles */}
              {recommendation.interactiveElements.includes('related-articles') && relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className={cn(
                    "p-6",
                    recommendation.visualElements.cardStyle === 'modern' && "bg-white dark:bg-gray-800 rounded-2xl shadow-lg",
                    recommendation.visualElements.cardStyle === 'glass' && "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <h3 className="font-semibold mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" style={{ color: cssVars['--ai-accent-color'] }} />
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
                              {new Date(relatedPost.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Newsletter */}
              {recommendation.interactiveElements.includes('newsletter') && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="rounded-2xl p-6 text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${cssVars['--ai-primary-color']}, ${cssVars['--ai-secondary-color']})` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <h3 className="font-semibold mb-2">Stay Updated</h3>
                    <p className="text-white/90 mb-4 text-sm">
                      Get AI-powered insights delivered to your inbox.
                    </p>
                    <div className="space-y-2">
                      <input 
                        type="email"
                        placeholder="Your email address" 
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
