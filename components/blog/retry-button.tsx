"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RetryButton() {
  return (
    <Button asChild variant="outline" size="lg">
      <Link href="/blog-wp" onClick={() => window.location.reload()}>
        Retry
      </Link>
    </Button>
  )
}
