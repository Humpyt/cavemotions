"use client"

import * as React from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type GalleryLightboxProps = {
  images?: string[]
  captions?: string[]
  // Renders a simple grid of thumbnails. If you want a different column count, pass a Tailwind class.
  gridClassName?: string
  initialIndex?: number
}

export function GalleryLightbox({
  images = [],
  captions = [],
  gridClassName = "grid grid-cols-1 gap-4 sm:grid-cols-2",
  initialIndex = 0,
}: GalleryLightboxProps) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(initialIndex)

  const count = images.length

  const openAt = React.useCallback(
    (i: number) => {
      if (!count) return
      setIndex(i)
      setOpen(true)
    },
    [count],
  )

  const prev = React.useCallback(() => {
    if (!count) return
    setIndex((i) => (i - 1 + count) % count)
  }, [count])

  const next = React.useCallback(() => {
    if (!count) return
    setIndex((i) => (i + 1) % count)
  }, [count])

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, prev, next])

  // Basic mobile swipe
  const touch = React.useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    // Horizontal swipe threshold
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx > 0) prev()
      else next()
    }
    touch.current = null
  }

  if (!count) {
    return <p className="text-sm text-muted-foreground">No images available for this project yet.</p>
  }

  return (
    <>
      {/* Thumbnails */}
      <div className={gridClassName}>
        {images.map((src, i) => (
          <button
            key={`thumb-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="group relative overflow-hidden rounded-md border bg-muted/30"
            aria-label={`Open image ${i + 1} of ${count}`}
          >
            <img
              src={src || "/placeholder.svg"}
              alt={captions[i] || `Project image ${i + 1}`}
              className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
              loading={i < 2 ? "eager" : "lazy"}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[95vw] md:max-w-5xl border-0 p-0 bg-transparent shadow-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative">
            {/* Close */}
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-10 rounded-md bg-black/60 p-2 text-white backdrop-blur hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            {count > 1 ? (
              <button
                aria-label="Previous image"
                onClick={prev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-black/60 p-2 text-white backdrop-blur hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            ) : null}

            {/* Next */}
            {count > 1 ? (
              <button
                aria-label="Next image"
                onClick={next}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-black/60 p-2 text-white backdrop-blur hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            ) : null}

            {/* Image */}
            <div className="overflow-hidden rounded-md">
              <img
                src={images[index] || "/placeholder.svg"}
                alt={captions[index] || `Project image ${index + 1}`}
                className="h-full w-full max-h-[85vh] object-contain bg-background"
              />
            </div>

            {/* Caption / Counter */}
            <div className="mt-2 flex items-center justify-between text-xs text-white/90">
              <span className="rounded px-2 py-1 bg-black/50">{captions[index] || `Image ${index + 1}`}</span>
              <span className="rounded px-2 py-1 bg-black/50">
                {index + 1} / {count}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GalleryLightbox
