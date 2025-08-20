import type { Metadata } from "next"
import AIAutomationClientPage from "./AIAutomationClientPage"

export const metadata: Metadata = {
  title: "AI Automation Services | Machine Learning & Intelligent Business Solutions | Cave Motions",
  description:
    "Transform your business with Cave Motions' AI automation services. We create intelligent systems, machine learning solutions, and automated workflows that streamline operations, reduce errors, and boost efficiency by up to 80%.",
  keywords: [
    "AI automation",
    "artificial intelligence automation",
    "machine learning solutions",
    "intelligent automation",
    "business process automation",
    "AI-powered workflows",
    "automated systems",
    "smart automation",
    "AI consulting",
    "machine learning consulting",
    "robotic process automation",
    "RPA solutions",
    "AI integration",
    "intelligent systems",
    "automated decision making",
    "AI chatbots",
    "natural language processing",
    "computer vision",
    "predictive analytics",
    "AI optimization",
    "workflow automation",
    "business intelligence",
    "data automation",
    "AI transformation",
    "digital transformation",
    "enterprise AI",
    "custom AI solutions",
    "AI development",
    "Cave Motions",
    "Uganda AI automation",
    "Kampala AI developers",
    "East Africa AI solutions",
  ],
  authors: [{ name: "Cave Motions AI Development Team" }],
  creator: "Cave Motions",
  publisher: "Cave Motions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://cavemotions.com/services/ai-automation",
  },
  openGraph: {
    title: "AI Automation Services | Machine Learning & Intelligent Business Solutions | Cave Motions",
    description:
      "Transform your business with Cave Motions' AI automation services. We create intelligent systems, machine learning solutions, and automated workflows that boost efficiency by up to 80%.",
    url: "https://cavemotions.com/services/ai-automation",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/services/ai-automation-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions AI Automation Services - Machine Learning and Intelligent Business Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Services | Machine Learning & Intelligent Business Solutions | Cave Motions",
    description:
      "Transform your business with Cave Motions' AI automation services. We create intelligent systems and automated workflows that boost efficiency by up to 80%.",
    images: ["https://cavemotions.com/images/services/ai-automation-twitter.jpg"],
    creator: "@cavemotions",
  },
  other: {
    "article:author": "Cave Motions",
    "article:section": "AI Automation Services",
    "article:tag": "AI Automation, Machine Learning, Intelligent Systems, Business Automation",
  },
}

export default function AIAutomationPage() {
  return <AIAutomationClientPage />
}
