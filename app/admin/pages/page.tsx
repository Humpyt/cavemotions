"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Search, PenTool, Home, User, Briefcase, Phone, FileText, Settings } from "lucide-react"

export default function PagesAdmin() {
  const [searchTerm, setSearchTerm] = useState("")

  const pages = [
    {
      id: "home",
      title: "Homepage",
      description: "Main landing page",
      icon: <Home className="h-5 w-5 text-purple-500" />,
      path: "/admin/pages/home",
    },
    {
      id: "about",
      title: "About",
      description: "About us page",
      icon: <User className="h-5 w-5 text-blue-500" />,
      path: "/admin/pages/about",
    },
    {
      id: "services",
      title: "Services",
      description: "Services overview page",
      icon: <PenTool className="h-5 w-5 text-green-500" />,
      path: "/admin/pages/services",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Portfolio showcase page",
      icon: <Briefcase className="h-5 w-5 text-amber-500" />,
      path: "/admin/pages/portfolio",
    },
    {
      id: "contact",
      title: "Contact",
      description: "Contact information page",
      icon: <Phone className="h-5 w-5 text-red-500" />,
      path: "/admin/pages/contact",
    },
    {
      id: "blog",
      title: "Blog",
      description: "Blog listing page",
      icon: <FileText className="h-5 w-5 text-indigo-500" />,
      path: "/admin/pages/blog",
    },
  ]

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage your website pages.</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <PenTool className="h-4 w-4 mr-2" />
            New Page
          </Link>
        </Button>
      </div>

      <div className="relative w-full md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search pages..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {page.icon}
                  <CardTitle>{page.title}</CardTitle>
                </div>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Page Preview</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={page.id === "home" ? "/" : `/${page.id}`} target="_blank">
                    View
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={page.path}>Edit</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-500" />
              <CardTitle>Page Settings</CardTitle>
            </div>
            <CardDescription>Global settings for all pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Meta Title</label>
              <Input defaultValue="Cave Motions | Premium Digital Innovation Studio" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Meta Description</label>
              <Input defaultValue="Cave Motions is a premium digital innovation studio offering AI automation, web development, software development, and mobile application services." />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
