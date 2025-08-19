"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image?: string
  className?: string
}

export default function TestimonialCard({ quote, author, role, image, className }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-lg relative",
        isHovered ? "translate-y-[-5px]" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-8 relative z-10">
        {/* Animated gradient border on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
            isHovered ? "opacity-100" : "",
          )}
          style={{
            background:
              "linear-gradient(90deg, rgba(124,58,237,0.2) 0%, rgba(139,92,246,0.2) 50%, rgba(124,58,237,0.2) 100%)",
            backgroundSize: "200% 100%",
            animation: isHovered ? "gradient-x 3s linear infinite" : "none",
          }}
        />

        <motion.div
          animate={isHovered ? { rotate: [0, -5, 0, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <QuoteIcon className="h-10 w-10 text-purple-300" />
        </motion.div>

        <p className="mb-8 text-lg italic leading-relaxed">{quote}</p>

        <div className="flex items-center">
          {image ? (
            <motion.div
              className="mr-4 overflow-hidden rounded-full border-2 border-purple-200"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={image || "/placeholder.svg"} alt={author} className="h-14 w-14 object-cover" />
            </motion.div>
          ) : (
            <motion.div
              className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl font-bold text-purple-700">{author.charAt(0)}</span>
            </motion.div>
          )}
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm opacity-70">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
