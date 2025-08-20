import { Metadata } from 'next'
import Link from 'next/link'
import { searchPosts } from '@/lib/wordpress'
import { formatDate, calculateReadingTime, extractPlainText } from '@/lib/wordpress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Search, ArrowLeft } from 'lucide-react'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  
  return {
    title: q ? `Search Results for "${q}" | Cave Motions Blog` : 'Search | Cave Motions Blog',
    description: q ? `Search results for "${q}" on Cave Motions blog.` : 'Search our blog for technology insights and business growth tips.',
    robots: {
      index: false, // Don't index search pages
      follow: true,
    },
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''
  
  // Only search if there's a query
  const posts = query ? await searchPosts(query) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link href="/blog-wp" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex items-center mb-4">
              <Search className="h-6 w-6 mr-3" />
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-sm">
                Search
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {query ? `Search Results` : 'Search Our Blog'}
            </h1>

            {query && (
              <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                {posts.length > 0 
                  ? `Found ${posts.length} result${posts.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results found for "${query}"`
                }
              </p>
            )}

            {/* Search Form */}
            <form method="GET" className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                name="q"
                defaultValue={query}
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
        {query ? (
          <div className="max-w-4xl mx-auto">
            {posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.id} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {post._embedded?.['wp:featuredmedia']?.[0] && (
                          <div className="md:w-48 h-32 md:h-24 overflow-hidden rounded-lg shrink-0">
                            <img
                              src={post._embedded['wp:featuredmedia'][0].source_url}
                              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
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
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try searching with different keywords or browse our categories.
                </p>
                <Link href="/blog-wp">
                  <Button>
                    Browse All Articles
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Search Our Blog
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter a search term above to find articles on technology, business growth, and more.
            </p>
            <Link href="/blog-wp">
              <Button>
                Browse All Articles
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
