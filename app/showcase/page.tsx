"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  Code,
  Layers,
  Smartphone,
  Cpu,
  ChevronRight,
  ChevronLeft,
  Play,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// Project data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A fully responsive e-commerce platform with integrated payment processing and inventory management.",
    longDescription:
      "This comprehensive e-commerce solution features a responsive design, secure payment processing, inventory management, customer accounts, and detailed analytics. Built with Next.js and integrated with Stripe for payments.",
    image: "/placeholder.svg?height=600&width=800&text=E-commerce+Platform",
    color: "from-blue-500 to-cyan-600",
    tags: ["Next.js", "React", "Stripe", "MongoDB"],
    link: "#",
  },
  {
    id: 2,
    title: "AI Customer Service Bot",
    category: "AI Automation",
    description: "An intelligent chatbot that handles customer inquiries and routes complex issues to human agents.",
    longDescription:
      "This AI-powered customer service solution uses natural language processing to understand customer inquiries, provide instant responses, and seamlessly escalate complex issues to human agents when necessary.",
    image: "/placeholder.svg?height=600&width=800&text=AI+Chatbot",
    color: "from-purple-500 to-violet-600",
    tags: ["Machine Learning", "NLP", "Python", "React"],
    link: "#",
  },
  {
    id: 3,
    title: "Inventory Management System",
    category: "Software Development",
    description: "Custom Odoo-based inventory management system for a manufacturing company.",
    longDescription:
      "A tailored Odoo implementation that streamlines inventory tracking, purchase orders, and manufacturing processes. Includes custom modules for specialized industry requirements and reporting dashboards.",
    image: "/placeholder.svg?height=600&width=800&text=Inventory+System",
    color: "from-emerald-500 to-green-600",
    tags: ["Odoo", "Python", "PostgreSQL", "Docker"],
    link: "#",
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    category: "Mobile Applications",
    description: "Cross-platform mobile application for tracking workouts, nutrition, and health metrics.",
    longDescription:
      "This comprehensive fitness companion helps users track workouts, monitor nutrition, analyze health metrics, and set personalized goals. Features include workout plans, progress visualization, and social sharing.",
    image: "/placeholder.svg?height=600&width=800&text=Fitness+App",
    color: "from-amber-500 to-orange-600",
    tags: ["React Native", "Firebase", "Redux", "HealthKit"],
    link: "#",
  },
  {
    id: 5,
    title: "Real Estate Marketplace",
    category: "Web Development",
    description: "A platform connecting property buyers, sellers, and agents with advanced search capabilities.",
    longDescription:
      "This comprehensive real estate platform features property listings, advanced search filters, virtual tours, agent profiles, and secure messaging. Includes an admin dashboard for property management.",
    image: "/placeholder.svg?height=600&width=800&text=Real+Estate+Platform",
    color: "from-blue-500 to-cyan-600",
    tags: ["React", "Node.js", "MongoDB", "Google Maps API"],
    link: "#",
  },
  {
    id: 6,
    title: "Predictive Maintenance Solution",
    category: "AI Automation",
    description: "AI system that predicts equipment failures before they happen, saving maintenance costs.",
    longDescription:
      "This industrial IoT solution uses machine learning algorithms to analyze sensor data and predict potential equipment failures before they occur, enabling proactive maintenance and reducing costly downtime.",
    image: "/placeholder.svg?height=600&width=800&text=Predictive+Maintenance",
    color: "from-purple-500 to-violet-600",
    tags: ["TensorFlow", "IoT", "Python", "Time Series Analysis"],
    link: "#",
  },
]

export default function PortfolioShowcase() {
  const [activeProject, setActiveProject] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.8])

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Particle animation component
  const Particles = ({ count = 40 }: { count?: number }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            initial={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.1 + Math.random() * 0.3,
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
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
    )
  }

  return (
    <div className="flex flex-col min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ opacity, scale }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/50 to-black"></div>

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50&text=+')] bg-[length:50px_50px] opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        <Particles />

        <div className="container relative mx-auto px-4 z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
              <Sparkles className="mr-1 h-3 w-3" /> Creative Portfolio
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Creative
            </span>{" "}
            Work
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our portfolio of innovative digital solutions that drive business growth
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-white/90 rounded-full px-8"
              onClick={() => {
                if (containerRef.current) {
                  const nextSection = containerRef.current.querySelector("#showcase-section")
                  nextSection?.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Explore Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1.5, duration: 1 },
              y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
            }}
          >
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm text-white/50">Scroll to explore</p>
              <div className="h-10 w-6 rounded-full border border-white/20 p-1">
                <motion.div
                  className="h-2 w-full rounded-full bg-white/50"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Showcase Section */}
      <section id="showcase-section" className="py-20 md:py-32 relative bg-gradient-to-b from-black to-purple-950">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              Featured <span className="text-purple-400">Projects</span>
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-purple-400 to-violet-500 mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our most impactful work across various industries and technologies
            </motion.p>
          </div>

          {/* Interactive Project Showcase */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                className="relative"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Project Image */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative group">
                      <img
                        src={projects[activeProject].image || "/placeholder.svg"}
                        alt={projects[activeProject].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                        <div className="p-6 w-full">
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-white/30 text-white hover:bg-white/10 rounded-full"
                          >
                            View Project
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Play button overlay */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Project Details */}
                  <motion.div
                    className="text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="space-y-6">
                      <Badge className={cn("bg-gradient-to-r", projects[activeProject].color, "text-white border-0")}>
                        {projects[activeProject].category}
                      </Badge>

                      <h3 className="text-3xl md:text-4xl font-bold">{projects[activeProject].title}</h3>

                      <p className="text-lg text-white/80">{projects[activeProject].longDescription}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {projects[activeProject].tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-white/20 text-white/80">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Button
                          className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 rounded-full px-8"
                          size="lg"
                        >
                          View Case Study
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 w-12"
                onClick={prevProject}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous project</span>
              </Button>

              <div className="flex items-center space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === activeProject ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50",
                    )}
                    onClick={() => setActiveProject(index)}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 w-12"
                onClick={nextProject}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next project</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Background elements */}
        <Particles count={30} />

        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 relative bg-gradient-to-b from-purple-950 to-black">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our <span className="text-purple-400">Expertise</span>
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-purple-400 to-violet-500 mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We specialize in a range of digital services to help businesses thrive in the digital landscape
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Web Development",
                description: "Custom websites and web applications built with modern technologies",
                color: "from-blue-500 to-cyan-600",
              },
              {
                icon: Smartphone,
                title: "Mobile Applications",
                description: "Native and cross-platform mobile apps for iOS and Android",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Cpu,
                title: "AI Automation",
                description: "Intelligent solutions powered by machine learning and AI",
                color: "from-purple-500 to-violet-600",
              },
              {
                icon: Layers,
                title: "Software Development",
                description: "Custom software solutions tailored to your business needs",
                color: "from-emerald-500 to-green-600",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                <div className="relative z-10">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br",
                      service.color,
                    )}
                  >
                    <service.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-white/70">{service.description}</p>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link
                      href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-white group-hover:text-purple-400 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Background gradient */}
                <div
                  className={cn(
                    "absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-br opacity-20 transition-opacity duration-300 group-hover:opacity-30",
                    service.color,
                  )}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background elements */}
        <Particles count={20} />
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-violet-800"></div>

        {/* Animated particles */}
        <Particles count={30} />

        <div className="container relative mx-auto max-w-6xl px-4 z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Start Your Project?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10 text-white/80">
              Let's create something amazing together. Contact us to discuss your project ideas.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90 rounded-full px-8 group">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
