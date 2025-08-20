import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByCategory, getCategories } from '@/lib/wordpress'
import { formatDate, calculateReadingTime, extractPlainText } from '@/lib/wordpress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    return {
      title: 'Category Not Found | Cave Motions Blog',
      description: 'The requested category could not be found.',
    }
  }

  return {
    title: `${category.name} Articles | Cave Motions Blog`,
    description: `Explore our ${category.name.toLowerCase()} articles and insights. Expert content on technology and business growth.`,
    keywords: [category.name, 'blog', 'technology', 'Cave Motions', 'Uganda'],
    openGraph: {
      title: `${category.name} Articles | Cave Motions Blog`,
      description: `Explore our ${category.name.toLowerCase()} articles and insights.`,
      url: `https://cavemotions.com/blog-wp/category/${slug}`,
      siteName: 'Cave Motions',
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [posts, categories] = await Promise.all([
    getPostsByCategory(slug),
    getCategories()
  ])

  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    notFound()
  }

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
              <Tag className="h-6 w-6 mr-3" />
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-sm">
                Category
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {category.name}
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              {category.description || `Explore our latest articles and insights on ${category.name.toLowerCase()}.`}
            </p>

            <div className="flex items-center text-purple-100">
              <span className="text-lg">{category.count} article{category.count !== 1 ? 's' : ''}</span>
            </div>
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
            {posts.length > 0 ? (
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
            ) : (
              <div className="text-center py-16">
                <Tag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  There are no articles in the {category.name} category yet.
                </p>
                <Link href="/blog-wp">
                  <Button>
                    Browse All Articles
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* All Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">All Categories</h3>
                <div className="space-y-2">
                  {categories.slice(0, 10).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/blog-wp/category/${cat.slug}`}
                      className={`flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0 hover:text-purple-600 transition-colors ${
                        cat.slug === slug ? 'text-purple-600 font-semibold' : ''
                      }`}
                    >
                      <span>{cat.name}</span>
                      <Badge variant="secondary">{cat.count}</Badge>
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
