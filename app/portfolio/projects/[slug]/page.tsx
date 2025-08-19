import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, Home, LinkIcon, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioProjects } from "@/data/portfolio-projects"
import GalleryLightbox from "@/components/gallery-lightbox"

type Params = { params: Promise<{ slug: string }> }

function getProject(slug: string) {
  const items = portfolioProjects as any[]
  return items.find((p) => p.slug === slug)
}

function getProjectContent(project: any) {
  switch (project.slug) {
    case "cavmo-bulk-sms":
      return {
        overview: [
          "Cavmo Bulk SMS is a mobile-first solution that revolutionizes SMS campaign management by eliminating dependency on costly external APIs. This innovative app empowers users to autonomously launch bulk SMS campaigns using only their device's native messaging system, ensuring complete privacy, simplicity, and control over their communications.",
          "The application addresses a critical problem in the SMS marketing space: many campaign solutions depend on restrictive external services that compromise user privacy and incur ongoing costs. Cavmo Bulk SMS provides a comprehensive alternative with features including intelligent contact management from CSV/Excel files or device phonebook, flexible campaign scheduling with recurrence options, and automatic message segmentation respecting GSM and Unicode character limits.",
          "Built with a robust technical architecture featuring modular MVC/MVVM patterns, the app stores everything locally—from templates to logs—ensuring fast performance and complete data ownership. The solution is ready for cross-platform implementation on Android, iOS, or hybrid frameworks, making it a versatile choice for businesses and developers seeking reliable bulk messaging capabilities.",
        ],
        features: [
          "Native SMS Delivery - 100% device-based messaging without external APIs",
          "Advanced Contact Management - Import from CSV/Excel and device phonebook",
          "Smart Campaign Scheduling - Build recurring campaigns with logging",
          "Automatic Message Segmentation - Respects GSM and Unicode character limits",
          "Complete Offline Storage - Local SQLite/CoreData persistence layer",
          "Modular Architecture - Clean MVC/MVVM patterns for maintainability",
          "Technical Stack Ready - Data models, services, and UI flow included",
          "Permission Handling - Elegant SMS and contacts permissions with validation",
        ],
        impact: [
          "Complete data ownership and privacy with no external service dependencies",
          "Significant cost savings by eliminating third-party SMS service fees",
          "Enhanced security through local data storage and offline functionality",
          "Developer-ready architecture with modular, testable components",
          "Cross-platform deployment capability for Android, iOS, and hybrid frameworks",
          "Autonomous campaign management with full user control and customization",
        ],
        backLink: "/portfolio/category/mobile-apps",
        backText: "Back to Mobile Apps",
      }
    case "repair-pro":
      return {
        overview: [
          "Repair Pro is a comprehensive point-of-sale (POS) software solution designed specifically for shoe repair service businesses. Built to streamline operations and enhance efficiency, Repair Pro offers a powerful suite of tools that empower business owners to gain better oversight, reduce administrative burdens, save time, and lower operational costs.",
          "The software features robust order management capabilities, allowing technicians and staff to create customized service tickets and efficiently manage customer drop-off orders. With an intuitive interface, users can easily sell and manage different items, organized across three customizable tiers on a single screen, making transactions fast and accurate.",
          "As a software-only solution, Repair Pro focuses on delivering a user-friendly, secure, and scalable platform that can be integrated with existing hardware. It is ideal for repair shops looking to modernize their operations without the need for bundled hardware purchases, offering maximum flexibility and cost control.",
        ],
        features: [
          "Customized service ticket creation and management",
          "Robust order management for customer drop-offs",
          "Three-tier customizable item organization system",
          "Detailed inventory management and tracking",
          "Seamless billing and invoicing capabilities",
          "Flexible discount management system",
          "Accounts receivable tracking and management",
          "Comprehensive financial reporting and analytics",
        ],
        impact: [
          "Streamlined operations and enhanced efficiency for shoe repair businesses",
          "Reduced administrative burdens through automated order and inventory management",
          "Significant time savings with intuitive three-tier item organization",
          "Lower operational costs through comprehensive financial tracking and reporting",
          "Better business oversight with detailed analytics and accounts receivable tracking",
          "Improved customer service through efficient service ticket management",
        ],
        backLink: "/portfolio/category/software",
        backText: "Back to Software",
      }
    default:
      return {
        overview: [project.description || "This project showcases our expertise in delivering high-quality solutions."],
        features: ["Custom development", "Modern technology stack", "User-focused design"],
        impact: ["Improved user experience", "Enhanced functionality", "Successful project delivery"],
        backLink: "/portfolio",
        backText: "Back to Portfolio",
      }
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  const title = `${p.title} | Portfolio | Cave Motions`
  const description = p.description || "Detailed case study for this project built by Cave Motions."
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/portfolio/projects/${slug}`,
      images: p.image ? [{ url: p.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: p.image ? [p.image] : undefined,
    },
  }
}

export default async function ProjectDetailsPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return notFound()

  const content = getProjectContent(project)

  const gallery: string[] = Array.isArray((project as any).gallery)
    ? (project as any).gallery
    : (project as any).image
      ? [(project as any).image]
      : []

  const getCaptions = (projectSlug: string, gallery: string[]) => {
    if (projectSlug === "cavmo-bulk-sms") {
      return [
        "Main Dashboard - Quick actions for campaigns, contacts, templates, and history",
        "Create Campaign - Message composition with character counter and SMS limits",
        "Import Contacts - Multiple import options from device, CSV, or Excel files",
        "Select Recipients - Contact selection and campaign targeting interface",
      ]
    }
    return gallery.map((_, i) => `${project.title} screenshot ${i + 1}`)
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li className="flex items-center gap-2">
            <Home className="h-4 w-4" aria-hidden={true} />
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link href="/portfolio" className="hover:underline">
              Portfolio
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-foreground font-medium">{String(project.title)}</li>
        </ol>
      </nav>

      <div className="mb-6">
        <Link
          href={content.backLink}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> {content.backText}
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="sr-only">Category</span>
          <span>{String((project as any).category)}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{String(project.title)}</h1>
        <p className="mt-3 text-muted-foreground max-w-3xl">{String(project.description)}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {Array.isArray((project as any).tags) &&
            (project as any).tags.map((tag: string, i: number) => (
              <Badge key={`tag-${i}`} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
        </div>

        {(project as any).liveUrl && (
          <div className="mt-6">
            <Link
              href={(project as any).liveUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              Visit Live Demo <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        )}
      </header>

      {/* Overview and Highlights */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            {content.overview.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>At a glance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {content.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            {(project as any).liveUrl && (
              <p className="pt-2">
                Live demo:{" "}
                <Link href={(project as any).liveUrl} className="inline-flex items-center gap-1 underline">
                  {(project as any).liveUrl} <LinkIcon className="h-4 w-4" />
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Gallery with clickable preview */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Gallery</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Click any screenshot to preview. Use ← → keys to navigate, ESC to close.
        </p>
        <div className="mt-4">
          <GalleryLightbox
            images={gallery}
            captions={getCaptions(project.slug, gallery)}
            gridClassName="grid grid-cols-1 gap-4 sm:grid-cols-2"
            initialIndex={0}
          />
        </div>
      </section>

      {/* Results */}
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Impact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <ul className="list-disc pl-5 space-y-2">
              {content.impact.map((impact, index) => (
                <li key={index}>{impact}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
