"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, BarChart3, LineChart, PieChart, TrendingUp, Users, Globe, Clock } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your website performance and user engagement.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,423</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42,856</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 45s</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>1.1% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            Traffic
          </TabsTrigger>
          <TabsTrigger value="sources" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" />
            Sources
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Pages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Website traffic over the selected period</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Traffic chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Traffic sources chart would appear here</p>
                </div>
                <div className="space-y-4">
                  {[
                    { source: "Organic Search", percentage: 42, value: 6482, color: "bg-blue-500" },
                    { source: "Direct", percentage: 28, value: 4318, color: "bg-purple-500" },
                    { source: "Social Media", percentage: 18, value: 2776, color: "bg-green-500" },
                    { source: "Referral", percentage: 8, value: 1234, color: "bg-amber-500" },
                    { source: "Email", percentage: 4, value: 617, color: "bg-red-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span>{item.source}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.value.toLocaleString()}</span>
                          <span className="text-muted-foreground">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm text-muted-foreground border-b">
                  <div className="col-span-6">Page</div>
                  <div className="col-span-2 text-right">Views</div>
                  <div className="col-span-2 text-right">Avg. Time</div>
                  <div className="col-span-2 text-right">Bounce Rate</div>
                </div>
                {[
                  { page: "/", title: "Homepage", views: 8245, time: "2m 12s", bounce: "32%" },
                  { page: "/services", title: "Services", views: 4532, time: "1m 45s", bounce: "41%" },
                  {
                    page: "/blog/responsive-design",
                    title: "Responsive Design Blog Post",
                    views: 3621,
                    time: "4m 18s",
                    bounce: "28%",
                  },
                  { page: "/portfolio", title: "Portfolio", views: 2845, time: "1m 32s", bounce: "45%" },
                  { page: "/contact", title: "Contact", views: 2156, time: "1m 05s", bounce: "38%" },
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center border-b last:border-0">
                    <div className="col-span-6">
                      <div>
                        <Link href={item.page} className="font-medium hover:text-purple-600" target="_blank">
                          {item.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">{item.page}</p>
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-medium">{item.views.toLocaleString()}</div>
                    <div className="col-span-2 text-right">{item.time}</div>
                    <div className="col-span-2 text-right">{item.bounce}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Visitors by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Device breakdown chart would appear here</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { label: "Desktop", value: "58%", change: "+2%" },
                { label: "Mobile", value: "36%", change: "+5%" },
                { label: "Tablet", value: "6%", change: "-3%" },
              ].map((item, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className={`text-xs ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {item.change} from last month
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>How users interact with your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: "Avg. Pages per Session", value: "3.2", change: "+0.4", changeType: "positive" },
                { metric: "Avg. Session Duration", value: "2m 45s", change: "-15s", changeType: "negative" },
                { metric: "Bounce Rate", value: "38.2%", change: "-2.1%", changeType: "positive" },
                { metric: "New vs Returning Visitors", value: "72% / 28%", change: "+3%", changeType: "positive" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md"
                >
                  <span className="text-sm">{item.metric}</span>
                  <div className="text-right">
                    <span className="font-bold">{item.value}</span>
                    <span
                      className={`ml-2 text-xs ${item.changeType === "positive" ? "text-green-500" : "text-red-500"}`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
