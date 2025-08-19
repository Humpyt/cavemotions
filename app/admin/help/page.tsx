"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Search, HelpCircle, MessageSquare, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmitQuestion = () => {
    toast({
      title: "Question submitted",
      description: "We'll get back to you as soon as possible.",
    })
  }

  const faqs = [
    {
      question: "How do I create a new blog post?",
      answer:
        "To create a new blog post, navigate to the Blog section in the sidebar, then click on the 'New Post' button. Fill in the required fields and click 'Publish' when you're ready to make it live.",
    },
    {
      question: "How can I change my password?",
      answer:
        "You can change your password by going to your Profile page, clicking on the 'Password' tab, and entering your current password followed by your new password.",
    },
    {
      question: "How do I add a new user to the admin panel?",
      answer:
        "To add a new user, go to Settings > Users and click on the 'Add New User' button. Fill in the user's details, assign them a role, and click 'Create User'.",
    },
    {
      question: "Can I schedule blog posts for future publication?",
      answer:
        "Yes, when creating or editing a blog post, you can set a future publication date and time. The post will automatically go live at the scheduled time.",
    },
    {
      question: "How do I add a new service to the website?",
      answer:
        "Navigate to the Services section in the sidebar, click on 'New Service', fill in the service details including title, description, and icon, then click 'Save'.",
    },
    {
      question: "How can I view website analytics?",
      answer:
        "You can view website analytics by clicking on the Analytics section in the sidebar. This will show you visitor statistics, popular pages, and other important metrics.",
    },
    {
      question: "How do I update the homepage content?",
      answer:
        "To update the homepage content, go to Pages > Home in the sidebar. You can then edit different sections of the homepage including the hero, about, services, and testimonials sections.",
    },
  ]

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions or contact support.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Find answers to common questions about using the admin dashboard.</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground">Try a different search term or browse all FAQs.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Get help from our support team.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What do you need help with?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    className="w-full min-h-[100px] p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                  />
                </div>
                <Button onClick={handleSubmitQuestion} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Submit Question
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Helpful documentation and guides.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="flex items-center text-purple-600 hover:underline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Admin User Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center text-purple-600 hover:underline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Content Management Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center text-purple-600 hover:underline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    SEO Best Practices
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center text-purple-600 hover:underline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Video Tutorials
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
