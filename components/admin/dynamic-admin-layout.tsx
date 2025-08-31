"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamic imports for admin components
const AdminProvider = dynamic(() => import("@/components/admin/admin-provider").then(mod => ({ default: mod.AdminProvider })), {
  ssr: false,
})

const AdminSidebar = dynamic(() => import("@/components/admin/sidebar"), {
  loading: () => (
    <div className="w-64 bg-gray-50 border-r">
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: false,
})

const AdminHeader = dynamic(() => import("@/components/admin/header"), {
  loading: () => (
    <div className="h-16 border-b bg-white">
      <div className="flex items-center justify-between h-full px-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  ),
  ssr: false,
})

interface DynamicAdminLayoutProps {
  children: React.ReactNode
}

export default function DynamicAdminLayout({ children }: DynamicAdminLayoutProps) {
  return (
    <Suspense fallback={
      <div className="flex h-screen">
        <div className="w-64 bg-gray-50 border-r animate-pulse" />
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b bg-white animate-pulse" />
          <div className="flex-1 p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    }>
      <AdminProvider>
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </AdminProvider>
    </Suspense>
  )
}