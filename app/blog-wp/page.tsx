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
    getPosts(1, 16),
    getFeaturedPosts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Latest Technology Insights
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Expert Insights
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                & Innovation
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover cutting-edge insights on AI automation, web development, and digital transformation strategies that drive business growth.
            </p>
            
            {/* Enhanced Search Bar */}
            <form action="/blog-wp/search" method="GET" className="max-w-lg mx-auto relative mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  name="q"
                  placeholder="Search articles, topics, or authors..."
                  className="pl-12 pr-32 h-14 bg-white/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-500 shadow-lg focus:shadow-xl transition-all duration-300"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-2 h-10 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Search
                </Button>
              </div>
            </form>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="px-4">
                <div className="text-2xl font-bold text-purple-600">{posts.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Readers</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* Magazine-Style Layout */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Featured Post */}
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <article className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white group">
              <div className="absolute inset-0">
                {featuredPosts[0]._embedded?.['wp:featuredmedia']?.[0] && (
                  <img
                    src={featuredPosts[0]._embedded['wp:featuredmedia'][0].source_url}
                    alt={featuredPosts[0]._embedded['wp:featuredmedia'][0].alt_text || featuredPosts[0].title.rendered}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent"></div>
              </div>
              
              <div className="relative z-10 flex items-center min-h-[500px] lg:min-h-[600px]">
                <div className="p-8 lg:p-16 max-w-2xl">
                  <Badge className="mb-4 bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                    🔥 Featured Story
                  </Badge>
                  
                  <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                    <Link 
                      href={`/blog-wp/${featuredPosts[0].slug}`}
                      className="hover:text-yellow-300 transition-colors duration-300"
                    >
                      {featuredPosts[0].title.rendered}
                    </Link>
                  </h2>
                  
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    {extractPlainText(featuredPosts[0].excerpt.rendered)}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center text-white/80">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(featuredPosts[0].date)}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{calculateReadingTime(featuredPosts[0].content.rendered)} min read</span>
                    </div>
                    {featuredPosts[0]._embedded?.author?.[0] && (
                      <div className="flex items-center text-white/80">
                        <img
                          src={featuredPosts[0]._embedded.author[0].avatar_urls['48'] || '/placeholder.svg?height=24&width=24'}
                          alt={featuredPosts[0]._embedded.author[0].name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm">{featuredPosts[0]._embedded.author[0].name}</span>
                      </div>
                    )}
                  </div>
                  
                  <Link href={`/blog-wp/${featuredPosts[0].slug}`}>
                    <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                      Read Full Story
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Secondary Featured Posts */}
        {featuredPosts.length > 1 && (
          <section className="mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(1, 4).map((post, index) => (
                <article key={post.id} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className={`${
                            index === 0 ? 'bg-red-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500'
                          } text-white`}>
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
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        <Link href={`/blog-wp/${post.slug}`}>
                          {post.title.rendered}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {extractPlainText(post.excerpt.rendered)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {post._embedded?.author?.[0] && (
                          <div className="flex items-center">
                            <img
                              src={post._embedded.author[0].avatar_urls['48'] || '/placeholder.svg?height=32&width=32'}
                              alt={post._embedded.author[0].name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {post._embedded.author[0].name}
                            </span>
                          </div>
                        )}
                        
                        <Link href={`/blog-wp/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="group-hover:text-purple-600 font-medium">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Latest Articles</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{posts.length} articles</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
              </div>
            </div>
            
            {/* Masonry-style Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <article 
                  key={post.id} 
                  className={`group ${
                    index % 3 === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    index % 3 === 0 ? 'md:flex md:items-center' : ''
                  }`}>
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                      <div className={`relative overflow-hidden ${
                        index % 3 === 0 ? 'md:w-1/2 h-64 md:h-48' : 'h-48'
                      }`}>
                        <img
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      </div>
                    )}
                    
                    <div className={`p-6 ${
                      index % 3 === 0 ? 'md:w-1/2' : ''
                    }`}>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.date)}</span>
                        <Clock className="h-4 w-4 ml-4 mr-1" />
                        <span>{calculateReadingTime(post.content.rendered)} min read</span>
                      </div>
                      
                      <h3 className={`font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 transition-colors ${
                        index % 3 === 0 ? 'text-2xl' : 'text-lg'
                      }`}>
                        <Link href={`/blog-wp/${post.slug}`}>
                          {post.title.rendered}
                        </Link>
                      </h3>
                      
                      <p className={`text-gray-600 dark:text-gray-300 mb-4 ${
                        index % 3 === 0 ? 'line-clamp-3' : 'line-clamp-2'
                      }`}>
                        {extractPlainText(post.excerpt.rendered)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {post._embedded?.author?.[0] && (
                          <div className="flex items-center">
                            <img
                              src={post._embedded.author[0].avatar_urls['48'] || '/placeholder.svg?height=32&width=32'}
                              alt={post._embedded.author[0].name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {post._embedded.author[0].name}
                            </span>
                          </div>
                        )}
                        
                        <Link href={`/blog-wp/${post.slug}`}>
                          <Button variant="outline" size="sm" className="group-hover:border-purple-600 group-hover:text-purple-600 transition-all duration-300">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <div className="w-1 h-6 bg-purple-600 rounded-full mr-3"></div>
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog-wp/category/${category.slug}`}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600">
                        {category.name}
                      </span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                        {category.count}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    📧 Stay Updated
                  </h3>
                  <p className="text-purple-100 mb-6 text-sm leading-relaxed">
                    Get weekly insights on technology trends, business growth strategies, and innovation delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Your email address" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 rounded-lg"
                    />
                    <Button className="w-full bg-white text-purple-700 hover:bg-gray-100 font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      Subscribe Now
                    </Button>
                  </div>
                  <p className="text-xs text-purple-200 mt-3 text-center">
                    No spam, unsubscribe anytime
                  </p>
                </div>
              </div>
              
              {/* Popular Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
                  Trending Now
                </h3>
                <div className="space-y-4">
                  {posts.slice(0, 4).map((post, index) => (
                    <Link key={post.id} href={`/blog-wp/${post.slug}`} className="group block">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center font-bold text-purple-600 dark:text-purple-300">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {post.title.rendered}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatDate(post.date)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
