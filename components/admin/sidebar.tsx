"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  PenTool,
  Users,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  ImageIcon,
} from "lucide-react"

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Pages",
      href: "/admin/pages",
      icon: <Home className="h-5 w-5" />,
      subItems: [
        { title: "Home", href: "/admin/pages/home" },
        { title: "About", href: "/admin/pages/about" },
        { title: "Services", href: "/admin/pages/services" },
        { title: "Contact", href: "/admin/pages/contact" },
      ],
    },
    {
      title: "Blog",
      href: "/admin/blog",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Portfolio",
      href: "/admin/portfolio",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Services",
      href: "/admin/services",
      icon: <PenTool className="h-5 w-5" />,
    },
    {
      title: "Media",
      href: "/admin/media",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-screen relative transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <Image src="/images/cavemo-logo.png" alt="Cave Motions Logo" width={32} height={32} />
              <span className="font-bold text-xl">Admin</span>
            </div>
          ) : (
            <Image src="/images/cavemo-logo.png" alt="Cave Motions Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <div key={index} className="mb-2">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
                  )}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
                {!collapsed && item.subItems && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                          isActive(subItem.href)
                            ? "bg-purple-50 text-purple-900 dark:bg-purple-900/10 dark:text-purple-400"
                            : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/30",
                        )}
                      >
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  )
}
