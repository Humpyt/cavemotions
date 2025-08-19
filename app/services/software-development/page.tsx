"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  PuzzleIcon as PuzzlePiece,
  Sparkles,
  Database,
  Server,
  Shield,
  Workflow,
  ArrowUpRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import ThreeDimensionalCard from "@/components/three-dimensional-card"
import ParallaxText from "@/components/parallax-text"
import Link from "next/link"

export default function SoftwareDevelopmentPage() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
        delay: 0.1 * i,
        duration: 0.6,
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

  const features = [
    {
      icon: Database,
      title: "Custom Business Applications",
      description:
        "Develop tailored software solutions that address your specific business challenges and streamline operations.",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Server,
      title: "Enterprise Resource Planning",
      description:
        "Implement comprehensive ERP systems that integrate all aspects of your business into a unified platform.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Shield,
      title: "Secure & Scalable Solutions",
      description:
        "Build robust software with security at its core, designed to scale as your business grows and evolves.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description:
        "Automate repetitive tasks and complex workflows to increase efficiency and reduce operational costs.",
      color: "from-blue-500 to-cyan-600",
    },
  ]

  const caseStudies = [
    {
      title: "ERP Implementation",
      client: "Manufacturing Company",
      description:
        "Developed a custom ERP system that integrated production, inventory, and sales, increasing operational efficiency by 42%.",
      image: "/placeholder.svg?height=400&width=600&text=ERP System",
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Inventory Management System",
      client: "Retail Chain",
      description:
        "Created an automated inventory system that reduced stockouts by 78% and improved inventory accuracy to 99.8%.",
      image: "/placeholder.svg?height=400&width=600&text=Inventory System",
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Healthcare Management Platform",
      client: "Medical Group",
      description:
        "Built a secure healthcare platform that streamlined patient management and reduced administrative time by 65%.",
      image: "/placeholder.svg?height=400&width=600&text=Healthcare Platform",
      color: "from-blue-500 to-cyan-600",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-32 md:py-40">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-emerald-600/10"
                initial={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0.1 + Math.random() * 0.2,
                }}
                animate={{
                  x: `calc(${Math.random() * 100}vw - 50%)`,
                  y: `calc(${Math.random() * 100}vh - 50%)`,
                  opacity: [0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.2],
                }}
                transition={{
                  duration: 15 + Math.random() * 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50&text=+')] bg-[length:50px_50px] opacity-5"></div>

        <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                <Sparkles className="mr-1 h-3 w-3" /> Software Services
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Software Development
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Build custom software solutions that solve complex business challenges and scale with your organization.
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
            CUSTOM SOLUTIONS • ENTERPRISE SYSTEMS • CLOUD APPLICATIONS • ODOO ERP • BUSINESS INTELLIGENCE •
          </ParallaxText>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-green-100/50 blur-3xl opacity-30"></div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <ThreeDimensionalCard>
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="/placeholder.svg?height=400&width=500&text=Software Development"
                      alt="Software Development"
                      className="w-full transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-emerald-100 p-3 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-green-700 text-white">
                      <PuzzlePiece className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="absolute -right-6 -top-6 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 p-4 text-white shadow-lg">
                    <p className="text-sm font-medium">Enterprise-Grade</p>
                  </div>
                </div>
              </ThreeDimensionalCard>
            </motion.div>

            <div className="md:w-1/2 space-y-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0}
                variants={fadeInUpVariants}
              >
                <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
                  Custom Software for Complex Challenges
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r from-emerald-400 to-green-400"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </h2>
              </motion.div>

              <motion.p
                className="text-lg text-gray-600"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={1}
                variants={fadeInUpVariants}
              >
                At Cave Motions, we develop custom software solutions that address your unique business challenges and
                streamline your operations. Our team of experienced developers creates robust, scalable applications
                that grow with your business and adapt to changing requirements.
              </motion.p>

              <motion.p
                className="text-lg text-gray-600"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={2}
                variants={fadeInUpVariants}
              >
                From enterprise resource planning (ERP) systems to specialized business applications, we build software
                that enhances efficiency, improves decision-making, and drives business growth. Our solutions are
                designed with security, scalability, and user experience at their core.
              </motion.p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={3}
                variants={fadeInUpVariants}
              >
                <div className="flex flex-wrap gap-4 mt-8">
                  {[
                    "Odoo ERP",
                    "Custom Applications",
                    "Business Intelligence",
                    "Workflow Automation",
                    "Cloud Solutions",
                    "System Integration",
                  ].map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3 bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Capabilities
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Software Development Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our software development expertise can help you optimize operations and drive business
              growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-lg relative overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.color} opacity-20 animate-gradient-x`}
                  ></div>
                </div>

                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-8 w-8 text-gradient bg-gradient-to-br ${feature.color}`} />
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-emerald-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>

                <div className="flex items-center text-sm font-medium text-emerald-600">
                  <span className="mr-2">Learn more</span>
                  <motion.div
                    className="h-px bg-emerald-600"
                    animate={{ width: 12 }}
                    whileHover={{ width: 24 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                  <motion.div
                    animate={{ x: 0, opacity: 0 }}
                    whileHover={{ x: 5, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 -left-40 h-96 w-96 rounded-full bg-green-100/50 blur-3xl opacity-30"></div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4" variant="purple">
              Methodology
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Software Development Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a structured approach to software development that ensures quality, reliability, and alignment
              with your business goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Requirements Analysis",
                description:
                  "We work closely with you to understand your business processes, challenges, and objectives.",
              },
              {
                step: "02",
                title: "Design & Architecture",
                description:
                  "Our team designs a robust architecture and user interface that meets your specific requirements.",
              },
              {
                step: "03",
                title: "Development & Testing",
                description:
                  "We develop your software using agile methodologies and conduct thorough testing at each stage.",
              },
              {
                step: "04",
                title: "Deployment & Support",
                description:
                  "We deploy your solution and provide ongoing support and maintenance to ensure optimal performance.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {/* Connecting line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-200 to-transparent z-0"></div>
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore how our software development solutions have transformed businesses across industries.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                variants={fadeInUpVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <p className="mb-2 text-sm font-medium text-white/80">{study.client}</p>
                    <h3 className="mb-2 text-2xl font-bold">{study.title}</h3>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      View Case Study
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-1 text-sm font-medium text-emerald-600">{study.client}</p>
                  <h3 className="mb-2 text-xl font-bold">{study.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{study.description}</p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <div
                  className={`absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br ${study.color} opacity-20`}
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-green-100/50 blur-3xl opacity-30"></div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Our Stack
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies We Use</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We leverage the latest technologies and frameworks to build robust, scalable software solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Odoo", image: "/placeholder.svg?height=80&width=80&text=Odoo" },
              { name: "Python", image: "/placeholder.svg?height=80&width=80&text=Python" },
              { name: "Java", image: "/placeholder.svg?height=80&width=80&text=Java" },
              { name: "Node.js", image: "/placeholder.svg?height=80&width=80&text=Node.js" },
              { name: "PostgreSQL", image: "/placeholder.svg?height=80&width=80&text=PostgreSQL" },
              { name: "Docker", image: "/placeholder.svg?height=80&width=80&text=Docker" },
              { name: "AWS", image: "/placeholder.svg?height=80&width=80&text=AWS" },
              { name: "Azure", image: "/placeholder.svg?height=80&width=80&text=Azure" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex items-center justify-center">
                  <img src={tech.image || "/placeholder.svg"} alt={tech.name} className="h-16 w-16 object-contain" />
                </div>
                <p className="mt-4 text-center font-medium">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our software development services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How long does it take to develop custom software?",
                answer:
                  "The timeline varies depending on the complexity of the project. Simple applications might take 3-4 months, while more complex enterprise systems can take 6-12 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you provide ongoing maintenance and support?",
                answer:
                  "Yes, we offer various maintenance and support packages to ensure your software remains secure, up-to-date, and performing optimally. Our team can handle everything from regular updates to troubleshooting and technical support.",
              },
              {
                question: "Can you integrate with our existing systems?",
                answer:
                  "We specialize in system integration and can connect your new software with existing systems, databases, and third-party applications to create a seamless workflow across your organization.",
              },
              {
                question: "How do you ensure the security of our data?",
                answer:
                  "Security is a top priority in our development process. We implement industry best practices for secure coding, use encryption for sensitive data, perform regular security audits, and follow compliance requirements specific to your industry.",
              },
              {
                question: "Can you help with Odoo ERP implementation?",
                answer:
                  "Yes, we have extensive experience with Odoo ERP implementation and customization. We can help you set up, configure, and customize Odoo to meet your specific business requirements, as well as develop custom modules when needed.",
              },
              {
                question: "How do you handle changes in requirements during development?",
                answer:
                  "We follow agile development methodologies that accommodate changes throughout the development process. We work in sprints, regularly demonstrate progress, and gather feedback to ensure the final product meets your evolving needs.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <h3 className="text-xl font-semibold mb-4 text-emerald-800">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-600 mb-6">
              Have more questions about our software development services? We're here to help.
            </p>
            <Button className="group relative overflow-hidden bg-emerald-700 hover:bg-emerald-800">
              <span className="relative z-10 flex items-center">
                Contact Our Software Development Team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4 md:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-green-800"></div>

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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Business Operations?
            </h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8 text-white/80">
              Let's discuss how our custom software solutions can help you streamline processes, improve efficiency, and
              drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden bg-white text-emerald-900 hover:bg-white/90">
                <span className="relative z-10 flex items-center">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-emerald-100 to-green-100 transition-all duration-300 group-hover:h-full"></span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden border-white/40 text-white hover:bg-white/10"
              >
                <span className="relative z-10 flex items-center">
                  Explore Our Software Portfolio
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <span className="absolute inset-0 h-full w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
