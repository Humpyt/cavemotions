import { Metadata } from 'next'
import Link from 'next/link'
import { getPosts, getFeaturedPosts, getCategories } from '@/lib/wordpress'
import { formatDate, calculateReadingTime, extractPlainText } from '@/lib/wordpress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Clock, User, TrendingUp, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Cave Motions - Expert Insights on Technology & Business',
  description: 'Discover expert insights on web development, AI automation, mobile apps, and digital marketing. Stay updated with the latest technology trends in Uganda.',
  keywords: ['blog', 'technology', 'web development', 'AI automation', 'Uganda', 'Kampala', 'digital marketing'],
  openGraph: {
    title: 'Cave Motions Blog - Technology & Business Insights',
    description: 'Expert insights on web development, AI automation, mobile apps, and digital marketing in Uganda.',
    url: 'https://cavemotions.com/blog-wp',
    siteName: 'Cave Motions',
    images: [
      {
        url: 'https://cavemotions.com/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cave Motions Blog',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cave Motions Blog - Technology & Business Insights',
    description: 'Expert insights on web development, AI automation, mobile apps, and digital marketing in Uganda.',
    images: ['https://cavemotions.com/images/blog-og.jpg'],
  },
}

export default async function WordPressBlogPage() {
  // Fetch data from WordPress
  const [posts, featuredPosts, categories] = await Promise.all([
    getPosts(1, 12),
    getFeaturedPosts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden pt-32 pb-20">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full"></div>
          <div className="absolute top-20 right-10 w-20 h-20 bg-indigo-500 opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-30 h-30 bg-purple-400 opacity-20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Technology Insights & 
              <span className="text-yellow-300"> Business Growth</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              Expert insights on web development, AI automation, mobile apps, and digital marketing strategies for businesses in Uganda and beyond.
            </p>
            
            {/* Search Bar */}
            <form action="/blog-wp/search" method="GET" className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="q"
                placeholder="Search articles..."
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
              <Button type="submit" className="absolute right-2 top-2 h-8 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                Search
              </Button>
            </form>
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
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center mb-8">
                  <TrendingUp className="h-6 w-6 mr-3 text-purple-600" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Featured Articles</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.slice(0, 2).map((post) => (
                    <article key={post.id} className="group">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                        {post._embedded?.['wp:featuredmedia']?.[0] && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post._embedded['wp:featuredmedia'][0].source_url}
                              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-600">
                                Featured
                              </Badge>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(post.date)}</span>
                            <Clock className="h-4 w-4 ml-4 mr-1" />
                            <span>{calculateReadingTime(post.content.rendered)} min read</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 transition-colors">
                            <Link href={`/blog-wp/${post.slug}`}>
                              {post.title.rendered}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {extractPlainText(post.excerpt.rendered)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {post._embedded?.author?.[0] && (
                                <>
                                  <img
                                    src={post._embedded.author[0].avatar_urls['48'] || '/placeholder.svg?height=32&width=32'}
                                    alt={post._embedded.author[0].name}
                                    className="w-8 h-8 rounded-full mr-2"
                                  />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {post._embedded.author[0].name}
                                  </span>
                                </>
                              )}
                            </div>
                            
                            <Link href={`/blog-wp/${post.slug}`}>
                              <Button variant="ghost" size="sm" className="group-hover:text-purple-600">
                                Read More
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Posts */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Latest Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <article key={post.id} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                      {post._embedded?.['wp:featuredmedia']?.[0] && (
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(post.date)}</span>
                          <Clock className="h-4 w-4 ml-4 mr-1" />
                          <span>{calculateReadingTime(post.content.rendered)} min read</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 transition-colors">
                          <Link href={`/blog-wp/${post.slug}`}>
                            {post.title.rendered}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {extractPlainText(post.excerpt.rendered)}
                        </p>
                        
                        <Link href={`/blog-wp/${post.slug}`}>
                          <Button variant="outline" size="sm" className="group-hover:border-purple-600 group-hover:text-purple-600">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog-wp/category/${category.slug}`}
                      className="flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0 hover:text-purple-600 transition-colors"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-purple-100 mb-4 text-sm">
                  Get the latest insights on technology and business growth delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input 
                    placeholder="Your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
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
