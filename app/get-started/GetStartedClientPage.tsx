"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import {
  Badge,
  Button,
  Checkbox,
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
  CardDescription,
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
  Palette
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function GetStartedClientPage() {
  /* ---------------------- form state --------------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /* ------------------- scrolling effects ----------------- */
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const bgOffset = useTransform(scrollYProgress, [0, 1], [0, -200])

  /* ------------------- step wizard data ----------------- */
  const steps = [
    { id: 0, title: "Service Selection", icon: Target },
    { id: 1, title: "Project Details", icon: MessageSquare },
    { id: 2, title: "Contact Information", icon: Users },
    { id: 3, title: "Timeline & Budget", icon: Calendar },
  ]

  const services = [
    {
      id: "ai-automation",
      title: "AI Automation",
      description: "Intelligent chatbots, process automation, and AI-powered solutions",
      icon: Brain,
      color: "from-purple-500 to-violet-600",
      features: ["Chatbots", "Process Automation", "Predictive Analytics", "Custom AI Solutions"]
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Modern, responsive websites and web applications",
      icon: Globe,
      color: "from-blue-500 to-cyan-600",
      features: ["Responsive Design", "E-commerce", "CMS", "Performance Optimization"]
    },
    {
      id: "mobile-apps",
      title: "Mobile Applications",
      description: "Native and cross-platform mobile app development",
      icon: Smartphone,
      color: "from-amber-500 to-orange-600",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization", "Push Notifications"]
    },
    {
      id: "software-development",
      title: "Software Development",
      description: "Custom software solutions and enterprise systems",
      icon: Code,
      color: "from-emerald-500 to-green-600",
      features: ["Enterprise Systems", "API Development", "Database Design", "Cloud Solutions"]
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description: "User-centered design that converts and delights",
      icon: Palette,
      color: "from-pink-500 to-rose-600",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      id: "consulting",
      title: "Digital Consulting",
      description: "Strategic guidance for your digital transformation",
      icon: Lightbulb,
      color: "from-indigo-500 to-purple-600",
      features: ["Strategy Planning", "Technology Audit", "Digital Roadmap", "Team Training"]
    }
  ]

  /* -------------------------- UI ------------------------- */
  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white">
      {/* ======================= HERO ======================= */}
      <section className="relative flex flex-col items-center justify-center py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <Badge className="mb-6 bg-white/10 text-sm backdrop-blur border-white/20">
            <Sparkles className="mr-1 h-4 w-4" /> Start Your Digital Journey
          </Badge>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6">
            Transform Your&nbsp;
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Vision
            </span>
            <br />
            Into Reality
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed mb-8">
            Ready to revolutionize your business? Our expert team will guide you through every step of your digital transformation journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg" asChild>
              <Link href="#wizard">
                Start Your Project <Rocket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 backdrop-blur hover:bg-white/10 px-8 py-4 text-lg">
              <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "100+", label: "Projects Delivered" },
            { number: "50+", label: "Happy Clients" },
            { number: "99%", label: "Success Rate" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="text-2xl font-bold text-purple-400">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ================ PROJECT WIZARD ===================== */}
      <section id="wizard" className="py-24 md:py-32 bg-slate-900/30 backdrop-blur">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Build Your&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Perfect Solution
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                        : 'border-white/30 text-white/50'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-purple-600' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">{steps[currentStep]?.title}</h3>
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
              className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10"
            >
              {currentStep === 0 && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-center">What service do you need?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          form.service === service.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                        onClick={() => setForm({ ...form, service: service.id })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <h5 className="text-lg font-semibold mb-2">{service.title}</h5>
                        <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-center">Tell us about your project</h4>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="message" className="text-lg font-medium">Project Description *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Describe your project goals, requirements, and any specific features you need..."
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-lg font-medium">Company/Organization</Label>
                        <Input
                          id="company"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <Label className="text-lg font-medium">Industry</Label>
                        <Select>
                          <SelectTrigger className="mt-2 bg-white/5 border-white/20 text-white">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-center">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-lg font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-lg font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-lg font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label className="text-lg font-medium">Preferred Contact Method</Label>
                      <Select>
                        <SelectTrigger className="mt-2 bg-white/5 border-white/20 text-white">
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
                  <h4 className="text-2xl font-bold mb-6 text-center">Timeline & Budget</h4>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-medium">Project Timeline</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        {[
                          { value: "asap", label: "ASAP", desc: "Rush project" },
                          { value: "1-3months", label: "1-3 Months", desc: "Standard timeline" },
                          { value: "3-6months", label: "3-6 Months", desc: "Planned project" },
                          { value: "6+months", label: "6+ Months", desc: "Long-term project" }
                        ].map((timeline) => (
                          <motion.div
                            key={timeline.value}
                            className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                              form.timeline === timeline.value
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-white/20 bg-white/5 hover:border-white/40'
                            }`}
                            onClick={() => setForm({ ...form, timeline: timeline.value })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="font-semibold">{timeline.label}</div>
                            <div className="text-sm text-gray-400">{timeline.desc}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-lg font-medium">Estimated Budget</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        {[
                          { value: "5k-15k", label: "$5K - $15K", desc: "Small project" },
                          { value: "15k-50k", label: "$15K - $50K", desc: "Medium project" },
                          { value: "50k+", label: "$50K+", desc: "Large project" }
                        ].map((budget) => (
                          <motion.div
                            key={budget.value}
                            className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all ${
                              form.budget === budget.value
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-white/20 bg-white/5 hover:border-white/40'
                            }`}
                            onClick={() => setForm({ ...form, budget: budget.value })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xl font-bold text-purple-400">{budget.label}</div>
                            <div className="text-sm text-gray-400">{budget.desc}</div>
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
              className="border-white/30 text-white bg-white/5 backdrop-blur hover:bg-white/10"
            >
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={currentStep === 0 && !form.service}
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
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
      {/* ================ WHY CHOOSE US ===================== */}
      <section className="py-24 md:py-32 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Cave Motions?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just build software – we craft digital experiences that transform businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Proven Excellence",
                description: "100+ successful projects with 99% client satisfaction rate",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security and 99.9% uptime guarantee",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: TrendingUp,
                title: "Scalable Solutions",
                description: "Built to grow with your business and adapt to future needs",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Seasoned professionals with 10+ years of industry experience",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                description: "We respect deadlines and deliver projects on schedule",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description: "Round-the-clock support to keep your business running smoothly",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ TESTIMONIALS ===================== */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart Inc.",
                content: "Cave Motions transformed our business with their AI automation solution. We've seen a 300% increase in efficiency.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "CTO, FinanceFlow",
                content: "The mobile app they built exceeded our expectations. The user experience is phenomenal and our customers love it.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Founder, EcoSolutions",
                content: "Professional, reliable, and innovative. They delivered our project on time and within budget. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SUCCESS MODAL ===================== */}
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
              className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/20"
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
                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                <p className="text-gray-300 mb-6">
                  Your project request has been submitted successfully. We'll get back to you within 24 hours with a detailed proposal.
                </p>
                <Button
                  onClick={() => setShowSuccess(false)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
