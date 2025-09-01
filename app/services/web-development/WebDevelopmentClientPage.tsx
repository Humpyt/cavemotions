"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Sparkles, Globe, Smartphone, Zap, Layers, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import ThreeDimensionalCard from "@/components/three-dimensional-card"
import ParallaxText from "@/components/parallax-text"
import Breadcrumb, { BreadcrumbSchema } from "@/components/breadcrumb"
import Link from "next/link"

export default function WebDevelopmentClientPage() {
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
      icon: Globe,
      title: "Responsive Web Design",
      description:
        "Create websites that look and function beautifully across all devices, from desktops to smartphones and tablets.",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Build lightning-fast websites with optimized code, efficient loading times, and smooth user experiences.",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Layers,
      title: "Custom Web Applications",
      description:
        "Develop tailored web applications with complex functionality to meet your specific business requirements.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Smartphone,
      title: "Progressive Web Apps",
      description:
        "Create web applications that offer native-like experiences with offline capabilities and app-like interfaces.",
      color: "from-purple-500 to-violet-600",
    },
  ]

  // Real projects from portfolio - Web Development category
  const caseStudies = [
    {
      title: "Jarthaz Group Tours",
      client: "Adventure Tourism Company",
      description:
        "Adventure tourism website specializing in gorilla trekking and wildlife experiences across Uganda, featuring immersive booking systems and destination showcases.",
      image: "/images/jarthaz-tours.jpg",
      color: "from-green-500 to-emerald-600",
      liveUrl: "https://tours.jarthazgroup.com",
      tags: ["Tourism", "Booking System", "Responsive Design"]
    },
    {
      title: "AJYXN Real Estate",
      client: "Real Estate Platform",
      description:
        "Modern real estate platform with advanced property search, virtual tours, and seamless user experience for finding dream homes.",
      image: "/images/ajyxn-website.jpg",
      color: "from-emerald-500 to-teal-600",
      liveUrl: "https://ajyxn.com",
      tags: ["Real Estate", "Property Search", "Virtual Tours"]
    },
    {
      title: "WAIB - Innovation in Aquaculture",
      client: "Aquaculture Bureau",
      description:
        "Professional website showcasing sustainable aquaculture practices and modern techniques with 5+ years of experience in sustainable fish farming.",
      image: "/images/waib-aquaculture.png",
      color: "from-purple-500 to-violet-600",
      liveUrl: "https://waibug.com",
      tags: ["Aquaculture", "Sustainability", "Professional Services"]
    },
  ]

  const breadcrumbItems = [
    { label: "Services", href: "/services" },
    { label: "Web Development" }
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { label: "Services", href: "/services" },
        { label: "Web Development", href: "/services/web-development" }
      ]} />

      <div className="flex flex-col min-h-screen" ref={containerRef}>
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
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

        <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8 z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                <Sparkles className="mr-1 h-3 w-3" /> Web Services
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Web Development
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Create stunning, high-performance websites and web applications that engage your audience and drive
              business growth.
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
            RESPONSIVE DESIGN • PERFORMANCE • USER EXPERIENCE • ACCESSIBILITY • MODERN FRAMEWORKS •
          </ParallaxText>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-black/50 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-black/50 blur-3xl opacity-30"></div>

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
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Pixel Perfect Web Development - Clean Code on Multiple Screens"
                      className="w-full transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-gray-100 p-3 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-black text-white">
                      <Code className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="absolute -right-6 -top-6 rounded-xl bg-black p-4 text-white shadow-lg">
                    <p className="text-sm font-medium">Pixel Perfect</p>
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
                  Crafting Digital Experiences That Inspire
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 w-0 bg-black"
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
                At Cave Motions, we create websites and web applications that combine stunning design with powerful
                functionality. Our web development team crafts digital experiences that not only look beautiful but also
                drive results for your business.
              </motion.p>

              <motion.p
                className="text-lg text-gray-600"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={2}
                variants={fadeInUpVariants}
              >
                From responsive websites to complex web applications, we leverage the latest technologies and best
                practices to deliver solutions that exceed expectations and help you achieve your business goals.
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
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "Tailwind CSS",
                    "Responsive Design",
                    "SEO Optimization",
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
                "linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Web Development Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our web development expertise can help you create a powerful online presence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-gray-700" />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-black/50 blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 -left-40 h-96 w-96 rounded-full bg-black/50 blur-3xl opacity-30"></div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gray-100 text-gray-800 hover:bg-gray-200" variant="secondary">
              Methodology
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Web Development Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a structured approach to web development that ensures quality, performance, and alignment with
              your business goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description:
                  "We begin by understanding your business goals, target audience, and requirements to create a strategic plan.",
              },
              {
                step: "02",
                title: "Design & Prototyping",
                description:
                  "Our designers create wireframes and visual designs that align with your brand and provide optimal user experiences.",
              },
              {
                step: "03",
                title: "Development",
                description:
                  "Our developers build your website or application using clean, efficient code and the latest technologies.",
              },
              {
                step: "04",
                title: "Testing & Launch",
                description:
                  "We thoroughly test your website across devices and browsers before launching it to the world.",
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
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{process.title}</h3>
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
                "linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
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
              Explore how our web development solutions have transformed businesses across industries.
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
                className="relative overflow-hidden rounded-2xl bg-white shadow-lg"
                variants={fadeInUpVariants}
                custom={index}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-1 text-sm font-medium text-blue-600">{study.client}</p>
                  <h3 className="mb-2 text-xl font-bold">{study.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{study.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br ${study.color} opacity-20`}
                ></div>
              </motion.div>
            ))}
          </motion.div>
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
                "linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
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
              Get answers to common questions about our web development services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How long does it take to build a website?",
                answer:
                  "The timeline varies depending on the complexity of the project. A simple website might take 4-6 weeks, while more complex web applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you provide ongoing maintenance and support?",
                answer:
                  "Yes, we offer various maintenance and support packages to ensure your website remains secure, up-to-date, and performing optimally. Our team can handle everything from regular updates to content management and technical support.",
              },
              {
                question: "Will my website be mobile-friendly?",
                answer:
                  "All our websites are built with a mobile-first approach, ensuring they look and function beautifully across all devices, from smartphones and tablets to desktop computers.",
              },
              {
                question: "Can you help with SEO for my website?",
                answer:
                  "Yes, we implement SEO best practices during the development process to ensure your website is optimized for search engines. We also offer additional SEO services to help improve your search rankings and drive more organic traffic.",
              },
              {
                question: "What content management system (CMS) do you use?",
                answer:
                  "We work with various CMS platforms depending on your specific needs. For custom web applications, we often build tailored admin interfaces. We're experienced with WordPress, Contentful, Sanity, and headless CMS solutions.",
              },
              {
                question: "How do you ensure website security?",
                answer:
                  "Security is a top priority in our development process. We implement industry best practices for secure coding, use HTTPS encryption, perform regular security audits, and keep all software and dependencies up-to-date to protect against vulnerabilities.",
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
                <h3 className="text-xl font-semibold mb-4 text-black">{faq.question}</h3>
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
              Have more questions about our web development services? We're here to help.
            </p>
            <Button className="group relative overflow-hidden bg-black hover:bg-gray-800" asChild>
              <Link href="/contact">
                <span className="relative z-10 flex items-center">
                  Contact Our Web Development Team
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>
            </Button>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Build Your Digital Presence?</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8 text-white/80">
              Let's discuss how our web development expertise can help you create a stunning website that drives results
              for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden bg-white text-purple-900 hover:bg-white/90">
                <span className="relative z-10 flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-purple-100 to-violet-100 transition-all duration-300 group-hover:h-full"></span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden border-white/40 text-black"
              >
                <span className="relative z-10 flex items-center">
                  View Our Web Portfolio
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  )
}
