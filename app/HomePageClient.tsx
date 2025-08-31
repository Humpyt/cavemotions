"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Play, Sparkles, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import ServiceCard from "@/components/service-card"
import ShaderBackground from "@/components/shader-background"
import { TestimonialsSimple } from "@/components/testimonials-simple"
import { motion } from "framer-motion" // Import motion

export default function HomePageClient() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-32 md:py-40 lg:py-48 min-h-screen">
          {/* Spline Background */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <iframe
              src='https://my.spline.design/retrofuturismbganimation-Lb3VtL1bNaYUnirKNzn0FvaW/'
              frameBorder='0'
              width='100%'
              height='100%'
              className="w-full h-full"
            />
          </div>

          <motion.div
            className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div variants={itemVariants} className="mb-6">
                <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                  <Sparkles className="mr-1 h-3 w-3" /> Redefining Digital Experiences
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl"
              >
                Where Creativity Meets <br className="hidden md:block" />
                <span className="relative">
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Intelligent Code
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400"></span>
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="mb-10 max-w-2xl text-lg text-white/70 md:text-xl">
                Cave Motions blends cutting-edge AI, creative design, and technical excellence to help forward-thinking
                businesses transform their digital presence.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-white text-black hover:bg-white/90"
                  asChild
                >
                  <Link href="/get-started">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-400 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden border-white/20 text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      <User className="mr-2 h-4 w-4" /> Contact Us
                    </span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-400 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                  </Link>
                </Button>
              </motion.div>

              {/* Floating stats */}
              <motion.div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8" variants={containerVariants}>
                {[
                  { value: "50+", label: "Clients Worldwide" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "120+", label: "Projects Completed" },
                  { value: "8+", label: "Years in Business" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                    variants={statVariants}
                  >
                    {/* Glassmorphism effect */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

                    {/* Border gradient */}
                    <div className="absolute inset-0 rounded-xl p-[1px]">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-6">
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm text-white/50">Scroll to explore</p>
              <div className="h-10 w-6 rounded-full border border-white/20 p-1">
                <div className="h-2 w-full rounded-full bg-white/50"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Brand Section */}
        <section className="bg-black py-10 overflow-hidden border-t border-white/10">
          <div className="py-4">
            <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
              <div className="flex flex-nowrap text-4xl font-bold tracking-tight text-white/10 animate-marquee">
                <span className="mr-4">
                  INNOVATION • EXCELLENCE • CREATIVITY • TECHNOLOGY • VISION • INNOVATION • EXCELLENCE • CREATIVITY •
                </span>
                <span className="mr-4">
                  INNOVATION • EXCELLENCE • CREATIVITY • TECHNOLOGY • VISION • INNOVATION • EXCELLENCE • CREATIVITY •
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-16 md:flex-row">
              <div className="md:w-1/2">
                <div className="relative h-full w-full">
                  {/* Main image */}
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="/images/cavemotionshome.jpeg"
                      alt="Cave Motions digital innovation studio team in Kampala Uganda - AI automation web development software development experts"
                      width={600}
                      height={500}
                      loading="lazy"
                      className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-xl bg-gray-100 p-4 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-black text-white">
                      <span className="text-3xl font-bold">10+</span>
                    </div>
                  </div>
                  <div className="absolute -right-6 -top-6 rounded-xl bg-black p-6 text-white shadow-lg">
                    <p className="text-sm font-medium">Years of Excellence</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 space-y-8">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
                    Our Story
                  </Badge>
                  <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                    Pioneering the Future of{" "}
                    <span className="relative">
                      <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                        Digital Innovation
                      </span>
                      <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-purple-400 to-violet-400"></span>
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Founded in Kampala, Cave Motions was built on the belief that technology should be both powerful and inspiring.
                    We've assembled a passionate team of world-class engineers, designers, and AI specialists to craft digital
                    solutions that drive growth. Our mission is to empower businesses with creative, future-ready innovations
                    that push boundaries and transform possibilities.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[
                    {
                      title: "Passionate Innovation",
                      description: "Our team's passion fuels breakthrough solutions that redefine what's possible in digital transformation.",
                    },
                    {
                      title: "World-Class Expertise",
                      description: "Engineers, designers, and AI specialists working together to craft exceptional digital experiences.",
                    },
                    {
                      title: "Growth-Driven Solutions",
                      description: "Every solution we create is designed to drive measurable business growth and success.",
                    },
                    {
                      title: "Future-Ready Technology",
                      description: "We build with tomorrow in mind, ensuring your solutions evolve with emerging technologies.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 hover:-translate-y-1"
                    >
                      <h3 className="mb-2 text-lg font-semibold group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <Button className="group bg-black text-white hover:bg-gray-800" asChild>
                    <Link href="/about">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative overflow-hidden bg-black py-24 md:py-32 text-white">
          {/* Shader Background */}
          <div className="absolute inset-0 z-0">
            <ShaderBackground />
          </div>

          <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8 z-10">
            <div className="mb-16 text-center">
              <Badge className="mb-4 bg-white/10 hover:bg-white/20 text-white" variant="outline">
                Services
              </Badge>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Our Digital Playground</h2>
              <p className="mx-auto max-w-2xl text-lg text-white/70">
                We combine technical expertise with creative vision to deliver exceptional digital experiences that
                drive business growth and user engagement.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                icon="Brain"
                title="AI Automation"
                description="Harness the power of artificial intelligence to streamline operations and unlock new possibilities."
                features={["Intelligent Chatbots", "Predictive Analytics", "Process Automation", "Custom AI Solutions"]}
                href="/services/ai-automation"
                gradient="from-purple-500 to-violet-600"
              />
              <ServiceCard
                icon="Code"
                title="Web Development"
                description="Create stunning, responsive websites and web applications that engage and convert."
                features={["Responsive Design", "Modern Frameworks", "Performance Optimization", "SEO Integration"]}
                href="/services/web-development"
                gradient="from-purple-500 to-violet-600"
              />
              <ServiceCard
                icon="PuzzlePiece"
                title="Software Development"
                description="Build custom software solutions tailored to your unique business requirements."
                features={["Custom Applications", "Enterprise Solutions", "System Integration", "Cloud Deployment"]}
                href="/services/software-development"
                gradient="from-purple-500 to-violet-600"
              />
              <ServiceCard
                icon="Smartphone"
                title="Mobile Applications"
                description="Develop intuitive mobile apps that provide exceptional user experiences across platforms."
                features={["iOS & Android", "Cross-Platform", "Native Performance", "App Store Optimization"]}
                href="/services/mobile-applications"
                gradient="from-purple-500 to-violet-600"
              />
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" className="group bg-white text-black hover:bg-white/90" asChild>
                <Link href="/services">
                  Explore All Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
                Portfolio
              </Badge>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Featured Work</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Explore our most innovative projects that have helped businesses transform their digital presence and
                achieve remarkable results.
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="mb-8 flex justify-center">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="web">Web</TabsTrigger>
                  <TabsTrigger value="software">Software</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Jarthaz Group Tours",
                      category: "Web Development",
                      image: "/images/jarthaz-tours.jpg",
                      color: "from-green-500 to-emerald-600",
                      href: "https://tours.jarthazgroup.com",
                    },
                    {
                      title: "Christ the King NTC",
                      category: "Web Development",
                      image: "/images/christ-the-king-ntc.jpg",
                      color: "from-blue-500 to-indigo-600",
                      href: "https://christthekingntc.ac.ug",
                    },
                    {
                      title: "WAIB - Innovation in Aquaculture",
                      category: "Web Development",
                      image: "/images/waib-aquaculture.png",
                      color: "from-blue-500 to-teal-600",
                      href: "https://waibug.com",
                    },
                    {
                      title: "Repair Pro",
                      category: "Software Development",
                      image: "/images/repair-pro-featured.jpeg",
                      color: "from-blue-500 to-indigo-600",
                      href: "/portfolio/projects/repair-pro",
                    },
                    {
                      title: "Cavmo Bulk SMS",
                      category: "Mobile Applications",
                      image: "/images/bulksms.jpg",
                      color: "from-indigo-500 to-purple-600",
                      href: "/portfolio/projects/cavmo-bulk-sms",
                    },
                    {
                      title: "Cavmo SACCO Management System",
                      category: "Software Development",
                      image: "/images/cavemo-sacco-featured.png",
                      color: "from-emerald-500 to-teal-600",
                      href: "/portfolio/projects/cavemo-sacco",
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/25 hover:border-purple-200 border border-transparent"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          width={400}
                          height={300}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600 transition-colors duration-300 group-hover:text-purple-700">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-purple-800">{project.title}</h3>
                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br transition-all duration-500 group-hover:scale-110 group-hover:opacity-30",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="web" className="mt-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Jarthaz Group Tours",
                      category: "Web Development",
                      image: "/images/jarthaz-tours.jpg",
                      color: "from-green-500 to-emerald-600",
                      href: "https://tours.jarthazgroup.com",
                    },
                    {
                      title: "Christ the King NTC",
                      category: "Web Development",
                      image: "/images/christ-the-king-ntc.jpg",
                      color: "from-blue-500 to-indigo-600",
                      href: "https://christthekingntc.ac.ug",
                    },
                    {
                      title: "WAIB - Innovation in Aquaculture",
                      category: "Web Development",
                      image: "/images/waib-aquaculture.png",
                      color: "from-blue-500 to-teal-600",
                      href: "https://waibug.com",
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/25 hover:border-purple-200 border border-transparent"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600 transition-colors duration-300 group-hover:text-purple-700">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-purple-800">{project.title}</h3>

                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br transition-all duration-500 group-hover:scale-110 group-hover:opacity-30",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="software" className="mt-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Repair Pro",
                      category: "Software Development",
                      image: "/images/repair-pro-featured.jpeg",
                      color: "from-blue-500 to-indigo-600",
                      href: "/portfolio/projects/repair-pro",
                    },
                    {
                      title: "Cavmo SACCO Management System",
                      category: "Software Development",
                      image: "/images/cavemo-sacco-featured.png",
                      color: "from-emerald-500 to-teal-600",
                      href: "/portfolio/projects/cavemo-sacco",
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/25 hover:border-purple-200 border border-transparent"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600 transition-colors duration-300 group-hover:text-purple-700">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-purple-800">{project.title}</h3>

                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br transition-all duration-500 group-hover:scale-110 group-hover:opacity-30",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Cavmo Bulk SMS",
                      category: "Mobile Applications",
                      image: "/images/bulksms.jpg",
                      color: "from-indigo-500 to-purple-600",
                      href: "/portfolio/projects/cavmo-bulk-sms",
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/25 hover:border-purple-200 border border-transparent"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.category} project by Cave Motions`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <p className="mb-1 text-sm font-medium text-purple-600 transition-colors duration-300 group-hover:text-purple-700">{project.category}</p>
                        <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-purple-800">{project.title}</h3>

                      </div>
                      <div
                        className={cn(
                          "absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br transition-all duration-500 group-hover:scale-110 group-hover:opacity-30",
                          project.color,
                          "opacity-20",
                        )}
                      ></div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16 text-center">
              <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50 bg-transparent" asChild>
                <Link href="/portfolio">
                  View All Projects
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSimple />

        {/* CTA Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-violet-700 p-8 md:p-16">
              {/* Background elements */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=30&width=30&text=+')] bg-[length:30px_30px] opacity-5"></div>

              <div className="relative flex flex-col items-center text-center">
                <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30" variant="outline">
                  Let's Collaborate
                </Badge>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  Ready to Transform Your Digital Presence?
                </h2>
                <p className="mb-10 max-w-2xl text-lg text-white/80">
                  Whether you're looking to launch a new product, optimize your operations with AI, or reimagine your
                  digital experience, we're here to help you succeed.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-white text-purple-700 hover:bg-white/90"
                    asChild
                  >
                    <Link href="/schedule-consultation">
                      <span className="relative z-10 flex items-center">
                        Schedule a Consultation
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-purple-100 to-purple-200 transition-all duration-300 group-hover:h-full"></span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden border-white/40 text-white hover:bg-white/10 bg-transparent"
                    asChild
                  >
                    <Link href="/get-started">
                      <span className="relative z-10">Get Started</span>
                      <span className="absolute inset-0 h-full w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Cave Motions",
            url: "https://cavemotions.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://cavemotions.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Digital Innovation Services",
            provider: {
              "@type": "Organization",
              name: "Cave Motions",
              url: "https://cavemotions.com",
            },
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Digital Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "AI Automation",
                  },
                  url: "https://cavemotions.com/services/ai-automation",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Web Development",
                  },
                  url: "https://cavemotions.com/services/web-development",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Software Development",
                  },
                  url: "https://cavemotions.com/services/software-development",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Mobile Applications",
                  },
                  url: "https://cavemotions.com/services/mobile-applications",
                },
              ],
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does Cave Motions offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cave Motions offers AI automation, web development, software development, mobile applications, and business intelligence solutions for businesses in Uganda and beyond."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Cave Motions located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cave Motions is located in Bugolobi, Kampala, Uganda. We serve clients locally and internationally."
                }
              },
              {
                "@type": "Question",
                "name": "How can I get started with Cave Motions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can get started by visiting our Get Started page, calling us at +256-787-022105, or emailing hello@cavemotions.com for a free consultation."
                }
              },
              {
                "@type": "Question",
                "name": "Does Cave Motions work with small businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Cave Motions works with businesses of all sizes, from startups and SMEs to large enterprises. We offer scalable solutions tailored to your budget and needs."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Cave Motions different from other agencies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cave Motions combines local market knowledge with cutting-edge technology. We specialize in AI automation, have deep understanding of the Ugandan market, and focus on delivering measurable results for our clients."
                }
              }
            ]
          }),
        }}
      />
    </>
  )
}
