import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Home, Layers } from "lucide-react"
import { portfolioProjects } from "@/data/portfolio-projects"

export const metadata: Metadata = {
  title: "Software Portfolio | Cave Motions",
  description:
    "Custom software projects by Cave Motions, including platforms, dashboards, and internal tools built for performance and scale.",
  openGraph: {
    title: "Software Portfolio | Cave Motions",
    description:
      "Custom software projects by Cave Motions, including platforms, dashboards, and internal tools built for performance and scale.",
    type: "website",
    url: "/portfolio/category/software",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Portfolio | Cave Motions",
    description: "Custom software projects by Cave Motions, including platforms, dashboards, and internal tools.",
  },
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const CATEGORY_SLUG = "software"

export default function SoftwareCategoryPage() {
  const items =
    (portfolioProjects as any[]).filter((item) => {
      const cat = item?.category ? slugify(String(item.category)) : ""
      return cat === CATEGORY_SLUG || cat === "software-development" || cat === "software-engineering"
    }) ?? []

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
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
          <li className="text-foreground font-medium">Software</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          <Layers className="h-3.5 w-3.5" />
          <span>{"Category: Software"}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Software Portfolio</h1>
        <p className="text-muted-foreground max-w-2xl">
          Platforms, internal tools, and dashboards engineered for reliability and scale. Explore featured software
          builds below.
        </p>
      </section>

      {/* Grid */}
      {items.length > 0 ? (
        <section aria-label="Software projects" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const hasSlug = Boolean((item as any).slug)
            const href = hasSlug ? `/portfolio/projects/${(item as any).slug}` : (item as any).liveUrl || "#"
            const imgSrc = (item as any).image || "/software-project-thumbnail.png"
            const title = (item as any).title || "Untitled Project"
            const desc = (item as any).description || "Software project case study."
            const tags: string[] = Array.isArray((item as any).tags) ? (item as any).tags : []

            return (
              <Card key={`${title}-${idx}`} className="overflow-hidden hover:shadow-md transition-shadow">
                <Link href={href} aria-label={`Open ${title}`} className="block">
                  <div className="aspect-[16/10] relative bg-muted">
                    {/* Use standard img to avoid remote loader config */}
                    <img
                      src={imgSrc || "/placeholder.svg"}
                      alt={`${title} thumbnail`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading={idx < 3 ? "eager" : "lazy"}
                    />
                  </div>
                </Link>
                <CardHeader className="space-y-2">
                  <CardTitle className="line-clamp-2">{title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 4).map((tag: string, tIdx: number) => (
                      <Badge key={`${title}-tag-${tIdx}`} variant="secondary" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{desc}</p>
                  <div>
                    <Link href={href} className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
                      View case study <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>
      ) : (
        <section className="rounded-lg border p-8">
          <h2 className="text-xl font-semibold">No software projects yet</h2>
          <p className="text-muted-foreground mt-2">
            We couldn&apos;t find projects under Software. Try exploring other categories below.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/portfolio/category/web-development" className="underline">
              Web Development
            </Link>
            <Link href="/portfolio/category/ai-solutions" className="underline">
              AI Solutions
            </Link>
            <Link href="/portfolio/category/mobile-apps" className="underline">
              Mobile Apps
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}
