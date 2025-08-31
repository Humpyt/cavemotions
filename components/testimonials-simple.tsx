"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

const testimonials = [
  {
    quote: "Cave Motions completely transformed our online presence. Their web design is sleek, modern, and exactly what our business needed to stand out in Kampala. The team was professional, fast, and incredibly creative. We now get more inquiries from our website than ever before!",
    avatar: "/placeholder-user.jpg",
    name: "Sarah K.",
    role: "Business Owner",
  },
  {
    quote: "Working with Cave Motions was the best decision for our brand. From logo design to website development, they gave us a professional identity that speaks volumes. Their attention to detail and creativity is unmatched!",
    avatar: "/placeholder-user.jpg",
    name: "David M.",
    role: "Entrepreneur",
  },
  {
    quote: "Cave Motions built us a custom system that streamlined our operations and saved us so much time. Their mix of creativity and technical expertise makes them the go-to agency for innovative solutions in Uganda.",
    avatar: "/placeholder-user.jpg",
    name: "Lydia N.",
    role: "NGO Coordinator",
  },
  {
    quote: "We wanted a website that looked amazing and worked flawlessly on phones. Cave Motions delivered beyond expectations! Our clients always compliment how professional our site looks. They are truly experts in their field.",
    avatar: "/placeholder-user.jpg",
    name: "Michael O.",
    role: "School Director",
  },
  {
    quote: "Cave Motions didn't just design our website—they gave us a full digital strategy. From branding to social media, they helped us elevate our image and reach more customers. I highly recommend them to anyone serious about growing their business online.",
    avatar: "/placeholder-user.jpg",
    name: "Grace T.",
    role: "Fashion Brand Owner",
  },
]

const DURATION = 5000 // ms
const BAR_WIDTH = 50
const CIRCLE_SIZE = 12

export function TestimonialsSimple() {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, DURATION)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index])

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20&text=+')] bg-[length:20px_20px] opacity-5"></div>
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"></div>
      
      <div className="container relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
            Testimonials
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            We've helped businesses of all sizes transform their digital presence and achieve remarkable results.
            Here's what they have to say about working with us.
          </p>
        </div>

        {/* Testimonials Content */}
        <div className="flex w-full max-w-5xl mx-auto flex-col items-center justify-center px-4">
          <div className="min-h-[120px] w-full">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="text-white mb-8 text-center text-2xl leading-tight font-medium md:text-4xl"
              >
                "{testimonials[index].quote}"
              </motion.blockquote>
            </AnimatePresence>
          </div>
          
          <div className="flex w-full max-w-lg items-center justify-center gap-8 pt-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ type: "spring", duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <Image
                  src={testimonials[index].avatar}
                  alt={testimonials[index].name + " avatar"}
                  width={48}
                  height={48}
                  className="bg-white/10 h-12 w-12 rounded-full border object-cover"
                />
                <div className="border-white/30 mx-4 h-8 border-l" />
                <div className="text-left">
                  <div className="text-white text-lg font-medium italic">
                    {testimonials[index].name}
                  </div>
                  <div className="text-white/70 text-base">
                    {testimonials[index].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Progress Bar & Circles Indicator */}
          <div className="mx-auto mt-8 flex w-full max-w-lg justify-center gap-3">
            {testimonials.map((_, i) => {
              const isActive = i === index
              return (
                <motion.span
                  key={i}
                  layout
                  initial={false}
                  animate={{
                    width: isActive ? BAR_WIDTH : CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    borderRadius: isActive ? 8 : 999,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.4,
                  }}
                  className="bg-white/10 relative block overflow-hidden"
                  style={{
                    minWidth: CIRCLE_SIZE,
                    maxWidth: BAR_WIDTH,
                    border: "none",
                  }}
                >
                  {isActive && (
                    <motion.div
                      key={index}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                      className="bg-purple-500 absolute top-0 left-0 h-full rounded-lg"
                    />
                  )}
                </motion.span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}