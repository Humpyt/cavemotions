import type { Metadata } from "next"
import Link from "next/link"
import { portfolioProjects } from "@/data/portfolio-projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Web Development Portfolio | Cave Motions",
  description:
    "Explore Cave Motions' web development portfolio, showcasing responsive websites, e-commerce platforms, publications, and manufacturing websites.",
  alternates: {
    canonical: "/portfolio/category/web-development",
  },
  openGraph: {
    title: "Web Development Portfolio | Cave Motions",
    description:
      "Explore Cave Motions' web development portfolio, showcasing responsive websites, e-commerce platforms, publications, and manufacturing websites.",
    url: "/portfolio/category/web-development",
    siteName: "Cave Motions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Portfolio | Cave Motions",
    description:
      "Explore Cave Motions' web development portfolio, showcasing responsive websites, e-commerce platforms, publications, and manufacturing websites.",
  },
}

type Project = {
  id: number
  title: string
  category: string
  description: string
  image: string
  color?: string
  tags?: string[]
  liveUrl?: string
}

function ProjectCard({ project }: { project: Project }) {
  const { title, description, image, liveUrl, tags } = project
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/9] bg-neutral-100">
        {/* Using external Source URLs directly as requested */}
        <img
          src={image || "/placeholder.svg?height=360&width=640&query=project%20thumbnail"}
          alt={`${title} website preview`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        {tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Badge key={t} variant="secondary" className="capitalize">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        {liveUrl ? (
          <Button asChild variant="outline" className="group bg-transparent">
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title} website`}>
              Visit site
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default function WebDevelopmentPortfolioPage() {
  const webProjects = portfolioProjects.filter(
    (p) => p.category === "Web Development" || p.tags?.includes("web"),
  ) as Project[]

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
      <header className="mb-8">
        <nav className="mb-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/portfolio" className="hover:underline">
                Portfolio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-foreground">Web Development</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Web Development</h1>
        <p className="mt-2 text-muted-foreground">
          Production-ready websites across education, non‑profit, real estate, publications, and manufacturing.
        </p>
      </header>

      {webProjects.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">{"No web development projects found."}</p>
        </div>
      ) : (
        <section aria-label="Web development projects" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {webProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>
      )}
    </main>
  )
}
