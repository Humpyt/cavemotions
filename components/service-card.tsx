"use client"

import { useState } from "react"
import { Brain, Code, PuzzleIcon as PuzzlePiece, Smartphone, Check, ArrowRight, type LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"

interface ServiceCardProps {
  icon: "Brain" | "Code" | "PuzzlePiece" | "Smartphone"
  title: string
  description: string
  features: string[]
  className?: string
  iconClassName?: string
  href?: string
  gradient?: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  className,
  iconClassName,
  href,
  gradient = "from-purple-500 to-pink-500",
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent: Record<string, LucideIcon> = {
    Brain,
    Code,
    PuzzlePiece,
    Smartphone,
  }

  const Icon = IconComponent[icon]

  const cardContent = (
    <Card
      className={cn(
        "group relative h-full overflow-hidden border-0 bg-white/10 backdrop-blur-sm shadow-xl transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl border border-white/10",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-highlight-400 via-white to-highlight-400" />
        <div className="absolute inset-[1px] rounded-2xl bg-white/10 backdrop-blur-sm" />
      </div>

      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-highlight-500/10 to-highlight-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <CardHeader className="relative z-10 pb-4">
        <motion.div
          className={cn(
            "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg",
            iconClassName || "bg-black",
          )}
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>
        <CardTitle className="text-2xl font-bold text-white group-hover:text-highlight-400 transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-base text-white/70 leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 pt-0">
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className="mr-3 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black"
              >
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-white/80">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm font-semibold text-white">
            <span className="mr-2">Learn more</span>
            <motion.div
              className="h-px bg-gradient-to-r from-highlight-400 to-highlight-300"
              animate={{ width: isHovered ? 32 : 16 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div animate={{ x: isHovered ? 8 : 0, opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowRight className="ml-1 h-4 w-4" />
            </motion.div>
          </div>

          {/* Floating action button */}
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-highlight-500 to-highlight-400 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
            animate={{ scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </CardContent>

      {/* Decorative elements */}
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-highlight-500/20 to-highlight-400/20 opacity-10 transition-opacity duration-500 group-hover:opacity-30"
      />
      <div
        className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-gradient-to-br from-highlight-400/20 to-highlight-300/20 opacity-5 transition-opacity duration-500 group-hover:opacity-25"
      />
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
