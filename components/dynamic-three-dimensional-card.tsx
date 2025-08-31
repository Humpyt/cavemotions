"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { ReactNode } from "react"

interface ThreeDimensionalCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

// Dynamic import for ThreeDimensionalCard to reduce initial bundle size
const ThreeDimensionalCard = dynamic(() => import("@/components/three-dimensional-card"), {
  loading: () => (
    <div className="animate-pulse">
      <Skeleton className="w-full h-64 rounded-2xl" />
    </div>
  ),
  ssr: false,
})

export default function DynamicThreeDimensionalCard({ children, className = "", intensity = 10 }: ThreeDimensionalCardProps) {
  return (
    <Suspense fallback={
      <div className="animate-pulse">
        <Skeleton className="w-full h-64 rounded-2xl" />
      </div>
    }>
      <ThreeDimensionalCard className={className} intensity={intensity}>
        {children}
      </ThreeDimensionalCard>
    </Suspense>
  )
}