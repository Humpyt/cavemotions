"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  className?: string
}

export default function TestimonialCard({ quote, author, role, className }: TestimonialCardProps) {
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
              "linear-gradient(90deg, rgba(81,232,119,0.2) 0%, rgba(81,232,119,0.2) 50%, rgba(81,232,119,0.2) 100%)",
            backgroundSize: "200% 100%",
            animation: isHovered ? "gradient-x 3s linear infinite" : "none",
          }}
        />

        <motion.div
          animate={isHovered ? { rotate: [0, -5, 0, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <QuoteIcon className="h-10 w-10 text-highlight-300" />
        </motion.div>

        <p className="mb-8 text-lg italic leading-relaxed">{quote}</p>

        <div className="flex items-center">
          <motion.div
            className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight-100"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <User className="h-6 w-6 text-highlight-700" />
          </motion.div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm opacity-70">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
