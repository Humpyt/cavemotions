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
  Cpu,
  Upload,
  X,
  Image,
  File,
  Download
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import ShaderBackground from "@/components/shader-background"

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

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [dragActive, setDragActive] = useState(false)
  const [estimatedCost, setEstimatedCost] = useState('')
  const [showCostBreakdown, setShowCostBreakdown] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showSaveIndicator, setShowSaveIndicator] = useState(false)

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestionField, setActiveSuggestionField] = useState<string | null>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isValidStep, setIsValidStep] = useState(false)

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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    
    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }))
    
    // Real-time validation
    validateField(name, value)
  }

  const validateField = (name: string, value: string) => {
    let error = ""
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required"
        else if (value.trim().length < 2) error = "Name must be at least 2 characters"
        break
      case "email":
        if (!value.trim()) error = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email address"
        break
      case "phone":
        if (value && !/^[\+]?[1-9][\d]{0,3}[\s\-\(\)]?[\d\s\-\(\)]{7,15}$/.test(value.replace(/\s/g, ""))) {
          error = "Please enter a valid phone number"
        }
        break
      case "message":
        if (!value.trim()) error = "Project description is required"
        else if (value.trim().length < 20) error = "Please provide more details (at least 20 characters)"
        break
      case "company":
        if (value && value.trim().length < 2) error = "Company name must be at least 2 characters"
        break
    }
    
    setErrors((prev) => ({ ...prev, [name]: error }))
    return error === ""
  }

  const validateCurrentStep = () => {
    let isValid = true
    const newErrors: Record<string, string> = {}
    
    switch (currentStep) {
      case 0: // Service Selection
        if (!selectedService) {
          isValid = false
        }
        break
      case 1: // Project Details
        if (!form.message.trim()) {
          newErrors.message = "Project description is required"
          isValid = false
        } else if (form.message.trim().length < 20) {
          newErrors.message = "Please provide more details (at least 20 characters)"
          isValid = false
        }
        break
      case 2: // Contact Information
        if (!form.name.trim()) {
          newErrors.name = "Name is required"
          isValid = false
        }
        if (!form.email.trim()) {
          newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          newErrors.email = "Please enter a valid email address"
          isValid = false
        }
        if (form.phone && !/^[\+]?[1-9][\d]{0,3}[\s\-\(\)]?[\d\s\-\(\)]{7,15}$/.test(form.phone.replace(/\s/g, ""))) {
          newErrors.phone = "Please enter a valid phone number"
          isValid = false
        }
        break
      case 3: // Timeline & Budget
        if (!form.timeline) {
          isValid = false
        }
        if (!form.budget) {
          isValid = false
        }
        break
    }
    
    setErrors(newErrors)
    setIsValidStep(isValid)
    return isValid
  }

  // Validate current step whenever form data or current step changes
  useEffect(() => {
    validateCurrentStep()
  }, [currentStep, form, selectedService])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : ""
  }

  // File upload handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    
    const validFiles: File[] = []
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, files: `File ${file.name} is too large. Maximum size is 10MB.` }))
        return
      }
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, files: `File ${file.name} has an unsupported format.` }))
        return
      }
      
      validFiles.push(file)
    })
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles])
      setErrors(prev => ({ ...prev, files: "" }))
      
      // Simulate upload progress
      validFiles.forEach(file => {
        simulateUploadProgress(file.name)
      })
    }
  }

  const simulateUploadProgress = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress(prev => ({ ...prev, [fileName]: progress }))
    }, 200)
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image
    if (file.type === 'application/pdf') return FileText
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }



  // Progress saving functionality
  const saveProgress = () => {
    const progressData = {
      form,
      currentStep,
      selectedService,
      uploadedFiles: uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      })),
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('cavemo-project-progress', JSON.stringify(progressData))
    setLastSaved(new Date())
    setShowSaveIndicator(true)
    
    setTimeout(() => setShowSaveIndicator(false), 2000)
  }

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('cavemo-project-progress')
      if (saved) {
        const progressData = JSON.parse(saved)
        setForm(progressData.form || form)
        setCurrentStep(progressData.currentStep || 0)
        setSelectedService(progressData.selectedService || "")
        setLastSaved(new Date(progressData.timestamp))
        return true
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
    return false
   }

  // Smart suggestions functionality
  const getSmartSuggestions = (field: string, value: string) => {
    const suggestionData: Record<string, string[]> = {
      company: [
        'Tech Solutions Inc.',
        'Digital Innovations LLC',
        'Creative Agency Co.',
        'Startup Ventures',
        'Enterprise Solutions',
        'Marketing Pro',
        'Design Studio',
        'Software House'
      ],
      message: [
        'I need a modern website for my business',
        'Looking to develop a mobile app for iOS and Android',
        'Require a complete rebrand including logo and marketing materials',
        'Need an e-commerce platform with payment integration',
        'Want to automate business processes with AI solutions',
        'Looking for UI/UX design for our existing product',
        'Need a custom software solution for inventory management',
        'Require digital marketing strategy and implementation'
      ],
      name: [
        'John Smith',
        'Sarah Johnson',
        'Michael Brown',
        'Emily Davis',
        'David Wilson',
        'Lisa Anderson',
        'Robert Taylor',
        'Jennifer Martinez'
      ]
    }

    if (!suggestionData[field] || value.length < 2) return []
    
    return suggestionData[field]
      .filter(suggestion => 
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5)
  }

  const handleInputFocus = (field: string) => {
    setActiveSuggestionField(field)
    const currentValue = form[field as keyof typeof form] as string
    const newSuggestions = getSmartSuggestions(field, currentValue || '')
    setSuggestions(newSuggestions)
    setShowSuggestions(newSuggestions.length > 0)
  }

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    
    if (activeSuggestionField === field) {
      const newSuggestions = getSmartSuggestions(field, value)
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    }
  }

  const selectSuggestion = (suggestion: string) => {
    if (activeSuggestionField) {
      setForm({ ...form, [activeSuggestionField]: suggestion })
      setShowSuggestions(false)
      setActiveSuggestionField(null)
    }
  }

  const hideSuggestions = () => {
    setTimeout(() => {
      setShowSuggestions(false)
      setActiveSuggestionField(null)
    }, 200)
  }

  const clearProgress = () => {
    localStorage.removeItem('cavemo-project-progress')
    setLastSaved(null)
  }

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (form.message || form.name || form.email || form.company) {
        saveProgress()
      }
    }, 3000) // Auto-save after 3 seconds of inactivity

    return () => clearTimeout(autoSaveTimer)
  }, [form, currentStep, selectedService, uploadedFiles])

  // Load progress on component mount
  useEffect(() => {
    const hasProgress = loadProgress()
    if (hasProgress) {
      // Show recovery notification
      setShowSaveIndicator(true)
      setTimeout(() => setShowSaveIndicator(false), 3000)
    }
  }, [])

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    
    return date.toLocaleDateString()
  }



  // Email integration functionality
  const sendProjectEmail = async (formData: any) => {
    try {
      // Prepare email data
      const emailData = {
        to: formData.email,
        subject: `Project Request Confirmation - ${formData.service}`,
        template: 'project-confirmation',
        data: {
          name: formData.name,
          service: formData.service,
          company: formData.company,
          timeline: formData.timeline,
          budget: formData.budget,
          estimatedCost: estimatedCost,

          submissionDate: new Date().toLocaleDateString()
        }
      }

      // Send confirmation email to client
      const clientResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })

      // Send notification email to team
      const teamEmailData = {
        to: 'team@cavemo.com',
        subject: `New Project Request - ${formData.service}`,
        template: 'team-notification',
        data: {
          ...formData,
          estimatedCost,

          uploadedFiles: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
          submissionDate: new Date().toISOString()
        }
      }

      const teamResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamEmailData)
      })

      return {
        clientEmailSent: clientResponse.ok,
        teamEmailSent: teamResponse.ok
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      return {
        clientEmailSent: false,
        teamEmailSent: false,
        error: error
      }
    }
  }

  const scheduleFollowUpEmail = async (email: string, name: string) => {
    try {
      const followUpData = {
        to: email,
        subject: 'Following up on your project request',
        template: 'follow-up',
        data: {
          name,
          scheduleDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days later
        },
        scheduleFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      }

      const response = await fetch('/api/schedule-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followUpData)
      })

      return response.ok
    } catch (error) {
      console.error('Follow-up email scheduling failed:', error)
      return false
    }
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
    { value: "800k-4m", label: "UGX 800,000 - 4M", description: "Small project - Perfect for MVPs and simple solutions" },
    { value: "4m-8m", label: "UGX 4M - 8M", description: "Medium project - Comprehensive solutions with advanced features" },
    { value: "8m-20m", label: "UGX 8M - 20M", description: "Large project - Enterprise-grade solutions" },
    { value: "20m+", label: "UGX 20M+", description: "Enterprise project - Complex, multi-phase implementations" }
  ]

  const timelineOptions = [
    { value: "asap", label: "ASAP", description: "Rush delivery (2-4 weeks)", icon: Zap },
    { value: "1-3months", label: "1-3 Months", description: "Standard timeline", icon: Calendar },
    { value: "3-6months", label: "3-6 Months", description: "Planned development", icon: Target },
    { value: "6+months", label: "6+ Months", description: "Long-term project", icon: TrendingUp }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Same design as /services/web-development */}
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
                <Sparkles className="mr-1 h-3 w-3" /> Get Started
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Start Your Project
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Tell us about your goals, and we’ll help you plan, scope, and kick off with clarity and momentum.
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
              Let's Build Your Perfect Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your project and we'll create a customized proposal just for you
            </p>
          </motion.div>

          {/* Save Indicator */}
          <AnimatePresence>
            {showSaveIndicator && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {lastSaved ? 'Progress saved!' : 'Progress restored!'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Info */}
          {lastSaved && (
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Last saved: {formatLastSaved(lastSaved)}</span>
                <button
                  onClick={clearProgress}
                  className="text-purple-600 hover:text-purple-700 underline ml-2"
                >
                  Clear saved data
                </button>
              </p>
            </div>
          )}

          {/* Step Progress */}
          <div className="mb-12">
            <div className="flex justify-center items-center space-x-4 mb-8">
              {steps.map((step, index) => {
                const isCompleted = currentStep > step.id
                const isCurrent = currentStep === step.id
                const isValid = step.id < currentStep || (step.id === currentStep && isValidStep)
                
                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 relative ${
                        isCompleted
                          ? 'bg-green-600 border-green-600 text-white'
                          : isCurrent && isValid
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : isCurrent && !isValid
                          ? 'bg-red-100 border-red-400 text-red-600'
                          : 'border-gray-300 text-gray-400 bg-white'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                      
                      {/* Validation indicator */}
                      {isCurrent && !isValid && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <span className="text-white text-xs">!</span>
                        </motion.div>
                      )}
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-800 flex items-center justify-center gap-2">
                {steps[currentStep]?.title}
                {isValidStep && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-600"
                  >
                    ✓
                  </motion.span>
                )}
              </h3>
              <p className="text-gray-600 mt-1">{steps[currentStep]?.description}</p>
              {!isValidStep && currentStep > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-2 flex items-center justify-center gap-1"
                >
                  <span>⚠️</span>
                  Please complete all required fields to continue
                </motion.p>
              )}
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
                          <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 border border-gray-200`}>
                            {service.icon === "Brain" && <Brain className="w-6 h-6 text-black" />}
                            {service.icon === "Code" && <Code className="w-6 h-6 text-black" />}
                            {service.icon === "Smartphone" && <Smartphone className="w-6 h-6 text-black" />}
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
                      <div className="relative">
                          <Textarea
                            id="message"
                            name="message"
                            required
                            value={form.message}
                            onChange={(e) => {
                              handleChange(e)
                              handleInputChange('message', e.target.value)
                            }}
                            onFocus={() => handleInputFocus('message')}
                            onBlur={(e) => {
                              handleBlur(e)
                              hideSuggestions()
                            }}
                            className={`mt-2 min-h-[120px] transition-colors ${getFieldError('message') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'}`}
                            placeholder="Tell us about your project goals, requirements, and any specific features you need..."
                          />
                          
                          {/* Suggestions Dropdown */}
                          {showSuggestions && activeSuggestionField === 'message' && suggestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                            >
                              {suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                                  onClick={() => selectSuggestion(suggestion)}
                                >
                                  <div className="flex items-center space-x-2">
                                    <Lightbulb className="w-3 h-3 text-purple-500" />
                                    <span>{suggestion}</span>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      {getFieldError('message') && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <span className="w-4 h-4 mr-1">⚠️</span>
                          {getFieldError('message')}
                        </motion.p>
                      )}
                      <div className="mt-1 text-xs text-gray-500">
                        {form.message.length}/500 characters {form.message.length >= 20 ? '✓' : `(${20 - form.message.length} more needed)`}
                      </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="space-y-4">
                      <label className="block text-lg font-medium text-slate-700">
                        Project Files <span className="text-gray-500">(Optional)</span>
                      </label>
                      <p className="text-sm text-gray-600">
                        Upload project briefs, mockups, reference materials, or any relevant documents
                      </p>
                      
                      {/* Upload Area */}
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                          dragActive
                            ? "border-purple-400 bg-purple-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <label htmlFor="file-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Drop files here or{" "}
                                <span className="text-purple-600 hover:text-purple-500">
                                  browse
                                </span>
                              </span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx"
                                onChange={(e) => handleFileUpload(e.target.files)}
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF, PDF, TXT, DOC up to 10MB each
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Error Message */}
                      {getFieldError("files") && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm"
                        >
                          {getFieldError("files")}
                        </motion.p>
                      )}

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-gray-700">
                            Uploaded Files ({uploadedFiles.length})
                          </h4>
                          <div className="space-y-2">
                            {uploadedFiles.map((file, index) => {
                              const FileIcon = getFileIcon(file)
                              const progress = uploadProgress[file.name] || 0
                              
                              return (
                                <motion.div
                                  key={`${file.name}-${index}`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                                >
                                  <div className="flex items-center space-x-3 flex-1">
                                    <FileIcon className="h-5 w-5 text-gray-500" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                      </p>
                                      {progress < 100 && (
                                        <div className="mt-1">
                                          <div className="bg-gray-200 rounded-full h-1.5">
                                            <div
                                              className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                                              style={{ width: `${progress}%` }}
                                            />
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1">
                                            {Math.round(progress)}% uploaded
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="ml-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-lg font-medium text-slate-700">Company/Organization</Label>
                        <div className="relative">
                          <Input
                            id="company"
                            name="company"
                            value={form.company}
                            onChange={(e) => {
                              handleChange(e)
                              handleInputChange('company', e.target.value)
                            }}
                            onFocus={() => handleInputFocus('company')}
                            onBlur={(e) => {
                              handleBlur(e)
                              hideSuggestions()
                            }}
                            className={`mt-2 transition-colors ${getFieldError('company') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'}`}
                            placeholder="Your company or organization name"
                          />
                          
                          {/* Suggestions Dropdown */}
                          {showSuggestions && activeSuggestionField === 'company' && suggestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                            >
                              {suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                                  onClick={() => selectSuggestion(suggestion)}
                                >
                                  <div className="flex items-center space-x-2">
                                    <Briefcase className="w-3 h-3 text-purple-500" />
                                    <span>{suggestion}</span>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                        {getFieldError('company') && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600 flex items-center"
                          >
                            <span className="w-4 h-4 mr-1">⚠️</span>
                            {getFieldError('company')}
                          </motion.p>
                        )}
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

                    {/* Estimated Project Cost Input */}
                    <div className="mt-8">
                      <Label htmlFor="estimatedCost" className="text-lg font-medium text-slate-700 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Estimated Project Cost
                      </Label>
                      <Input
                        id="estimatedCost"
                        name="estimatedCost"
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(e.target.value)}
                        className="mt-2 transition-colors border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Enter your estimated budget (e.g., UGX 40M - 100M)"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Please provide your estimated budget range for this project. This helps us understand your expectations and provide appropriate solutions.
                      </p>
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
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          required
                          value={form.name}
                          onChange={(e) => {
                            handleChange(e)
                            handleInputChange('name', e.target.value)
                          }}
                          onFocus={() => handleInputFocus('name')}
                          onBlur={(e) => {
                            handleBlur(e)
                            hideSuggestions()
                          }}
                          className={`mt-2 transition-colors ${getFieldError('name') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'}`}
                          placeholder="Your full name"
                        />
                        
                        {/* Suggestions Dropdown */}
                        {showSuggestions && activeSuggestionField === 'name' && suggestions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                          >
                            {suggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                                onClick={() => selectSuggestion(suggestion)}
                              >
                                <div className="flex items-center space-x-2">
                                  <Users className="w-3 h-3 text-purple-500" />
                                  <span>{suggestion}</span>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                      {getFieldError('name') && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <span className="w-4 h-4 mr-1">⚠️</span>
                          {getFieldError('name')}
                        </motion.p>
                      )}
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
                        onBlur={handleBlur}
                        className={`mt-2 transition-colors ${getFieldError('email') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'}`}
                        placeholder="your@email.com"
                      />
                      {getFieldError('email') && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <span className="w-4 h-4 mr-1">⚠️</span>
                          {getFieldError('email')}
                        </motion.p>
                      )}
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
                        onBlur={handleBlur}
                        className={`mt-2 transition-colors ${getFieldError('phone') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'}`}
                        placeholder="+256 700 123 456"
                      />
                      {getFieldError('phone') && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <span className="w-4 h-4 mr-1">⚠️</span>
                          {getFieldError('phone')}
                        </motion.p>
                      )}
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
                  <h4 className="text-2xl font-bold mb-6 text-center text-black">Timeline & Budget</h4>
                  <div className="space-y-8">
                    <div>
                      <Label className="text-lg font-medium text-black flex items-center mb-4">
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
                            <div className="font-semibold text-black">{timeline.label}</div>
                            <div className="text-sm text-black">{timeline.description}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-lg font-medium text-black flex items-center mb-4">
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
                              <div className="text-2xl font-bold text-black mb-2">{budget.label}</div>
                              <div className="text-sm text-black">{budget.description}</div>
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
                onClick={() => {
                  if (validateCurrentStep()) {
                    setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                  } else {
                    // Mark all fields as touched to show validation errors
                    const fieldsToTouch: Record<string, boolean> = {}
                    if (currentStep === 1) {
                      fieldsToTouch.message = true
                    } else if (currentStep === 2) {
                      fieldsToTouch.name = true
                      fieldsToTouch.email = true
                      if (form.phone) fieldsToTouch.phone = true
                    }
                    setTouched(prev => ({ ...prev, ...fieldsToTouch }))
                  }
                }}
                className={`transition-all duration-300 ${
                  isValidStep 
                    ? 'bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isValidStep}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  if (!validateCurrentStep()) {
                    setTouched({
                      name: true,
                      email: true,
                      phone: !!form.phone,
                      message: true,
                      company: !!form.company
                    })
                    return
                  }
                  
                  setIsSubmitting(true)
                  
                  try {
                    // Submit form data
                    const submissionData = {
                      ...form,
                      selectedService,
                      estimatedCost,

                      uploadedFiles: uploadedFiles.map(f => ({
                        name: f.name,
                        size: f.size,
                        type: f.type
                      }))
                    }

                    // Send emails
                    const emailResults = await sendProjectEmail(submissionData)
                    
                    // Schedule follow-up email
                    const followUpScheduled = await scheduleFollowUpEmail(form.email, form.name)
                    
                    // Clear saved progress on successful submission
                    clearProgress()
                    
                    // Set success message with email status
                    let successMsg = "Thank you! Your project request has been submitted successfully."
                    if (emailResults.clientEmailSent) {
                      successMsg += " A confirmation email has been sent to your inbox."
                    }
                    if (followUpScheduled) {
                      successMsg += " We'll follow up with you within 3 days."
                    }
                    
                    setSuccessMessage(successMsg)
                    setIsSubmitting(false)
                    setShowSuccess(true)
                    
                  } catch (error) {
                    console.error('Submission error:', error)
                    setIsSubmitting(false)
                    setSuccessMessage("Your request was submitted, but there was an issue with email delivery. We'll contact you soon!")
                    setShowSuccess(true)
                  }
                }}
                disabled={isSubmitting || !isValidStep}
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white disabled:bg-gray-300 disabled:text-gray-500"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">Why Choose Cave Motions?</h2>
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
                <div className="w-12 h-12 rounded-xl bg-black border border-black flex items-center justify-center mb-6">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">What Our Clients Say About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience working with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Cave Motions helped us streamline operations and improve member engagement across our SACCO platform. Their dedication and support were outstanding.",
                author: "Grace Nankunda",
                role: "Operations Manager, Umoja SACCO",
                image: "/placeholder.svg?height=60&width=60&text=GN"
              },
              {
                quote: "Our website redesign was a complete success. The team delivered a fast, modern experience that truly reflects our ministry's mission.",
                author: "Pastor John Kintu",
                role: "Lead Pastor, Christ Embassy Kampala",
                image: "/placeholder.svg?height=60&width=60&text=JK"
              },
              {
                quote: "They are professional and trustworthy. Our e-commerce launch went smoothly and we've seen steady growth in online sales.",
                author: "David Okello",
                role: "Founder, Okello Crafts UG",
                image: "/placeholder.svg?height=60&width=60&text=DO"
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

      {/* Get In Touch Section - styled like Home Services */}
      <section className="relative overflow-hidden bg-black py-24 md:py-32 text-white">
        {/* Shader Background */}
        <div className="absolute inset-0 z-0">
          <ShaderBackground />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8 z-10">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-white/10 hover:bg-white/20 text-white" variant="outline">
              Get In Touch
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Ready to Start Your Digital Journey?</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Have questions? Need more information? Our team is here to help you every step of the way.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Mail,
                title: "Email Us",
                description: "Get in touch via email",
                contact: "info@cavemotions.com",
                action: "Send Email"
              },
              {
                icon: Phone,
                title: "Call Us",
                description: "Speak with our team",
                contact: "+256 787 022 105",
                action: "Call Now"
              },
              {
                icon: MapPin,
                title: "Visit Us",
                description: "Come see us in person",
                contact: "Bugolobi, Kampala - Uganda",
                action: "Get Directions"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/10"
              >
                <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{contact.title}</h3>
                <p className="text-white/70 mb-4">{contact.description}</p>
                <p className="font-medium text-white mb-6">{contact.contact}</p>
                <Button variant="outline" className="border-white/30 text-black hover:bg-white/10">
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
