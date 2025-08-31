"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart3,
  TrendingUp,
  Database,
  PieChart,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"
import DynamicThreeDimensionalCard from "@/components/dynamic-three-dimensional-card"
import ParallaxText from "@/components/parallax-text"

export default function BusinessIntelligenceClientPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: BarChart3,
      title: "Custom Dashboards",
      description:
        "Interactive dashboards tailored to your business needs with real-time data visualization and KPI tracking.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description:
        "Advanced machine learning models to forecast trends, identify opportunities, and predict business outcomes.",
    },
    {
      icon: Database,
      title: "Data Integration",
      description: "Seamlessly connect and consolidate data from multiple sources into a unified analytics platform.",
    },
    {
      icon: PieChart,
      title: "Advanced Reporting",
      description: "Automated report generation with customizable templates and scheduled delivery to stakeholders.",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Data Assessment",
      description: "Comprehensive analysis of your current data infrastructure, sources, and business requirements.",
    },
    {
      step: "02",
      title: "Architecture Design",
      description: "Design scalable BI architecture with optimal data flow, storage, and processing capabilities.",
    },
    {
      step: "03",
      title: "Implementation",
      description: "Build and deploy custom BI solutions with rigorous testing and quality assurance.",
    },
    {
      step: "04",
      title: "Training & Support",
      description: "Comprehensive training for your team and ongoing support to maximize BI value.",
    },
  ]

  const caseStudies = [
    {
      title: "E-commerce Analytics Platform",
      description:
        "Increased revenue by 35% through advanced customer behavior analytics and personalized recommendations.",
      metrics: ["35% Revenue Increase", "50% Better Conversion", "Real-time Insights"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Manufacturing KPI Dashboard",
      description:
        "Reduced operational costs by 28% with comprehensive production monitoring and predictive maintenance.",
      metrics: ["28% Cost Reduction", "99.5% Uptime", "Predictive Maintenance"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Financial Services BI",
      description:
        "Enhanced risk management and compliance with real-time financial analytics and automated reporting.",
      metrics: ["100% Compliance", "60% Faster Reporting", "Risk Reduction"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const faqs = [
    {
      question: "What types of data sources can you integrate?",
      answer:
        "We can integrate virtually any data source including databases (SQL, NoSQL), cloud platforms (AWS, Azure, GCP), APIs, spreadsheets, CRM systems, ERP systems, and third-party applications.",
    },
    {
      question: "How long does it take to implement a BI solution?",
      answer:
        "Implementation timelines vary based on complexity, but typically range from 4-16 weeks. Simple dashboards can be delivered in 4-6 weeks, while comprehensive enterprise solutions may take 12-16 weeks.",
    },
    {
      question: "Do you provide training for our team?",
      answer:
        "Yes, we provide comprehensive training including user training for dashboard navigation, admin training for system management, and developer training for customizations and maintenance.",
    },
    {
      question: "Can you work with our existing data infrastructure?",
      answer:
        "Absolutely. We specialize in working with existing systems and can integrate with your current data warehouse, databases, and analytics tools while minimizing disruption to operations.",
    },
    {
      question: "What ongoing support do you provide?",
      answer:
        "We offer various support packages including 24/7 monitoring, regular maintenance, performance optimization, feature updates, and dedicated support channels for technical assistance.",
    },
    {
      question: "How do you ensure data security and compliance?",
      answer:
        "We implement enterprise-grade security measures including encryption, access controls, audit trails, and compliance with regulations like GDPR, HIPAA, and SOX based on your industry requirements.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Business Intelligence Solutions",
            provider: {
              "@type": "Organization",
              name: "Cave Motions",
              url: "https://cavemotions.com",
            },
            description:
              "Transform your business with advanced business intelligence solutions including custom dashboards, data analytics, and reporting systems.",
            url: "https://cavemotions.com/services/business-intelligence",
            serviceType: "Business Intelligence",
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Business Intelligence Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Custom Dashboards",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Predictive Analytics",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Data Integration",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
          {/* Animated Background Particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="outline" className="mb-6 border-purple-400 text-purple-300">
              Business Intelligence Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Transform Data Into
              <br />
              <span className="text-purple-400">Business Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Unlock the power of your data with custom dashboards, advanced analytics, and actionable insights that
              drive strategic business decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                Start Your BI Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 bg-slate-900 overflow-hidden">
        <ParallaxText baseVelocity={-2}>
          <span className="text-4xl font-bold text-purple-400 mx-8">DATA ANALYTICS</span>
          <span className="text-4xl font-bold text-white mx-8">•</span>
          <span className="text-4xl font-bold text-purple-400 mx-8">BUSINESS INTELLIGENCE</span>
          <span className="text-4xl font-bold text-white mx-8">•</span>
          <span className="text-4xl font-bold text-purple-400 mx-8">PREDICTIVE MODELING</span>
          <span className="text-4xl font-bold text-white mx-8">•</span>
          <span className="text-4xl font-bold text-purple-400 mx-8">DATA VISUALIZATION</span>
          <span className="text-4xl font-bold text-white mx-8">•</span>
        </ParallaxText>
      </section>

      {/* Overview Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Turn Your Data Into Your
              <span className="text-purple-600"> Competitive Advantage</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              In today's data-driven world, businesses that can effectively analyze and act on their data gain a
              significant competitive edge. Our business intelligence solutions transform raw data into actionable
              insights, enabling you to make informed decisions, identify opportunities, and optimize operations.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Faster Decision Making</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">60%</div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Real-time Monitoring</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <DynamicThreeDimensionalCard className="p-8 bg-gradient-to-br from-purple-50 to-white">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Real-time Analytics</h3>
                    <p className="text-sm text-gray-600">Live data processing and visualization</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">KPI Tracking</h3>
                    <p className="text-sm text-gray-600">Monitor key performance indicators</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Automated Insights</h3>
                    <p className="text-sm text-gray-600">AI-powered pattern recognition</p>
                  </div>
                </div>
              </div>
            </DynamicThreeDimensionalCard>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Comprehensive BI <span className="text-purple-600">Capabilities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our business intelligence solutions cover every aspect of data analytics, from collection and processing
              to visualization and actionable insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors duration-300">
                      <feature.icon className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Our BI <span className="text-purple-600">Implementation Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful business intelligence implementation that delivers
              measurable results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent transform -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Success <span className="text-purple-600">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how our business intelligence solutions have transformed businesses across various industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{study.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.metrics.map((metric, metricIndex) => (
                        <Badge key={metricIndex} variant="secondary" className="bg-purple-100 text-purple-800">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Frequently Asked <span className="text-purple-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our business intelligence solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-purple-600 transition-colors duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-purple-800">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your
              <span className="text-purple-400"> Business Intelligence?</span>
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how our BI solutions can unlock the power of your data and drive strategic business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
              >
                Schedule Consultation
              </Button>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Free Initial Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Custom BI Strategy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Ongoing Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
