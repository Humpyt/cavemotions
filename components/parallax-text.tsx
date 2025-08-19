"use client"

import type React from "react"

import { useRef } from "react"
import { useScroll, useSpring, useTransform, motion, useMotionValue } from "framer-motion"
import { useAnimationFrame } from "@/hooks/use-animation-frame"

interface ParallaxProps {
  children: React.ReactNode
  baseVelocity: number
}

export default function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(v, -20, -45)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div className="flex flex-nowrap text-4xl font-bold tracking-tight text-white/10" style={{ x }}>
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
      </motion.div>
    </div>
  )
}

function wrap(value: number, min: number, max: number): number {
  const range = max - min
  const output = ((((value - min) % range) + range) % range) + min
  return output
}

function useVelocity(value: any) {
  const velocityX = useMotionValue(0)
  const previousValue = useRef(value.get())

  useAnimationFrame(() => {
    const currentValue = value.get()
    const delta = currentValue - previousValue.current
    velocityX.set(delta * 100) // Adjust multiplier as needed
    previousValue.current = currentValue
  })

  return velocityX
}
