"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Users,
  Briefcase,
  PenTool,
  Eye,
  TrendingUp,
  Clock,
  Calendar,
  Globe,
  MessageSquare,
  Mail,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/components/admin/admin-provider"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const { isAuthenticated, user, loading } = useAdmin()
  const router = useRouter()
  const { toast } = useToast()
  const [pageViews, setPageViews] = useState(0)
  const [blogPosts, setBlogPosts] = useState(0)
  const [portfolioItems, setPortfolioItems] = useState(0)
  const [services, setServices] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be API calls
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setPageViews(15423)
        setBlogPosts(12)
        setPortfolioItems(8)
        setServices(4)

        toast({
          title: "Dashboard updated",
          description: "Latest data has been loaded successfully",
        })
      } catch (error) {
        console.error("Error loading dashboard data:", error)
        toast({
          title: "Error loading data",
          description: "There was a problem loading the dashboard data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated, toast])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-600 border-b-purple-600 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your website today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              View Site
            </Link>
          </Button>
          <Button size="sm" onClick={() => router.push("/admin/settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUpVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : pageViews.toLocaleString()}</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+12% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUpVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : blogPosts}</div>
              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-xs text-muted-foreground">Last post 2 days ago</span>
                </div>
                <Link href="/admin/blog" className="text-purple-600 hover:underline text-xs flex items-center gap-1">
                  Manage <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeInUpVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : portfolioItems}</div>
              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-muted-foreground">2 new this month</span>
                </div>
                <Link
                  href="/admin/portfolio"
                  className="text-purple-600 hover:underline text-xs flex items-center gap-1"
                >
                  Manage <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeInUpVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : services}</div>
              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-xs text-muted-foreground">All active</span>
                </div>
                <Link
                  href="/admin/services"
                  className="text-purple-600 hover:underline text-xs flex items-center gap-1"
                >
                  Manage <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeInUpVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>Traffic sources and page views for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4 py-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">Organic Search</span>
                      </div>
                      <span className="text-sm font-medium">8,245</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Direct</span>
                      </div>
                      <span className="text-sm font-medium">3,487</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Social Media</span>
                      </div>
                      <span className="text-sm font-medium">2,856</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm">Referral</span>
                      </div>
                      <span className="text-sm font-medium">835</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeInUpVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes to your website content</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4 py-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    {
                      action: "Blog post published",
                      item: "Responsive Design Best Practices",
                      time: "2 hours ago",
                      icon: <FileText className="h-4 w-4 text-purple-500" />,
                    },
                    {
                      action: "Portfolio item updated",
                      item: "AI-Powered E-commerce Platform",
                      time: "1 day ago",
                      icon: <Briefcase className="h-4 w-4 text-blue-500" />,
                    },
                    {
                      action: "Service page edited",
                      item: "Web Development",
                      time: "2 days ago",
                      icon: <PenTool className="h-4 w-4 text-green-500" />,
                    },
                    {
                      action: "New testimonial added",
                      item: "John Smith - CEO at TechCorp",
                      time: "3 days ago",
                      icon: <MessageSquare className="h-4 w-4 text-amber-500" />,
                    },
                    {
                      action: "Homepage hero updated",
                      item: "Main banner content",
                      time: "1 week ago",
                      icon: <Globe className="h-4 w-4 text-indigo-500" />,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{item.icon}</div>
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">{item.item}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks and deadlines for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ) : (
                  [
                    {
                      task: "Update service descriptions",
                      deadline: "Tomorrow",
                      status: "In Progress",
                      priority: "High",
                    },
                    {
                      task: "Add new portfolio project",
                      deadline: "May 25, 2023",
                      status: "Not Started",
                      priority: "Medium",
                    },
                    { task: "Review blog comments", deadline: "May 26, 2023", status: "Not Started", priority: "Low" },
                    {
                      task: "Update privacy policy",
                      deadline: "May 30, 2023",
                      status: "Not Started",
                      priority: "Medium",
                    },
                  ].map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{task.task}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">{task.deadline}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">{task.status}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : task.priority === "Medium"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {task.priority}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                  <Link href="/admin/blog/new">
                    <FileText className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Create Blog Post</div>
                      <div className="text-xs text-muted-foreground">Add a new article to your blog</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                  <Link href="/admin/portfolio/new">
                    <Briefcase className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Add Portfolio Item</div>
                      <div className="text-xs text-muted-foreground">Showcase a new project</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                  <Link href="/admin/pages/home">
                    <PenTool className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Edit Homepage</div>
                      <div className="text-xs text-muted-foreground">Update your main landing page</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                  <Link href="/admin/settings">
                    <Users className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Manage Users</div>
                      <div className="text-xs text-muted-foreground">Add or edit admin users</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ) : (
                  [
                    {
                      message: "New contact form submission",
                      time: "10 minutes ago",
                      type: "info",
                      icon: <Mail className="h-4 w-4 text-blue-500" />,
                    },
                    {
                      message: "System update scheduled for May 28",
                      time: "2 hours ago",
                      type: "warning",
                      icon: <Bell className="h-4 w-4 text-amber-500" />,
                    },
                    {
                      message: "New comment on 'Responsive Design' blog post",
                      time: "Yesterday",
                      type: "info",
                      icon: <MessageSquare className="h-4 w-4 text-purple-500" />,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0"
                    >
                      <div
                        className={`mt-0.5 p-1.5 rounded-full ${
                          notification.type === "info"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : notification.type === "warning"
                              ? "bg-amber-100 dark:bg-amber-900/30"
                              : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{notification.message}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-purple-600">
                          View details
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
