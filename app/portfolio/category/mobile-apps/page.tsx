import type { Metadata } from "next"
import PortfolioClientPage from "../../PortfolioClientPage"

export const metadata: Metadata = {
  title: "Mobile Apps Portfolio | Our Mobile Application Projects",
  description:
    "Explore Cave Motions' portfolio of mobile application projects, including cross-platform apps, fitness trackers, and custom mobile solutions.",
  alternates: {
    canonical: "https://cavemotions.com/portfolio/category/mobile-apps",
  },
  openGraph: {
    title: "Mobile Apps Portfolio | Our Mobile Application Projects",
    description:
      "Discover our mobile projects — cross-platform apps, health and fitness tracking, and more custom mobile solutions.",
    url: "https://cavemotions.com/portfolio/category/mobile-apps",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Mobile Apps Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function MobileAppsPortfolioPage() {
  // Initialize the portfolio page with the Mobile tab active
  return <PortfolioClientPage initialCategory="mobile" />
}
