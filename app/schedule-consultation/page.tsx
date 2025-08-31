'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, Users, CheckCircle, Star, Sparkles, MessageSquare, Phone, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Please provide some details about your project"),
})

export default function ScheduleConsultationPage() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Consultation Scheduled!",
          description: "We've received your request and will be in touch shortly.",
        })
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-20 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Digital Services Background.svg"
            alt="Digital Services Background"
            className="w-full h-full object-cover"
          />
          {/* Purple tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-violet-800/80 to-purple-900/90"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="outline">
              <Sparkles className="mr-1 h-3 w-3" /> Free Consultation
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Schedule Your Free Consultation
          </motion.h1>

          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Book a 30-minute strategy session with our digital innovation experts and discover how we can transform your business
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-white/70 text-sm">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-white/70 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24h</div>
              <div className="text-white/70 text-sm">Response Time</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="container mx-auto max-w-7xl px-4">

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl flex items-center">
                      <MessageSquare className="mr-3 h-6 w-6 text-purple-600" />
                      Consultation Request
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Tell us about your project and we'll schedule your free consultation within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="mt-2 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            {...register("firstName")}
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            className="mt-2 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            {...register("lastName")}
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>}
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="mt-2 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          {...register("email")}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
                      </motion.div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <Label htmlFor="company" className="text-sm font-semibold text-gray-700">Company *</Label>
                          <Input
                            id="company"
                            placeholder="Your Company Name"
                            className="mt-2 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            {...register("company")}
                          />
                          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message as string}</p>}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+256 700 000 000"
                            className="mt-2 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            {...register("phone")}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <Label htmlFor="projectType" className="text-sm font-semibold text-gray-700">Project Type *</Label>
                        <Controller
                          name="projectType"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="mt-2 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                                <SelectValue placeholder="Select your project type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="web-development">🌐 Web Development</SelectItem>
                                <SelectItem value="mobile-app">📱 Mobile App Development</SelectItem>
                                <SelectItem value="ai-automation">🤖 AI Automation</SelectItem>
                                <SelectItem value="software">💻 Custom Software</SelectItem>
                                <SelectItem value="consultation">💡 Strategy Consultation</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType.message as string}</p>}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Project Details *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project goals, timeline, budget range, and any specific requirements..."
                          rows={5}
                          className="mt-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                          {...register("message")}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message as string}</p>}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-14 bg-black hover:bg-gray-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Schedule Free Consultation
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Star className="mr-2 h-5 w-5 text-purple-600" />
                      What to Expect
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-white flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:scale-105">
                          <Clock className="h-5 w-5 text-black" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">30-Minute Strategy Session</p>
                          <p className="text-sm text-gray-600">Deep dive into your project goals and requirements</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-gray-800 hover:shadow-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Expert Team Insights</p>
                          <p className="text-sm text-gray-600">Get advice from our experienced developers and strategists</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-gray-50 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-black hover:shadow-xl hover:from-gray-50 hover:to-gray-100 transition-all duration-300 hover:scale-105">
                          <CheckCircle className="h-5 w-5 text-black" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Actionable Roadmap</p>
                          <p className="text-sm text-gray-600">Leave with a clear plan and next steps for your project</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-black to-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg border border-gray-300 hover:shadow-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 hover:scale-105">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-gray-600">+256 700 000 000</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-gray-900 hover:shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                          <Mail className="h-5 w-5 text-black" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-gray-600">hello@cavemotions.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-bl from-gray-200 to-gray-400 flex items-center justify-center flex-shrink-0 shadow-lg border border-black hover:shadow-xl hover:from-gray-300 hover:to-gray-500 transition-all duration-300 hover:scale-105">
                          <Clock className="h-5 w-5 text-black" />
                        </div>
                        <div>
                          <p className="font-medium">Response Time</p>
                          <p className="text-sm text-gray-600">Within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">100% Free Consultation</h3>
                      <p className="text-sm text-gray-600">No hidden fees, no obligations. Just expert advice to help you succeed.</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
