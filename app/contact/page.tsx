"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, Twitter, Sparkles, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import ParallaxText from "@/components/parallax-text"

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.8])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSuccess(true)

      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false)
      }, 5000)
    }, 1500)
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
      <motion.section className="relative overflow-hidden bg-black py-32 md:py-40" style={{ opacity, scale }}>
        {/* Animated background elements */}
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

        <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
                <Sparkles className="mr-1 h-3 w-3" /> Get In Touch
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's Create <span className="text-purple-400">Together</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Whether you're ready for a digital makeover or simply want to explore what's possible, we'd love to hear
              from you.
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
      </motion.section>

      {/* Marquee Brand Section */}
      <section className="bg-black py-10 overflow-hidden border-t border-white/10">
        <div className="py-4">
          <ParallaxText baseVelocity={-2}>
            CONNECT • COLLABORATE • CREATE • INNOVATE • TRANSFORM • CONNECT • COLLABORATE • CREATE •
          </ParallaxText>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-black to-purple-950">
        {/* Background elements */}
        <Particles count={30} />

        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>

        <div className="container relative mx-auto max-w-6xl z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl"></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
                <h2 className="text-3xl font-bold mb-6 relative inline-block text-white">
                  Get in Touch
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r from-purple-400 to-violet-400"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </h2>
                <p className="text-lg text-white/70 mb-8">
                  Reach out to discuss your project, ask questions, or just chat about the latest tech trends.
                </p>

                <motion.form
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  ref={formRef}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div className="space-y-2" variants={fadeInUpVariants} custom={0}>
                      <label htmlFor="name" className="text-sm font-medium text-white/80">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </motion.div>
                    <motion.div className="space-y-2" variants={fadeInUpVariants} custom={1}>
                      <label htmlFor="email" className="text-sm font-medium text-white/80">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </motion.div>
                  </div>

                  <motion.div className="space-y-2" variants={fadeInUpVariants} custom={2}>
                    <label htmlFor="subject" className="text-sm font-medium text-white/80">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </motion.div>

                  <motion.div className="space-y-2" variants={fadeInUpVariants} custom={3}>
                    <label htmlFor="message" className="text-sm font-medium text-white/80">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                      required
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUpVariants} custom={4}>
                    {formSuccess ? (
                      <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-white">
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? "Sending..." : "Send Message"}
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      </Button>
                    )}
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6 relative inline-block text-white">
                Contact Information
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r from-purple-400 to-violet-400"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </h2>
              <p className="text-lg text-white/70 mb-8">We'd love to hear from you. Here's how you can reach us:</p>

              <div className="space-y-6">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6 flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mr-4 shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white">Phone</h3>
                        <p className="text-white/80">+256 787 022105</p>
                        <p className="text-white/60 text-sm mt-1">Monday to Friday, 9am to 6pm</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6 flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mr-4 shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white">Email</h3>
                        <p className="text-white/80">info@cavemotions.com</p>
                        <p className="text-white/60 text-sm mt-1">We'll respond as quickly as possible</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6 flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mr-4 shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white">Office</h3>
                        <p className="text-white/80">Bugolobi, Kampala, Uganda</p>
                        <p className="text-white/60 text-sm mt-1">Come visit us for a coffee and a chat</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: Facebook, label: "Facebook" },
                      { icon: Instagram, label: "Instagram" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Twitter, label: "Twitter" },
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                      >
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  )
}
