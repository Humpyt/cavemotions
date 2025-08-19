import type { Metadata } from "next"
import PortfolioClientPage from "./PortfolioClientPage"

export const metadata: Metadata = {
  title: "Portfolio | Our Work & Success Stories",
  description:
    "Explore Cave Motions' portfolio of successful digital projects across web development, mobile applications, AI solutions, and custom software development.",
  alternates: {
    canonical: "https://cavemotions.com/portfolio",
  },
  openGraph: {
    title: "Portfolio | Our Work & Success Stories",
    description:
      "Explore Cave Motions' portfolio of successful digital projects across web development, mobile applications, AI solutions, and custom software development.",
    url: "https://cavemotions.com/portfolio",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Project Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function PortfolioPage() {
  // The PortfolioClientPage now fetches its own data from data/portfolio-projects.ts
  // No need to pass projects prop here.
  return <PortfolioClientPage />
}
