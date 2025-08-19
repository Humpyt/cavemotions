"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Brain, Code, Smartphone, BarChart3, Zap, Palette } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import ParallaxText from "@/components/parallax-text"
import Link from "next/link"

export default function ServicesPageClient() {
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

  const services = [
    {
      icon: Brain,
      title: "AI Automation",
      description:
        "Harness the power of artificial intelligence to streamline operations and unlock new possibilities.",
      features: ["Intelligent Chatbots", "Predictive Analytics", "Process Automation", "Custom AI Solutions"],
      color: "from-purple-500 to-violet-600",
      href: "/services/ai-automation",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
      stats: { projects: "50+", efficiency: "85%" },
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Create stunning, high-performance websites that engage your audience and drive business growth.",
      features: ["Responsive Design", "Performance Optimization", "Custom Applications", "E-commerce Solutions"],
      color: "from-blue-500 to-cyan-600",
      href: "/services/web-development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      stats: { projects: "200+", performance: "98%" },
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Develop intuitive, high-performance mobile apps that deliver exceptional user experiences.",
      features: ["Native iOS & Android", "Cross-Platform", "Progressive Web Apps", "AR/VR Experiences"],
      color: "from-amber-500 to-orange-600",
      href: "/services/mobile-applications",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
      stats: { projects: "75+", rating: "4.9/5" },
    },
    {
      icon: BarChart3,
      title: "Software Development",
      description: "Build custom software solutions that solve complex business challenges and scale with growth.",
      features: ["Enterprise Systems", "Custom Applications", "System Integration", "Cloud Solutions"],
      color: "from-emerald-500 to-green-600",
      href: "/services/software-development",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      stats: { projects: "100+", uptime: "99.9%" },
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Boost your application performance with expert optimization techniques and best practices.",
      features: ["Speed Optimization", "Database Tuning", "Code Optimization", "Infrastructure Scaling"],
      color: "from-yellow-500 to-amber-600",
      href: "/services/performance-optimization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      stats: { improvement: "300%", clients: "150+" },
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Create exceptional user experiences with professional design that converts visitors into customers.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "from-pink-500 to-rose-600",
      href: "/services/ui-ux-design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
      stats: { designs: "300+", satisfaction: "96%" },
    },
  ]

  return (
    <div className="flex flex-col min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-32 md:py-40">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
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
                  opacity: [0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.3, 0.1 + Math.random() * 0.2],
                }}
                transition={{
                  duration: 20 + Math.random() * 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&crop=center"
            alt="Digital Services Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                <Sparkles className="mr-1 h-3 w-3" /> Premium Digital Services
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Digital Innovation Services
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform your business with our comprehensive suite of cutting-edge digital solutions designed to drive
              growth and innovation.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button size="lg" className="group relative overflow-hidden bg-white text-purple-900 hover:bg-white/90">
                <span className="relative z-10 flex items-center">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden border-white/40 text-white hover:bg-white/10 bg-transparent"
              >
                <span className="relative z-10">Schedule Consultation</span>
              </Button>
            </motion.div>
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
            <p className="mb-2 text-sm text-white/50">Discover our services</p>
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

      {/* Marquee Section */}
      <section className="bg-slate-900 py-10 overflow-hidden border-t border-white/10">
        <div className="py-4">
          <ParallaxText baseVelocity={-2}>
            AI AUTOMATION • WEB DEVELOPMENT • MOBILE APPS • SOFTWARE SOLUTIONS • UI/UX DESIGN • PERFORMANCE OPTIMIZATION
            •
          </ParallaxText>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl"></div>
          <div className="absolute bottom-20 -left-40 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Our Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From AI automation to mobile development, we offer end-to-end digital services that transform businesses
              and drive innovation.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={fadeInUpVariants}
                custom={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link href={service.href}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Service Icon */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                        >
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* Stats Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                          <p className="text-xs font-semibold text-gray-800">
                            {Object.values(service.stats)[0]} {Object.keys(service.stats)[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                      {/* Features */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 2).map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {service.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{service.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-700">
                          <span className="mr-2">Learn More</span>
                          <motion.div
                            className="h-px bg-purple-600"
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

                        {/* Additional stat */}
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            {Object.values(service.stats)[1]} {Object.keys(service.stats)[1]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`}></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center"
            alt="Technology Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/10 text-white" variant="outline">
              Why Cave Motions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Trusted by Industry Leaders</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              We combine cutting-edge technology with proven methodologies to deliver exceptional results that exceed
              expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "500+",
                label: "Projects Completed",
                description: "Successfully delivered across various industries",
              },
              {
                number: "98%",
                label: "Client Satisfaction",
                description: "Consistently exceeding client expectations",
              },
              {
                number: "24/7",
                label: "Support Available",
                description: "Round-the-clock technical assistance",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-xl font-semibold text-purple-300 mb-2">{stat.label}</p>
                  <p className="text-white/70">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4 md:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              initial={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
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
                opacity: [0.1 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, 0.1 + Math.random() * 0.3],
              }}
              transition={{
                duration: 15 + Math.random() * 25,
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Business?</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8 text-white/80">
              Let's discuss how our comprehensive digital services can help you achieve your business goals and drive
              innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden bg-white text-purple-900 hover:bg-white/90">
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden border-white/40 text-white hover:bg-white/10 bg-transparent"
              >
                <span className="relative z-10">View Our Portfolio</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
