import type { Metadata } from "next"
import BusinessIntelligenceClientPage from "./BusinessIntelligenceClientPage"

export const metadata: Metadata = {
  title: "Business Intelligence Solutions | Data Analytics & Insights | Cave Motions",
  description:
    "Transform your business with Cave Motions' advanced business intelligence solutions. Get actionable insights from your data with custom dashboards, analytics, and reporting systems.",
  keywords: [
    "business intelligence",
    "data analytics",
    "business analytics",
    "data visualization",
    "reporting dashboards",
    "KPI tracking",
    "data insights",
    "business metrics",
    "data warehousing",
    "predictive analytics",
    "Cave Motions",
  ],
  openGraph: {
    title: "Business Intelligence Solutions | Data Analytics & Insights | Cave Motions",
    description:
      "Transform your business with Cave Motions' advanced business intelligence solutions. Get actionable insights from your data with custom dashboards, analytics, and reporting systems.",
    url: "https://cavemotions.com/services/business-intelligence",
    images: [
      {
        url: "https://cavemotions.com/images/services/business-intelligence-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Business Intelligence Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Intelligence Solutions | Data Analytics & Insights | Cave Motions",
    description:
      "Transform your business with Cave Motions' advanced business intelligence solutions. Get actionable insights from your data with custom dashboards, analytics, and reporting systems.",
    images: ["https://cavemotions.com/images/services/business-intelligence-twitter.jpg"],
  },
  alternates: {
    canonical: "https://cavemotions.com/services/business-intelligence",
  },
}

export default function BusinessIntelligencePage() {
  return <BusinessIntelligenceClientPage />
}
