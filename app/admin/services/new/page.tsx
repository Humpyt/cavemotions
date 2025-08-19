"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, Bot, Globe, Code, Smartphone, Palette, Database } from "lucide-react"
import Link from "next/link"

export default function NewServicePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Service created",
      description: "Your new service has been created successfully.",
    })

    setIsLoading(false)
  }

  const icons = [
    { name: "Bot", component: <Bot className="h-6 w-6" />, label: "AI / Bot" },
    { name: "Globe", component: <Globe className="h-6 w-6" />, label: "Web" },
    { name: "Code", component: <Code className="h-6 w-6" />, label: "Code" },
    { name: "Smartphone", component: <Smartphone className="h-6 w-6" />, label: "Mobile" },
    { name: "Palette", component: <Palette className="h-6 w-6" />, label: "Design" },
    { name: "Database", component: <Database className="h-6 w-6" />, label: "Database" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Service</h1>
        <p className="text-muted-foreground">Create a new service offering for your business.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>Basic information about your service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input id="title" placeholder="Enter service title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="service-url-slug" />
              <p className="text-xs text-muted-foreground">URL-friendly version of the title</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short-description">Short Description</Label>
              <Input id="short-description" placeholder="Brief description of the service" required />
              <p className="text-xs text-muted-foreground">This will appear in service cards and listings</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full-description">Full Description</Label>
              <textarea
                id="full-description"
                placeholder="Detailed description of the service..."
                className="w-full min-h-[150px] p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Icon</CardTitle>
            <CardDescription>Choose an icon to represent this service.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {icons.map((icon) => (
                <div
                  key={icon.name}
                  className={`border rounded-md p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    selectedIcon === icon.name ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : ""
                  }`}
                  onClick={() => setSelectedIcon(icon.name)}
                >
                  <div className="text-purple-600 dark:text-purple-400">{icon.component}</div>
                  <span className="text-xs text-center">{icon.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Label>Custom Icon (SVG)</Label>
              <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 mt-2 text-center">
                <p className="text-sm text-muted-foreground">Upload a custom SVG icon or paste SVG code</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Features</CardTitle>
            <CardDescription>List the key features of this service.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex gap-2">
                  <Input placeholder={`Feature ${index}`} className="flex-1" />
                  {index > 3 ? (
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  ) : null}
                </div>
              ))}

              <Button variant="outline" type="button" className="w-full">
                Add Feature
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
            <CardDescription>Configure how this service appears on your website.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Featured Service</Label>
                <p className="text-sm text-muted-foreground">Display prominently on the homepage</p>
              </div>
              <Switch id="featured" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="published">Published</Label>
                <p className="text-sm text-muted-foreground">Make this service visible on your website</p>
              </div>
              <Switch id="published" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input id="order" type="number" min="1" defaultValue="1" />
              <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/services">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Creating..." : "Create Service"}
          </Button>
        </div>
      </form>
    </div>
  )
}
