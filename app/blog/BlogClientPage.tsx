"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Search, Sparkles, TrendingUp, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// -----------------------------------------------------------------------------
// Types & helpers
// -----------------------------------------------------------------------------

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  metaDescription?: string
  keywords?: string[]
  content: string
  coverImage?: string
  date: string
  author?: string
  authorBio?: string
  authorAvatar?: string
  category: string
  tags: string[]
  readTime?: number
  featured?: boolean
  tableOfContents?: string[]
}

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
    },
  }),
}
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function BlogClientPage() {
  // STATE --------------------------------------------------------------------
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const postsPerPage = 6

  // Load blog posts on component mount
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Try to load from API first
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.posts) {
            setPosts(data.posts)
            const categories = data.posts.map((p: BlogPost) => p.category).filter((cat: unknown): cat is string => typeof cat === 'string')
            const uniqueCategories: string[] = ["All", ...new Set(categories)]
            setCategories(uniqueCategories)
            console.log('✅ Blog posts loaded from API:', data.posts.length)
            setIsLoading(false)
            return
          }
        }

        // Fallback: try to import directly
        const { getAllBlogPosts, getBlogCategories } = await import('@/lib/blog')
        const blogPosts = getAllBlogPosts()
        const blogCategories = getBlogCategories()

        if (blogPosts && blogPosts.length > 0) {
          setPosts(blogPosts)
          setCategories(blogCategories)
          console.log('✅ Blog posts loaded directly:', blogPosts.length)
        } else {
          throw new Error('No blog posts found')
        }

      } catch (err) {
        console.error('❌ Error loading blog posts:', err)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  // FILTERING -----------------------------------------------------------------
  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = activeCategory === "All" || post.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // PAGINATION ---------------------------------------------------------------
  const totalPages = Math.ceil(filtered.length / postsPerPage) || 1
  const paginated = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  // Reset to page 1 whenever filters change
  useEffect(() => setCurrentPage(1), [search, activeCategory])

  // Get featured and trending posts
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3)
  const trendingPosts = posts.slice(0, 4)

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative overflow-hidden bg-black py-16 md:py-20 min-h-[50vh]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-violet-800/70 to-purple-900/80"></div>
          </div>
          <div className="relative container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 text-center z-10">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-48 mx-auto mb-6"></div>
              <div className="h-16 bg-white/20 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-white/20 rounded w-80 mx-auto"></div>
            </div>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative overflow-hidden bg-black py-16 md:py-20 min-h-[50vh]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-violet-800/70 to-purple-900/80"></div>
          </div>
          <div className="relative container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 text-center z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blog Temporarily Unavailable
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-8">
              {error}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Try Again
            </Button>
          </div>
        </section>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col min-h-screen">
      {/* ------------------------------------------------------------------ */}
      {/* MODERN HERO SECTION ********************************************** */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Digital Innovation Hub
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Insights &
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Innovation
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Explore cutting-edge trends, expert insights, and transformative strategies in AI, web development, and digital innovation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-lg mx-auto mb-8"
            >
              <div className="text-center mb-4">
                <Badge className="bg-green-500 text-white px-4 py-2 text-sm">
                  ✨ {posts.length} Expert Articles Available
                </Badge>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search insights, trends, tutorials..."
                  className="pl-12 pr-4 h-14 bg-white/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-500 shadow-lg focus:shadow-xl transition-all duration-300"
                />
              </div>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              <div className="px-4">
                <div className="text-2xl font-bold text-purple-600">{posts.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-bold text-purple-600">25K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Readers</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FEATURED HERO POST ************************************************ */}
      {/* ------------------------------------------------------------------ */}
      {featuredPosts.length > 0 && (
        <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            {/* Main Featured Post */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white group"
            >
              <div className="absolute inset-0">
                <img
                  src={featuredPosts[0].coverImage || "/placeholder.svg?height=600&width=1200"}
                  alt={featuredPosts[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent"></div>
              </div>
              
              <div className="relative z-10 flex items-center min-h-[500px] lg:min-h-[600px]">
                <div className="p-8 lg:p-16 max-w-2xl">
                  <Badge className="mb-4 bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                    🔥 Featured Story
                  </Badge>
                  
                  <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                    <Link 
                      href={`/blog/${featuredPosts[0].slug}`}
                      className="hover:text-yellow-300 transition-colors duration-300"
                    >
                      {featuredPosts[0].title}
                    </Link>
                  </h2>
                  
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    {featuredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center text-white/80">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{new Date(featuredPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{featuredPosts[0].readTime || 8} min read</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">{featuredPosts[0].author || 'Cave Motions Team'}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${featuredPosts[0].slug}`}>
                    <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                      Read Full Story
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>

            {/* Secondary Featured Posts */}
            {featuredPosts.length > 1 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.slice(1, 4).map((post, idx) => (
                  <motion.article
                    key={post.slug}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={idx}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.coverImage || "/placeholder.svg?height=300&width=600"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${
                            idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-blue-500' : 'bg-green-500'
                          } text-white`}>
                            Featured
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <Badge className="mb-3 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <Clock className="h-3 w-3 ml-4 mr-1" />
                          <span>{post.readTime || 5} min</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FILTER BAR ******************************************************** */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Explore by Category</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover expert insights across different technology domains and business areas
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="lg"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300",
                  activeCategory === cat
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 hover:shadow-md transform hover:-translate-y-0.5",
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <Badge className="ml-2 bg-white/20 text-white text-xs">
                    {filtered.length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* GRID -------------------------------------------------------- */}
          {paginated.length > 0 ? (
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginated.map((post, i) => (
                <motion.article
                  key={post.slug}
                  variants={fadeInUpVariants}
                  custom={i}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl overflow-hidden border border-gray-100 bg-white shadow hover:shadow-lg transition-all"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={post.coverImage || "/placeholder.svg?height=300&width=400"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 text-xs">{post.category}</Badge>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3" /> {post.author || "Cave Motions"}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" /> {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-xs font-medium text-purple-600">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readTime || 5} min read
                        </span>
                        <span className="flex items-center text-xs font-medium text-purple-600 group-hover:text-purple-700">
                          Read
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("")
                  setActiveCategory("All")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* PAGINATION -------------------------------------------------- */}
          {filtered.length > postsPerPage && (
            <div className="flex justify-center mt-10 space-x-2">
              <Button
                size="icon"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                &larr;
              </Button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  className={page === currentPage ? "bg-purple-600" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                size="icon"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                &rarr;
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TRENDING ********************************************************* */}
      {/* ------------------------------------------------------------------ */}
      {trendingPosts.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold mb-10">
              <TrendingUp className="inline-block mr-2 h-5 w-5 text-red-500" />
              Trending now
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow hover:shadow-lg transition-all"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={post.coverImage || "/placeholder.svg?height=300&width=400"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">Trending</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.readTime || 5} min read</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}