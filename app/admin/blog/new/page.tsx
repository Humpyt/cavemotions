"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, Upload, Eye, FileText } from "lucide-react"
import Link from "next/link"

export default function NewBlogPostPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [previewContent, setPreviewContent] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Blog post created",
      description: "Your new blog post has been created successfully.",
    })

    setIsLoading(false)
  }

  const handlePreview = () => {
    setPreviewContent(content)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Blog Post</h1>
        <p className="text-muted-foreground">Write and publish a new article on your blog.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Basic information about your blog post.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="post-url-slug"
                  value={title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "")}
                  readOnly
                />
                <p className="text-xs text-muted-foreground">Auto-generated from title</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Development">Development</option>
                  <option value="AI">AI</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <textarea
                id="excerpt"
                placeholder="Brief summary of the post..."
                className="w-full min-h-[80px] p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
              />
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200 x 630 pixels</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
            <CardDescription>Write your blog post content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="write" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="write" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-1" onClick={handlePreview}>
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{content.length} characters</span>
                  <span className="mx-2">•</span>
                  <span>{content.split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>

              <TabsContent value="write">
                <textarea
                  placeholder="Start writing your blog post here..."
                  className="w-full min-h-[400px] p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent font-mono text-sm"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="preview">
                <div className="border rounded-md p-4 min-h-[400px] prose dark:prose-invert max-w-none">
                  {previewContent ? (
                    <div dangerouslySetInnerHTML={{ __html: previewContent.replace(/\n/g, "<br />") }} />
                  ) : (
                    <div className="text-center text-muted-foreground py-20">
                      <FileText className="h-12 w-12 mx-auto opacity-20 mb-4" />
                      <p>Nothing to preview yet. Write some content first.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO & Publishing</CardTitle>
            <CardDescription>Optimize your post for search engines and set publishing options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Meta Title</Label>
              <Input id="meta-title" placeholder="SEO title (defaults to post title if empty)" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <textarea
                id="meta-description"
                placeholder="Brief description for search results..."
                className="w-full min-h-[80px] p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
              />
              <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publish-date">Publish Date</Label>
                <Input id="publish-date" type="datetime-local" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
              />
              <Label htmlFor="featured">Feature this post on the homepage</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/blog">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  )
}
