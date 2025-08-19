"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "@/components/motion"

interface ThreeDimensionalCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function ThreeDimensionalCard({ children, className = "", intensity = 10 }: ThreeDimensionalCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * intensity
    const rotateX = -((mouseY / (rect.height / 2)) * intensity)

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      {children}

      {/* Reflection/highlight effect */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: Math.abs(rotateX) + Math.abs(rotateY) > 0 ? 0.15 : 0,
          transform: "translateZ(1px)",
        }}
      />
    </motion.div>
  )
}
