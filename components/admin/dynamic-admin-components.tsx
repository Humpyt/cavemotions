"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamic imports for admin pages to reduce initial bundle size
export const DynamicAdminDashboard = dynamic(() => import("@/app/admin/page"), {
  loading: () => (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64" />
    </div>
  ),
  ssr: false,
})

export const DynamicAdminBlog = dynamic(() => import("@/app/admin/blog/page"), {
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
    </div>
  ),
  ssr: false,
})

export const DynamicAdminPortfolio = dynamic(() => import("@/app/admin/portfolio/page"), {
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  ),
  ssr: false,
})

export const DynamicAdminServices = dynamic(() => import("@/app/admin/services/page"), {
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </div>
  ),
  ssr: false,
})