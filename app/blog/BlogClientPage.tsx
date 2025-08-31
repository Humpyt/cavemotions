"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Search, Sparkles, TrendingUp, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { blogPosts } from "@/data/blog-posts"

// -----------------------------------------------------------------------------
// Types & helpers
// -----------------------------------------------------------------------------

type BlogPost = (typeof blogPosts)[number]

// Fall back to an empty array if the import goes wrong for any reason
const posts: BlogPost[] = Array.isArray(blogPosts) ? blogPosts : []

// All unique categories (plus “All”)
const categories = ["All", ...new Set(posts.map((p) => p.category))]

// A couple of simple helper slices – adapt to your own logic later on
const featuredPosts = posts.slice(0, 3)
const trendingPosts = posts.slice(0, 4)

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
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

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

  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col min-h-screen">
      {/* ------------------------------------------------------------------ */}
      {/* HERO ************************************************************* */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-black py-16 md:py-20 min-h-[50vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Digital Services Background.jpg"
            alt="Digital Services Background"
            className="w-full h-full object-cover"
          />
          {/* Purple tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-violet-800/70 to-purple-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-6 bg-white/10 text-white">
              <Sparkles className="mr-1 h-3 w-3" /> Digital Innovation Insights
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-6"
          >
            Insights & Innovation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-8"
          >
            Explore trends, best practices, and expert commentary on AI, web development, and digital transformation.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto max-w-md"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-purple-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FEATURED ********************************************************** */}
      {/* ------------------------------------------------------------------ */}
      {featuredPosts.length > 0 && (
        <section className="bg-gradient-to-b from-black to-gray-900 py-16 md:py-24 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                custom={idx}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl relative"
              >
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.coverImage || "/placeholder.svg?height=300&width=600"}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2 bg-purple-600">{post.category}</Badge>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FILTER BAR ******************************************************** */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  activeCategory === cat
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "hover:bg-purple-50 hover:text-purple-700",
                )}
              >
                {cat}
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
                          <User className="mr-1 h-3 w-3" /> {post.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" /> {post.date}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-xs font-medium text-purple-600">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readTime}
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
            <p className="text-center text-gray-500">No articles found.</p>
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
                        <span>{post.readTime}</span>
                        <span>{post.date}</span>
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
