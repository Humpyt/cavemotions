"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1 text-sm text-gray-600", className)}>
      <Link 
        href="/" 
        className="flex items-center hover:text-purple-600 transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-purple-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Breadcrumb Schema Component
interface BreadcrumbSchemaProps {
  items: Array<{ label: string; href: string }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schemaItems = [
    { name: "Home", item: "https://cavemotions.com" },
    ...items.map(item => ({
      name: item.label,
      item: `https://cavemotions.com${item.href}`
    }))
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
