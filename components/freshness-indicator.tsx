"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface FreshnessIndicatorProps {
  lastModified?: string
  showUpdateBadge?: boolean
  className?: string
}

export default function FreshnessIndicator({ 
  lastModified, 
  showUpdateBadge = true, 
  className = "" 
}: FreshnessIndicatorProps) {
  const currentDate = new Date()
  const modifiedDate = lastModified ? new Date(lastModified) : currentDate
  const daysSinceUpdate = Math.floor((currentDate.getTime() - modifiedDate.getTime()) / (1000 * 60 * 60 * 24))
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFreshnessBadge = () => {
    if (daysSinceUpdate <= 7) {
      return { text: "Recently Updated", variant: "default" as const, color: "bg-green-100 text-green-800" }
    } else if (daysSinceUpdate <= 30) {
      return { text: "Updated This Month", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" }
    } else if (daysSinceUpdate <= 90) {
      return { text: "Updated Recently", variant: "outline" as const, color: "bg-gray-100 text-gray-800" }
    }
    return null
  }

  const freshnessBadge = getFreshnessBadge()

  return (
    <motion.div 
      className={`flex items-center gap-4 text-sm text-gray-600 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>Last updated: {formatDate(modifiedDate)}</span>
      </div>
      
      {showUpdateBadge && freshnessBadge && (
        <Badge className={freshnessBadge.color} variant={freshnessBadge.variant}>
          <Clock className="mr-1 h-3 w-3" />
          {freshnessBadge.text}
        </Badge>
      )}
    </motion.div>
  )
}

// Export utility function to get current timestamp for pages
export const getCurrentTimestamp = () => {
  return new Date().toISOString()
}

// Export utility function to format dates for meta tags
export const formatDateForMeta = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toISOString()
}