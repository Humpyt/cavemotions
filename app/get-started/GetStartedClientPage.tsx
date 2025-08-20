"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import {
  Badge,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import {
  ArrowRight,
  Brain,
  Code,
  Smartphone,
  Zap,
  Check,
  Phone,
  Sparkles,
  Rocket,
  Users,
  Clock,
  DollarSign,
  MessageSquare,
  Star,
  ChevronRight,
  PlayCircle,
  Calendar,
  Target,
  TrendingUp,
  Shield,
  Award,
  Lightbulb,
  Globe,
  Database,
  Palette,
  ExternalLink,
  Play,
  CheckCircle,
  Mail,
  MapPin,
  Headphones,
  FileText,
  Briefcase,
  Layers,
  Cpu
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"

export default function GetStartedClientPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    industry: "",
    contactMethod: "",
  })

  // Track scroll position for effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Animation variants matching home page style
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

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

  // Step wizard data
  const steps = [
    { id: 0, title: "Service Selection", icon: Target, description: "Choose your service" },
    { id: 1, title: "Project Details", icon: MessageSquare, description: "Tell us about your project" },
    { id: 2, title: "Contact Information", icon: Users, description: "How can we reach you?" },
    { id: 3, title: "Timeline & Budget", icon: Calendar, description: "Project scope & timing" },
  ]

  // Enhanced services data matching home page
  const services = [
    {
      id: "ai-automation",
      title: "AI Automation",
      description: "Intelligent chatbots, process automation, and AI-powered solutions that transform your business operations",
      icon: "Brain",
      gradient: "from-purple-500 to-pink-500",
      features: ["Intelligent Chatbots", "Process Automation", "Predictive Analytics", "Custom AI Solutions", "Machine Learning", "Natural Language Processing"],
      href: "/services/ai-automation"
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies",
      icon: "Code",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Responsive Design", "E-commerce Solutions", "CMS Development", "Performance Optimization", "SEO Integration", "Progressive Web Apps"],
      href: "/services/web-development"
    },
    {
      id: "mobile-apps",
      title: "Mobile Applications",
      description: "Native and cross-platform mobile app development for iOS and Android",
      icon: "Smartphone",
      gradient: "from-amber-500 to-orange-500",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization", "Push Notifications", "Offline Functionality", "Real-time Features"],
      href: "/services/mobile-applications"
    },
    {
      id: "software-development",
      title: "Software Development",
      description: "Custom software solutions and enterprise systems tailored to your business needs",
      icon: "Code",
      gradient: "from-emerald-500 to-green-500",
      features: ["Enterprise Systems", "API Development", "Database Design", "Cloud Solutions", "Microservices", "DevOps Integration"],
      href: "/services/software-development"
    }
  ]

  // Additional data for enhanced functionality
  const industries = [
    "Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing",
    "Real Estate", "Transportation", "Entertainment", "Non-profit", "Government", "Other"
  ]

  const budgetRanges = [
    { value: "5k-15k", label: "$5K - $15K", description: "Small project - Perfect for MVPs and simple solutions" },
    { value: "15k-50k", label: "$15K - $50K", description: "Medium project - Comprehensive solutions with advanced features" },
    { value: "50k-100k", label: "$50K - $100K", description: "Large project - Enterprise-grade solutions" },
    { value: "100k+", label: "$100K+", description: "Enterprise project - Complex, multi-phase implementations" }
  ]

  const timelineOptions = [
    { value: "asap", label: "ASAP", description: "Rush delivery (2-4 weeks)", icon: Zap },
    { value: "1-3months", label: "1-3 Months", description: "Standard timeline", icon: Calendar },
    { value: "3-6months", label: "3-6 Months", description: "Planned development", icon: Target },
    { value: "6+months", label: "6+ Months", description: "Long-term project", icon: TrendingUp }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Matching home page style */}
      <section
        className="relative overflow-hidden bg-black py-32 md:py-40 lg:py-48"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50&text=+')] bg-[length:50px_50px] opacity-5"></div>

        <motion.div
          className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div variants={itemVariants} className="mb-6">
              <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                <Sparkles className="mr-1 h-3 w-3" /> Start Your Digital Journey
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl"
            >
              Transform Your <br className="hidden md:block" />
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Vision Into Reality
                </span>
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400"></span>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mb-10 max-w-2xl text-lg text-white/70 md:text-xl">
              Ready to revolutionize your business? Our expert team will guide you through every step of your digital transformation journey with cutting-edge solutions tailored to your needs.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href="#wizard">
                  <span className="relative z-10 flex items-center">
                    Start Your Project
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
                <Link href="/portfolio">
                  <span className="relative z-10 flex items-center">
                    <Play className="mr-2 h-4 w-4" /> View Our Work
                  </span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-400 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                </Link>
              </Button>
            </motion.div>

            {/* Floating stats - matching home page */}
            <motion.div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8" variants={containerVariants}>
              {[
                { value: "100+", label: "Projects Delivered" },
                { value: "50+", label: "Happy Clients" },
                { value: "99%", label: "Success Rate" },
                { value: "24/7", label: "Expert Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                  variants={itemVariants}
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <p className="mb-2 text-sm text-white/50">Scroll to explore</p>
            <div className="h-10 w-6 rounded-full border border-white/20 p-1">
              <div className="h-2 w-full rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Brand Section - matching home page */}
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

      {/* Services Overview Section */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Choose Your&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Perfect Solution
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI automation to mobile apps, we offer comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard
                  icon={service.icon as "Brain" | "Code" | "Smartphone"}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  gradient={service.gradient}
                  href={service.href}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Wizard Section */}
      <section id="wizard" className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Get Started
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Let's Build Your&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Perfect Solution
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your project and we'll create a customized proposal just for you
            </p>
          </motion.div>

          {/* Step Progress */}
          <div className="mb-12">
            <div className="flex justify-center items-center space-x-4 mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-800">{steps[currentStep]?.title}</h3>
              <p className="text-gray-600 mt-1">{steps[currentStep]?.description}</p>
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl"
            >
              {currentStep === 0 && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-center text-slate-800">What service do you need?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedService === service.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
                        }`}
                        onClick={() => {
                          setSelectedService(service.id)
                          setForm({ ...form, service: service.id })
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                            {service.icon === "Brain" && <Brain className="w-6 h-6 text-white" />}
                            {service.icon === "Code" && <Code className="w-6 h-6 text-white" />}
                            {service.icon === "Smartphone" && <Smartphone className="w-6 h-6 text-white" />}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold mb-2 text-slate-800">{service.title}</h5>
                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {service.features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          {selectedService === service.id && (
                            <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-center text-slate-800">Tell us about your project</h4>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="message" className="text-lg font-medium text-slate-700">Project Description *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Describe your project goals, requirements, and any specific features you need..."
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-lg font-medium text-slate-700">Company/Organization</Label>
                        <Input
                          id="company"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <Label className="text-lg font-medium text-slate-700">Industry</Label>
                        <Select onValueChange={(value) => setForm({ ...form, industry: value })}>
                          <SelectTrigger className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry.toLowerCase()}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-center text-slate-800">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-lg font-medium text-slate-700 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-lg font-medium text-slate-700 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-lg font-medium text-slate-700 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label className="text-lg font-medium text-slate-700 flex items-center">
                        <Headphones className="w-4 h-4 mr-2" />
                        Preferred Contact Method
                      </Label>
                      <Select onValueChange={(value) => setForm({ ...form, contactMethod: value })}>
                        <SelectTrigger className="mt-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="How should we contact you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="both">Both Email & Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-center text-slate-800">Timeline & Budget</h4>
                  <div className="space-y-8">
                    <div>
                      <Label className="text-lg font-medium text-slate-700 flex items-center mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        Project Timeline
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {timelineOptions.map((timeline) => (
                          <motion.div
                            key={timeline.value}
                            className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                              form.timeline === timeline.value
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 bg-gray-50 hover:border-purple-300'
                            }`}
                            onClick={() => setForm({ ...form, timeline: timeline.value })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <timeline.icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                            <div className="font-semibold text-slate-800">{timeline.label}</div>
                            <div className="text-sm text-gray-600">{timeline.description}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-lg font-medium text-slate-700 flex items-center mb-4">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Estimated Budget
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {budgetRanges.map((budget) => (
                          <motion.div
                            key={budget.value}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              form.budget === budget.value
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 bg-gray-50 hover:border-purple-300'
                            }`}
                            onClick={() => setForm({ ...form, budget: budget.value })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600 mb-2">{budget.label}</div>
                              <div className="text-sm text-gray-600">{budget.description}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={currentStep === 0 && !selectedService}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  setIsSubmitting(true)
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 2000))
                  setIsSubmitting(false)
                  setShowSuccess(true)
                }}
                disabled={isSubmitting || !form.name || !form.email}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Project <Rocket className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Why Choose&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Cave Motions?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just build software – we craft digital experiences that transform businesses and drive growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Proven Excellence",
                description: "100+ successful projects with 99% client satisfaction rate and industry recognition",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security protocols and 99.9% uptime guarantee for all our solutions",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: TrendingUp,
                title: "Scalable Solutions",
                description: "Built to grow with your business and adapt to future technological advancements",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Seasoned professionals with 10+ years of industry experience and cutting-edge expertise",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                description: "We respect deadlines and deliver projects on schedule without compromising quality",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Round-the-clock support to keep your business running smoothly and efficiently",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Client Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              What Our Clients&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience working with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Cave Motions transformed our business with their AI automation solution. We've seen a 300% increase in efficiency and our team can now focus on strategic initiatives.",
                author: "Sarah Johnson",
                role: "CEO, TechStart Inc.",
                image: "/placeholder.svg?height=60&width=60&text=SJ"
              },
              {
                quote: "The mobile app they built exceeded our expectations. The user experience is phenomenal and our customers love it. Our app store ratings went from 3.2 to 4.8!",
                author: "Michael Chen",
                role: "CTO, FinanceFlow",
                image: "/placeholder.svg?height=60&width=60&text=MC"
              },
              {
                quote: "Professional, reliable, and innovative. They delivered our project on time and within budget. The ongoing support has been exceptional. Highly recommended!",
                author: "Emily Rodriguez",
                role: "Founder, EcoSolutions",
                image: "/placeholder.svg?height=60&width=60&text=ER"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  image={testimonial.image}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
              Get In Touch
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Ready to Start Your&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Digital Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? Need more information? Our team is here to help you every step of the way
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: "Email Us",
                description: "Get in touch via email",
                contact: "hello@cavemotions.com",
                action: "Send Email"
              },
              {
                icon: Phone,
                title: "Call Us",
                description: "Speak with our team",
                contact: "+1 (555) 123-4567",
                action: "Call Now"
              },
              {
                icon: MapPin,
                title: "Visit Us",
                description: "Come see us in person",
                contact: "123 Innovation St, Tech City",
                action: "Get Directions"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{contact.title}</h3>
                <p className="text-gray-600 mb-4">{contact.description}</p>
                <p className="font-medium text-slate-800 mb-6">{contact.contact}</p>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  {contact.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Thank You!</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your project request has been submitted successfully. We'll get back to you within 24 hours with a detailed proposal and next steps.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Project details received
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Team notification sent
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 text-purple-500" />
                    Response within 24 hours
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowSuccess(false)}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => setShowSuccess(false)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    asChild
                  >
                    <Link href="/portfolio">
                      View Our Work
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
