import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Services | AI, Web, Software & Mobile Development",
  description:
    "Explore Cave Motions' comprehensive digital services including AI automation, web development, custom software solutions, and mobile application development.",
  alternates: {
    canonical: "https://cavemotions.com/services",
  },
  openGraph: {
    title: "Services | AI, Web, Software & Mobile Development",
    description:
      "Explore Cave Motions' comprehensive digital services including AI automation, web development, custom software solutions, and mobile application development.",
    url: "https://cavemotions.com/services",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/services-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Digital Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
