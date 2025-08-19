"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/components/admin/admin-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Moon, Sun, User, Settings, LogOut, HelpCircle, Eye } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function AdminHeader() {
  const { setTheme, theme } = useTheme()
  const [notifications] = useState(3)
  const { user, logout, isAuthenticated } = useAdmin()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isAuthenticated || pathname === "/admin/login") {
    return null
  }

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center px-4 md:px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="md:hidden">
          {/* Mobile breadcrumb */}
          <h2 className="text-sm font-medium">
            {pathname === "/admin"
              ? "Dashboard"
              : (() => {
                  const lastSegment = pathname.split("/").pop();
                  return lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : "Page";
                })()}
          </h2>
        </div>
        <div className="hidden md:block">
          {/* Desktop breadcrumb */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                >
                  Dashboard
                </Link>
              </li>
              {pathname !== "/admin" &&
                pathname
                  .split("/")
                  .filter((p) => p && p !== "admin")
                  .map((part, i, arr) => (
                    <li key={i}>
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-gray-400 mx-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                        <Link
                          href={`/admin/${arr.slice(0, i + 1).join("/")}`}
                          className="ml-1 text-sm font-medium text-gray-700 hover:text-purple-600 md:ml-2 dark:text-gray-400 dark:hover:text-purple-400"
                        >
                          {part.charAt(0).toUpperCase() + part.slice(1)}
                        </Link>
                      </div>
                    </li>
                  ))}
            </ol>
          </nav>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/" target="_blank" className="hidden md:flex items-center gap-1">
            <Eye className="h-4 w-4" />
            View Site
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block font-normal">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="cursor-pointer flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="cursor-pointer flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/help" className="cursor-pointer flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
