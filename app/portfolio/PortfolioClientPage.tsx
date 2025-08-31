"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import ParallaxText from "@/components/parallax-text"
import Link from "next/link"
import { portfolioProjects } from "@/data/portfolio-projects" // Import centralized data

interface PortfolioClientPageProps {
  initialCategory?: string
}

export default function PortfolioClientPage({ initialCategory = "all" }: PortfolioClientPageProps) {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(initialCategory) // Use initialCategory

  // Use the imported portfolioProjects
  const projects = portfolioProjects

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
      },
    }),
  }

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const filteredProjects =
    activeTab === "all" ? projects : projects.filter((project) => project.tags.includes(activeTab))

  return (
    <>
      <div className="flex flex-col min-h-screen" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-32 md:py-40">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
            src="/Digital Services Background.svg"
            alt="Digital Services Background"
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-violet-800/70 to-purple-900/80" />
          </div>

          <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                  <Sparkles className="mr-1 h-3 w-3" /> Our Portfolio
                </Badge>
              </motion.div>

              <motion.h1
                className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our Work, Your Success
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We're proud of the digital adventures we've embarked on with businesses across Kampala and beyond.
              </motion.p>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm text-white/50">Scroll to explore</p>
              <motion.div
                className="h-10 w-6 rounded-full border border-white/20 p-1"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <motion.div
                  className="h-2 w-full rounded-full bg-white/50"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                ></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Marquee Brand Section */}
        <section className="bg-black py-10 overflow-hidden border-t border-white/10">
          <div className="py-4">
            <ParallaxText baseVelocity={-2}>
              INNOVATION • EXCELLENCE • CREATIVITY • TECHNOLOGY • VISION • INNOVATION • EXCELLENCE • CREATIVITY •
            </ParallaxText>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-100/50 blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl opacity-30"></div>

          {/* Animated background grid */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            ></div>
          </div>

          <div className="container relative mx-auto max-w-6xl">
            <Tabs defaultValue={initialCategory} className="w-full" onValueChange={handleTabChange}>
              <motion.div
                className="mb-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <TabsList className="bg-gray-100 p-1">
                  <TabsTrigger value="all" className="rounded-md px-6 py-2 data-[state=active]:bg-white">
                    All Projects
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="rounded-md px-6 py-2 data-[state=active]:bg-white">
                    AI Solutions
                  </TabsTrigger>
                  <TabsTrigger value="web" className="rounded-md px-6 py-2 data-[state=active]:bg-white">
                    Web
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="rounded-md px-6 py-2 data-[state=active]:bg-white">
                    Mobile
                  </TabsTrigger>
                  <TabsTrigger value="software" className="rounded-md px-6 py-2 data-[state=active]:bg-white">
                    Software
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="all" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
                      variants={fadeInUpVariants}
                      custom={index}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        {project.slug ? (
                          <Link
                            href={`/portfolio/projects/${project.slug}`}
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        ) : (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="ai" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
                      variants={fadeInUpVariants}
                      custom={index}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        {project.slug ? (
                          <Link
                            href={`/portfolio/projects/${project.slug}`}
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        ) : (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="web" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
                      variants={fadeInUpVariants}
                      custom={index}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        {project.slug ? (
                          <Link
                            href={`/portfolio/projects/${project.slug}`}
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        ) : (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
                      variants={fadeInUpVariants}
                      custom={index}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        {project.slug ? (
                          <Link
                            href={`/portfolio/projects/${project.slug}`}
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        ) : (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="software" className="mt-0">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
                      variants={fadeInUpVariants}
                      custom={index}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        {project.slug ? (
                          <Link
                            href={`/portfolio/projects/${project.slug}`}
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        ) : (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        )}
                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

            </Tabs>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden border-gray-300 hover:border-purple-300 hover:bg-gray-50 bg-transparent"
                >
                  <span className="relative z-10 flex items-center">
                    View All Projects
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  </span>
                  <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-purple-50 to-violet-50 transition-all duration-300 group-hover:h-full"></span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-24 md:py-32 px-4 md:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-violet-800"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                initial={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0.1 + Math.random() * 0.3,
                }}
                animate={{
                  y: [
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                  ],
                  x: [
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                    `calc(${Math.random() * 100}% - 10px)`,
                  ],
                  opacity: [0.1 + Math.random() * 0.3, 0.3 + Math.random() * 0.4, 0.1 + Math.random() * 0.3],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="container relative mx-auto max-w-6xl">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Own Success Story?</h2>
              <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8 text-white/80">
                Let's create something amazing together. Contact us to discuss your project ideas.
              </p>
              <Button size="lg" className="group relative overflow-hidden bg-white text-purple-900 hover:bg-white/90">
                <span className="relative z-10 flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-purple-100 to-purple-200 transition-all duration-300 group-hover:h-full"></span>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
