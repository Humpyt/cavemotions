"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Search, Upload, Grid, List, MoreHorizontal, Image, FileText, Film, Music, File, Filter } from "lucide-react"

export default function MediaLibraryPage() {
  const { toast } = useToast()
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleUpload = () => {
    toast({
      title: "Upload started",
      description: "Your files are being uploaded.",
    })
  }

  // Sample media items
  const mediaItems = [
    {
      id: 1,
      name: "hero-image.jpg",
      type: "image",
      size: "1.2 MB",
      date: "2023-05-15",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      name: "about-team.jpg",
      type: "image",
      size: "0.8 MB",
      date: "2023-05-10",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      name: "product-brochure.pdf",
      type: "document",
      size: "2.4 MB",
      date: "2023-05-05",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      name: "promotional-video.mp4",
      type: "video",
      size: "15.7 MB",
      date: "2023-04-28",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      name: "logo-dark.svg",
      type: "image",
      size: "0.1 MB",
      date: "2023-04-20",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      name: "background-music.mp3",
      type: "audio",
      size: "3.5 MB",
      date: "2023-04-15",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 7,
      name: "portfolio-1.jpg",
      type: "image",
      size: "1.5 MB",
      date: "2023-04-10",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 8,
      name: "portfolio-2.jpg",
      type: "image",
      size: "1.7 MB",
      date: "2023-04-05",
      url: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 9,
      name: "terms-of-service.docx",
      type: "document",
      size: "0.3 MB",
      date: "2023-03-28",
      url: "/placeholder.svg?height=400&width=600",
    },
  ]

  const filteredItems = mediaItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedType || item.type === selectedType),
  )

  const getIconForType = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-5 w-5 text-blue-500" />
      case "document":
        return <FileText className="h-5 w-5 text-green-500" />
      case "video":
        return <Film className="h-5 w-5 text-red-500" />
      case "audio":
        return <Music className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your images, videos, and documents.</p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setSelectedType(null)}>
              All Files
            </TabsTrigger>
            <TabsTrigger value="images" onClick={() => setSelectedType("image")}>
              Images
            </TabsTrigger>
            <TabsTrigger value="documents" onClick={() => setSelectedType("document")}>
              Documents
            </TabsTrigger>
            <TabsTrigger value="videos" onClick={() => setSelectedType("video")}>
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio" onClick={() => setSelectedType("audio")}>
              Audio
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("grid")}
              className={view === "grid" ? "bg-muted" : ""}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("list")}
              className={view === "list" ? "bg-muted" : ""}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <File className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium">No files found</h3>
                <p className="text-muted-foreground">Try a different search term or upload new files.</p>
              </CardContent>
            </Card>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                    {item.type === "image" ? (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">{getIconForType(item.type)}</div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.size}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm text-muted-foreground">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-1"></div>
                  </div>
                  {filteredItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                      <div className="col-span-5 flex items-center gap-3">
                        {getIconForType(item.type)}
                        <span className="truncate">{item.name}</span>
                      </div>
                      <div className="col-span-2 capitalize">{item.type}</div>
                      <div className="col-span-2">{item.size}</div>
                      <div className="col-span-2">{item.date}</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Other tab contents would be similar but filtered by type */}
        <TabsContent value="images" className="space-y-4">
          {/* Similar content as "all" but filtered for images */}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          {/* Similar content as "all" but filtered for documents */}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {/* Similar content as "all" but filtered for videos */}
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          {/* Similar content as "all" but filtered for audio */}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Your media storage usage and limits.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: 27.2 MB</span>
                <span>Total: 1 GB</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: "2.7%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground">2.7% of your storage used</p>
            </div>

            <Button variant="outline" className="w-full">
              Upgrade Storage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
