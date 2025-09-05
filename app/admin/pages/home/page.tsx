"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Save, Eye, ArrowLeft, ImageIcon, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function EditHomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [heroTitle, setHeroTitle] = useState("Premium Digital Innovation Studio")
  const [heroSubtitle, setHeroSubtitle] = useState(
    "We create cutting-edge digital solutions that transform businesses and drive growth.",
  )
  const [aboutTitle, setAboutTitle] = useState("About Cave Motions")
  const [aboutContent, setAboutContent] = useState(
    "Cave Motions is a premium digital innovation studio founded by Sam Altman, offering AI automation, web development, software development, and mobile application services.",
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would send this data to your API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log({
        heroTitle,
        heroSubtitle,
        aboutTitle,
        aboutContent,
      })

      alert("Homepage content updated successfully!")
    } catch (error) {
      console.error("Error updating content:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/pages">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Homepage</h1>
        <p className="text-muted-foreground">Update your website's homepage content.</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="services">Services Section</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="cta">Call to Action</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Update the main banner section of your homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroTitle">Title</Label>
                  <Input id="heroTitle" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="heroSubtitle">Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Background Image</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex-grow text-center">
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop or <span className="text-primary">browse</span>
                        </p>
                      </div>
                    </div>
                    <div className="relative h-20 w-32 rounded-md overflow-hidden">
                      <img src="/placeholder.svg" alt="Hero" className="h-full w-full object-cover" />
                      <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-5 w-5 rounded-full">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="ctaText">Call to Action Button</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="ctaText" placeholder="Button text" defaultValue="Get Started" />
                    <Input id="ctaLink" placeholder="Button link" defaultValue="/contact" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Update the about section of your homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aboutTitle">Title</Label>
                  <Input id="aboutTitle" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="aboutContent">Content</Label>
                  <Textarea
                    id="aboutContent"
                    value={aboutContent}
                    onChange={(e) => setAboutContent(e.target.value)}
                    rows={5}
                  />
                </div>
                <div>
                  <Label>About Image</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex-grow text-center">
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop or <span className="text-primary">browse</span>
                        </p>
                      </div>
                    </div>
                    <div className="relative h-20 w-32 rounded-md overflow-hidden">
                      <img src="/placeholder.svg" alt="About section preview image" className="h-full w-full object-cover" />
                      <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-5 w-5 rounded-full">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Services Section</CardTitle>
                <CardDescription>Manage the services displayed on your homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="servicesTitle">Section Title</Label>
                  <Input id="servicesTitle" defaultValue="Our Services" />
                </div>
                <div>
                  <Label htmlFor="servicesDescription">Section Description</Label>
                  <Textarea
                    id="servicesDescription"
                    defaultValue="We offer a wide range of digital services to help your business grow and succeed in the digital landscape."
                    rows={3}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Featured Services</Label>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {["AI Automation", "Web Development", "Software Development", "Mobile Applications"].map(
                      (service, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400">
                              {service.charAt(0)}
                            </div>
                            <span>{service}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost">
                              Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Section</CardTitle>
                <CardDescription>Manage client testimonials displayed on your homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="testimonialsTitle">Section Title</Label>
                  <Input id="testimonialsTitle" defaultValue="What Our Clients Say" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Testimonials</Label>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        name: "John Smith",
                        role: "CEO at TechCorp",
                        text: "Working with Cave Motions transformed our business. Their AI solutions helped us increase efficiency by 40%.",
                      },
                      {
                        name: "Sarah Johnson",
                        role: "Marketing Director",
                        text: "The website Cave Motions built for us has significantly increased our conversion rates and user engagement.",
                      },
                      {
                        name: "Michael Brown",
                        role: "Product Manager",
                        text: "Their mobile app development team delivered a flawless product that our customers love. Highly recommended!",
                      },
                    ].map((testimonial, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost">
                              Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                              Remove
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm">{testimonial.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="cta" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Call to Action Section</CardTitle>
                <CardDescription>Update the CTA section at the bottom of your homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ctaTitle">Title</Label>
                  <Input id="ctaTitle" defaultValue="Ready to Transform Your Business?" />
                </div>
                <div>
                  <Label htmlFor="ctaDescription">Description</Label>
                  <Textarea
                    id="ctaDescription"
                    defaultValue="Get in touch with our team to discuss how we can help you achieve your digital goals."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>CTA Buttons</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm font-medium mb-2">Primary Button</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Button text" defaultValue="Contact Us" />
                        <Input placeholder="Button link" defaultValue="/contact" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Secondary Button</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Button text" defaultValue="Learn More" />
                        <Input placeholder="Button link" defaultValue="/services" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Background Style</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="border rounded-md p-4 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white cursor-pointer">
                      Gradient
                    </div>
                    <div className="border rounded-md p-4 flex items-center justify-center bg-purple-600 text-white cursor-pointer">
                      Solid Color
                    </div>
                    <div className="border rounded-md p-4 flex items-center justify-center bg-white text-gray-800 cursor-pointer">
                      Light
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
