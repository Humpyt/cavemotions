import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Cave Motions | Premium Digital Innovation Studio",
  description:
    "Cave Motions blends cutting-edge AI, creative design, and technical excellence to help forward-thinking businesses transform their digital presence.",
  alternates: {
    canonical: "https://cavemotions.com",
  },
  openGraph: {
    title: "Cave Motions | Premium Digital Innovation Studio",
    description:
      "Cave Motions blends cutting-edge AI, creative design, and technical excellence to help forward-thinking businesses transform their digital presence.",
    url: "https://cavemotions.com",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions - Digital Innovation Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return <HomePageClient />
}
