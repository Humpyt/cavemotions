import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/wordpress'
import { formatDate, calculateReadingTime, extractPlainText } from '@/lib/wordpress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowLeft, Share2, BookmarkPlus, ThumbsUp } from 'lucide-react'

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

  const author = post._embedded?.author?.[0]
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
  const categories = post._embedded?.['wp:term']?.[0] || []
  const tags = post._embedded?.['wp:term']?.[1] || []
  const readingTime = calculateReadingTime(post.content.rendered)

  // Get related posts (you might want to implement this based on categories)
  const relatedPosts = await getPosts(1, 3)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link href="/blog-wp" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Badge key={category.id} className="bg-white/20 hover:bg-white/30 text-white border-none">
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title.rendered}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-purple-100">
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
            <p className="text-lg md:text-xl text-purple-100 mt-6 leading-relaxed max-w-3xl">
              {extractPlainText(post.excerpt.rendered)}
            </p>
          </div>
        </div>
      </section>

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
            <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>42</span>
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-950/20 prose-blockquote:py-2 prose-blockquote:px-4"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
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
            {author && (
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
              {/* Related Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.slice(0, 3).map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog-wp/${relatedPost.slug}`} className="group block">
                      <div className="flex gap-3 items-start">
                        {relatedPost._embedded?.['wp:featuredmedia']?.[0] && (
                          <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                            <img
                              src={relatedPost._embedded['wp:featuredmedia'][0].source_url}
                              alt={relatedPost.title.rendered}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {relatedPost.title.rendered}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatDate(relatedPost.date)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
