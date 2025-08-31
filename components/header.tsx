"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Import Image component
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  ShoppingCart,
  FileCode,
  Palette,
  BarChart,
  Database,
  Zap,
  Star,
  ArrowRight,
  Sparkles,
  FolderOpen,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Navigation items
const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services", hasMegaMenu: true },
  { name: "Portfolio", path: "/portfolio", hasMegaMenu: true },
  { name: "Blog", path: "/blog-wp" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Skip if no mega menu is active
      if (!activeMegaMenu) return

      const target = e.target as HTMLElement

      // Don't close if clicking on a mega menu trigger
      if (target.closest("[data-mega-menu-trigger]")) {
        return
      }

      // Don't close if clicking inside the mega menu
      if (target.closest(".mega-menu-content")) {
        return
      }

      setActiveMegaMenu(null)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeMegaMenu])

  // Close mega menu when pressing Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMegaMenu(null)
      }
    }

    if (activeMegaMenu) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [activeMegaMenu])

  // Close mega menu when navigating
  useEffect(() => {
    setActiveMegaMenu(null)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleMegaMenu = (name: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveMegaMenu(activeMegaMenu === name ? null : name)
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  // Services mega menu content
  const ServicesMegaMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8">
      {/* Main Services Column */}
      <div className="md:col-span-4">
        <h3 className="text-lg font-semibold mb-4 text-purple-700 flex items-center">
          <Layers className="h-5 w-5 mr-2 text-purple-600" />
          Our Services
        </h3>
        <ul className="space-y-3">
          {[
            {
              icon: Globe,
              name: "Web Development",
              path: "/services/web-development",
              desc: "Responsive websites & web apps",
            },
            {
              icon: Smartphone,
              name: "Mobile Applications",
              path: "/services/mobile-applications",
              desc: "iOS & Android development",
            },
            {
              icon: Cpu,
              name: "AI Automation",
              path: "/services/ai-automation",
              desc: "Intelligent automation solutions",
            },
            {
              icon: Layers,
              name: "Software Development",
              path: "/services/software-development",
              desc: "Custom software solutions",
            },
          ].map((service) => (
            <li key={service.name}>
              <Link
                href={service.path}
                className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors group border border-transparent hover:border-purple-100"
                onClick={() => setActiveMegaMenu(null)}
              >
                <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                  <service.icon className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <span className="font-medium text-gray-800 block">{service.name}</span>
                  <span className="text-xs text-gray-500">{service.desc}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Specialized Services Column */}
      <div className="md:col-span-4">
        <h3 className="text-lg font-semibold mb-4 text-purple-700 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-purple-600" />
          Specialized Solutions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              name: "E-commerce",
              path: "/services/e-commerce",
              icon: ShoppingCart,
              color: "bg-pink-100 text-pink-700",
            },
            {
              name: "Business Intelligence",
              path: "/services/business-intelligence",
              icon: BarChart,
              color: "bg-blue-100 text-blue-700",
            },
            {
              name: "Database Management",
              path: "/services/database-management",
              icon: Database,
              color: "bg-green-100 text-green-700",
            },
            {
              name: "API Development",
              path: "/services/api-development",
              icon: FileCode,
              color: "bg-amber-100 text-amber-700",
            },
            {
              name: "UI/UX Design",
              path: "/services/ui-ux-design",
              icon: Palette,
              color: "bg-indigo-100 text-indigo-700",
            },
            {
              name: "Performance",
              path: "/services/performance-optimization",
              icon: Zap,
              color: "bg-orange-100 text-orange-700",
            },
          ].map((service) => (
            <span
              key={service.name}
              className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-purple-50 transition-colors text-center border border-transparent hover:border-purple-100 h-24 cursor-default"
            >
              <div className={`w-8 h-8 rounded-full ${service.color} flex items-center justify-center mb-2`}>
                <service.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">{service.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Service */}
      <div className="md:col-span-4 relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -mb-8 -ml-8"></div>

        <div className="relative z-10">
          <Badge className="bg-white/20 text-white border-0 mb-4">
            <Sparkles className="h-3 w-3 mr-1" /> Featured Service
          </Badge>
          <h3 className="text-xl font-bold mb-2">AI-Powered Solutions</h3>
          <p className="text-white/80 mb-4">
            Transform your business with our cutting-edge AI automation services. Streamline operations and boost
            efficiency.
          </p>
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            onClick={() => setActiveMegaMenu(null)}
            asChild
          >
            <Link href="/services/ai-automation">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )

  // Portfolio mega menu content
  const PortfolioMegaMenu = () => (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-4 text-purple-700 flex items-center">
            <Layers className="h-5 w-5 mr-2 text-purple-600" />
            Categories
          </h3>
          <ul className="space-y-1 border-l-2 border-purple-100">
            {[
              { name: "All Projects", path: "/portfolio" },
              { name: "Web Development", path: "/portfolio/category/web-development" },
              { name: "Mobile Apps", path: "/portfolio/category/mobile-apps" },
              { name: "AI Solutions", path: "/portfolio/category/ai-solutions" },
              { name: "Software Projects", path: "/portfolio/category/software" },
            ].map((category) => (
              <li key={category.name}>
                <Link
                  href={category.path}
                  className={cn(
                    "block py-2 pl-4 -ml-0.5 border-l-2 hover:border-purple-500 transition-colors",
                    isActive(category.path)
                      ? "border-purple-500 text-purple-700 font-medium"
                      : "border-transparent text-gray-700",
                  )}
                  onClick={() => setActiveMegaMenu(null)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Projects */}
        <div className="md:w-3/4">
          <h3 className="text-lg font-semibold mb-4 text-purple-700 flex items-center">
            <Star className="h-5 w-5 mr-2 text-purple-600" />
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "WAIB - Innovation in Aquaculture",
                description: "Sustainable aquaculture platform promoting modern techniques and eco-friendly practices",
                path: "/portfolio/category/web-development",
                image: "/images/waib-aquaculture.png",
                tag: "Web Development",
              },
              {
                name: "Cavemo SACCO Management",
                description: "Comprehensive financial management system for Ugandan SACCOs with modern web interface",
                path: "/portfolio/category/software",
                image: "/images/cavemo-sacco-featured.png",
                tag: "Software Development",
              },
              {
                name: "Cavemo Bulk SMS",
                description: "Privacy-focused native SMS campaign solution with offline storage capabilities",
                path: "/portfolio/projects/cavmo-bulk-sms",
                image: "/images/bulksms.jpg",
                tag: "Mobile Apps",
              },
            ].map((project) => (
              <Link
                key={project.name}
                href={project.path}
                className="group block rounded-lg overflow-hidden border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all duration-300"
                onClick={() => setActiveMegaMenu(null)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-white/80 text-purple-700 hover:bg-white/90">{project.tag}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        "bg-white/95 backdrop-blur-md shadow-sm py-2", // Always use white background instead of conditional purple/white
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="hover:scale-105 transition-transform">
                {/* Use Image component for the logo */}
                <Image
                  src="/images/cavemo-logo.png"
                  alt="Cave Motions Logo"
                  width={120}
                  height={74}
                  priority
                  sizes="120px"
                  className="transition-opacity duration-300 opacity-100"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.hasMegaMenu ? (
                  <button
                    onClick={(e) => toggleMegaMenu(item.name, e)}
                    className={cn(
                      "flex items-center text-sm font-medium transition-colors hover:text-purple-700 relative",
                      isActive(item.path) ? "text-purple-500 font-semibold" : "text-gray-800", // Always use dark text since background is always white
                    )}
                    aria-expanded={activeMegaMenu === item.name}
                    data-mega-menu-trigger={item.name}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeMegaMenu === item.name ? "rotate-180" : "",
                      )}
                    />
                    {isActive(item.path) && (
                      <span className="absolute -bottom-1 left-0 h-0.5 bg-purple-700 w-full"></span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-purple-700 relative",
                      isActive(item.path) ? "text-purple-500 font-semibold" : "text-gray-800", // Always use dark text since background is always white
                    )}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <span className="absolute -bottom-1 left-0 h-0.5 bg-purple-700 w-full"></span>
                    )}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <div>
              <Button
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 rounded-full px-6"
                asChild
              >
                <Link href="/get-started">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-700 to-violet-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" /> // Always use dark text since background is always white
            ) : (
              <Menu className="h-6 w-6 text-gray-800" /> // Always use dark text since background is always white
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {activeMegaMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setActiveMegaMenu(null)}
            aria-hidden="true"
          />

          {/* Mega Menu Content */}
          <div
            className="absolute left-0 right-0 z-50 mega-menu-content"
            style={{
              top: document.querySelector("header")?.getBoundingClientRect().height || 0,
            }}
          >
            <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden my-2">
                {/* Menu Header */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-gray-100 py-3 px-8 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-purple-800">
                    {activeMegaMenu === "Services" ? "Our Services" : "Our Portfolio"}
                  </h2>
                  <button
                    onClick={() => setActiveMegaMenu(null)}
                    className="text-gray-500 hover:text-purple-700 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Menu Content */}
                {activeMegaMenu === "Services" && <ServicesMegaMenu />}
                {activeMegaMenu === "Portfolio" && <PortfolioMegaMenu />}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6 bg-white shadow-lg">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  href={item.path}
                  className={`text-sm font-medium transition-colors hover:text-purple-700 ${
                    isActive(item.path) ? "text-purple-700" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div>
              <Button
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 w-full"
                asChild
              >
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
