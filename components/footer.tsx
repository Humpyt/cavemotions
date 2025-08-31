"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribing(false)
      setIsSubscribed(true)
      setEmail("")

      // Reset success message after a few seconds
      setTimeout(() => {
        setIsSubscribed(false)
      }, 5000)
    }, 1500)
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

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              variants={fadeInUpVariants}
            >
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-white/70 mb-0">
                Subscribe to our newsletter for the latest industry insights and company news.
              </p>
            </motion.div>
            <motion.form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={handleSubscribe}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeInUpVariants}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-500"
                disabled={isSubscribing || isSubscribed}
              />
              <Button
                type="submit"
                className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                disabled={isSubscribing || isSubscribed}
              >
                <span className="relative z-10 flex items-center">
                  {isSubscribing ? "Subscribing..." : isSubscribed ? "Subscribed!" : "Subscribe"}
                  {!isSubscribing && !isSubscribed && (
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-500 to-violet-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            variants={fadeInUpVariants}
          >
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">Cave Motions</span>
            </Link>
            <p className="text-white/70">
              Where Creativity Meets Code and Innovation Gets a Wink. Pioneering the future of digital experiences.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
              ].map((social, index) => (
                <motion.div
                  key={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-purple-600 transition-colors cursor-default"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
            variants={fadeInUpVariants}
          >
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={link.path}
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                  >
                    <ArrowRight className="mr-2 h-3 w-3" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
            variants={fadeInUpVariants}
          >
            <h3 className="text-xl font-semibold">Our Services</h3>
            <ul className="space-y-4">
              {[
                { name: "AI Automation", path: "/services/ai-automation" },
                { name: "Web Development", path: "/services/web-development" },
                { name: "Software Development", path: "/services/software-development" },
                { name: "Mobile Applications", path: "/services/mobile-applications" },
              ].map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={service.path}
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                  >
                    <ArrowRight className="mr-2 h-3 w-3" />
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={3}
            variants={fadeInUpVariants}
          >
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Phone className="h-5 w-5 text-purple-400 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">+256 787 022105</p>
                  <p className="text-white/50 text-sm">Mon-Fri 9am-6pm</p>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Mail className="h-5 w-5 text-purple-400 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">info@cavemotions.com</p>
                  <p className="text-white/50 text-sm">We'll respond promptly</p>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <MapPin className="h-5 w-5 text-purple-400 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Bugolobi, Kampala</p>
                  <p className="text-white/50 text-sm">Uganda</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-white/50 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              &copy; {new Date().getFullYear()} Cave Motions. All rights reserved.
            </motion.p>
            <div className="flex gap-6">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Cookie Policy", path: "/cookies" },
              ].map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Link href={link.path} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
