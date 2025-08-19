import type { Metadata } from "next"
import PerformanceOptimizationClientPage from "./PerformanceOptimizationClientPage"

export const metadata: Metadata = {
  title: "Performance Optimization Services | Speed & Efficiency | Cave Motions",
  description:
    "Boost your application performance with Cave Motions' expert optimization services. Improve speed, reduce load times, and enhance user experience with our proven techniques.",
  keywords: [
    "performance optimization",
    "website speed optimization",
    "application performance",
    "page speed optimization",
    "load time reduction",
    "performance tuning",
    "web performance",
    "mobile optimization",
    "database optimization",
    "code optimization",
    "Cave Motions",
  ],
  openGraph: {
    title: "Performance Optimization Services | Speed & Efficiency | Cave Motions",
    description:
      "Boost your application performance with Cave Motions' expert optimization services. Improve speed, reduce load times, and enhance user experience with our proven techniques.",
    url: "https://cavemotions.com/services/performance-optimization",
    images: [
      {
        url: "https://cavemotions.com/images/services/performance-optimization-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Performance Optimization Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Optimization Services | Speed & Efficiency | Cave Motions",
    description:
      "Boost your application performance with Cave Motions' expert optimization services. Improve speed, reduce load times, and enhance user experience with our proven techniques.",
    images: ["https://cavemotions.com/images/services/performance-optimization-twitter.jpg"],
  },
  alternates: {
    canonical: "https://cavemotions.com/services/performance-optimization",
  },
}

export default function PerformanceOptimizationPage() {
  return <PerformanceOptimizationClientPage />
}
