"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Sparkles, BarChart, Bot, Zap, Lightbulb, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import ThreeDimensionalCard from "@/components/three-dimensional-card"
import ParallaxText from "@/components/parallax-text"
import Link from "next/link"

export default function AIAutomationClientPage() {
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
      icon: Bot,
      title: "Intelligent Chatbots",
      description:
        "Deploy AI-powered chatbots that understand natural language, learn from interactions, and provide personalized responses to your customers.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: BarChart,
      title: "Predictive Analytics",
      description:
        "Leverage machine learning algorithms to analyze historical data, identify patterns, and forecast future trends with remarkable accuracy.",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Zap,
      title: "Process Automation",
      description:
        "Streamline repetitive tasks and workflows with intelligent automation that adapts to changing conditions and improves over time.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Lightbulb,
      title: "Custom AI Solutions",
      description:
        "Develop bespoke AI models tailored to your specific business challenges, from computer vision to natural language processing.",
      color: "from-amber-500 to-orange-600",
    },
  ]

  const caseStudies = [
    {
      title: "Financial Forecasting System",
      client: "Global Investment Firm",
      description:
        "Developed a predictive analytics platform that increased forecast accuracy by 37% and reduced analysis time by 78%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Customer Service AI Assistant",
      client: "E-commerce Retailer",
      description:
        "Implemented an AI chatbot that handles 65% of customer inquiries automatically, improving response time by 92%.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Intelligent Document Processing",
      client: "Legal Services Provider",
      description:
        "Created an AI system that extracts, categorizes, and analyzes legal documents, reducing processing time by 83%.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-500 to-indigo-600",
    },
  ]

  return (
    <>
      <div className="flex flex-col min-h-screen" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-16 md:py-20 min-h-[50vh]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
            src="/Digital Services Background.svg"
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
                  <Sparkles className="mr-1 h-3 w-3" /> AI Services
                </Badge>
              </motion.div>

              <motion.h1
                className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                AI Automation
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Harness the power of artificial intelligence to streamline operations, enhance decision-making, and
                unlock new possibilities for your business.
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
              MACHINE LEARNING • NEURAL NETWORKS • PREDICTIVE ANALYTICS • NATURAL LANGUAGE PROCESSING • COMPUTER VISION
              •
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
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="AI Automation and Machine Learning - Future-Ready Intelligent Business Solutions"
                        className="w-full transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-gray-100 p-3 shadow-lg">
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-black text-white">
                        <Brain className="h-10 w-10" />
                      </div>
                    </div>
                    <div className="absolute -right-6 -top-6 rounded-xl bg-black p-4 text-white shadow-lg">
                      <p className="text-sm font-medium">Future-Ready</p>
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
                    Intelligent Solutions for Modern Businesses
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
                  At Cave Motions, we leverage cutting-edge artificial intelligence and machine learning technologies to
                  create intelligent automation solutions that transform how businesses operate. Our AI systems learn,
                  adapt, and improve over time, providing increasingly valuable insights and efficiencies.
                </motion.p>

                <motion.p
                  className="text-lg text-gray-600"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={2}
                  variants={fadeInUpVariants}
                >
                  Whether you're looking to automate repetitive tasks, gain predictive insights from your data, or
                  create intelligent interfaces for your customers, our AI automation services provide the expertise and
                  technology you need to succeed.
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
                      "Machine Learning",
                      "Neural Networks",
                      "Natural Language Processing",
                      "Computer Vision",
                      "Predictive Analytics",
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
                  "linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px)",
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Automation Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how our AI automation services can transform your business operations and drive innovation.
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

                  <h3 className="text-xl font-semibold mb-4">
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
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
                Methodology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Development Process</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We follow a structured approach to developing AI solutions that ensures quality, accuracy, and alignment
                with your business goals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Analysis",
                  description:
                    "We begin by understanding your business challenges, data landscape, and objectives to identify the right AI approach.",
                },
                {
                  step: "02",
                  title: "Data Preparation",
                  description:
                    "We collect, clean, and structure your data to ensure it's ready for AI model training and development.",
                },
                {
                  step: "03",
                  title: "Model Development",
                  description:
                    "Our data scientists build and train custom AI models tailored to your specific business requirements.",
                },
                {
                  step: "04",
                  title: "Deployment & Optimization",
                  description:
                    "We implement the solution in your environment and continuously monitor and improve its performance.",
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
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 z-0"></div>
                  )}

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold mb-6">
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
                  "linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px)",
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
                Explore how our AI automation solutions have transformed businesses across industries.
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
                    <p className="mb-1 text-sm font-medium text-purple-600">{study.client}</p>
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

        {/* FAQ Section */}
        <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-black/50 blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-black/50 blur-3xl opacity-30"></div>

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
                Get answers to common questions about our AI automation services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "What types of businesses can benefit from AI automation?",
                  answer:
                    "Businesses of all sizes and across industries can benefit from AI automation. Whether you're looking to streamline operations, gain insights from data, or enhance customer experiences, AI can provide valuable solutions tailored to your specific needs.",
                },
                {
                  question: "Do I need a large amount of data to implement AI solutions?",
                  answer:
                    "While having more data can improve AI model accuracy, we can work with various data volumes. Our team can help you identify the right approach based on your available data and implement strategies to collect more if needed.",
                },
                {
                  question: "How long does it take to develop and implement an AI solution?",
                  answer:
                    "The timeline varies depending on the complexity of the solution and your specific requirements. Simple automation projects might take a few weeks, while more complex AI systems could take several months. We'll provide a detailed timeline during our initial consultation.",
                },
                {
                  question: "How do you ensure the security and privacy of our data?",
                  answer:
                    "Data security and privacy are our top priorities. We implement robust security measures, follow industry best practices, and comply with relevant regulations to ensure your data is protected throughout the development and deployment process.",
                },
                {
                  question: "Can AI automation integrate with our existing systems?",
                  answer:
                    "Yes, our AI solutions are designed to integrate seamlessly with your existing systems and workflows. We'll work closely with your team to ensure smooth integration and minimal disruption to your operations.",
                },
                {
                  question: "How do you measure the success of an AI automation project?",
                  answer:
                    "We establish clear KPIs and success metrics at the beginning of each project, aligned with your business objectives. These might include efficiency gains, cost savings, accuracy improvements, or other relevant metrics specific to your goals.",
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
                Have more questions about our AI automation services? We're here to help.
              </p>
              <Button className="group relative overflow-hidden bg-black hover:bg-gray-800" asChild>
                <Link href="/contact">
                  <span className="relative z-10 flex items-center">
                    Contact Our AI Specialists
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
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
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
                Ready to Transform Your Business with AI?
              </h2>
              <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8 text-white/80">
                Let's discuss how our AI automation solutions can help you streamline operations, gain valuable
                insights, and drive innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group relative overflow-hidden bg-white text-purple-900 hover:bg-white/90">
                  <span className="relative z-10 flex items-center">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-purple-100 to-purple-200 transition-all duration-300 group-hover:h-full"></span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden border-white/40 text-white hover:bg-white/10"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Our AI Portfolio
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  <span className="absolute inset-0 h-full w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
