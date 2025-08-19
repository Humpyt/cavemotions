import GetStartedClientPage from "./GetStartedClientPage"

export const metadata = {
  title: "Get Started | Begin Your Digital Transformation Journey | Cave Motions",
  description:
    "Ready to transform your business with cutting-edge digital solutions? Start your journey with Cave Motions today. Get a free consultation and discover how we can help you achieve your goals.",
  keywords: [
    "get started",
    "digital transformation",
    "free consultation",
    "project planning",
    "business automation",
    "web development consultation",
    "AI implementation",
    "software development planning",
    "Cave Motions consultation",
  ],
  openGraph: {
    title: "Get Started | Begin Your Digital Transformation Journey | Cave Motions",
    description:
      "Ready to transform your business with cutting-edge digital solutions? Start your journey with Cave Motions today. Get a free consultation and discover how we can help you achieve your goals.",
    url: "https://cavemotions.com/get-started",
    images: [
      {
        url: "https://cavemotions.com/images/get-started-og.jpg",
        width: 1200,
        height: 630,
        alt: "Get Started with Cave Motions - Digital Transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started | Begin Your Digital Transformation Journey | Cave Motions",
    description:
      "Ready to transform your business with cutting-edge digital solutions? Start your journey with Cave Motions today. Get a free consultation and discover how we can help you achieve your goals.",
    images: ["https://cavemotions.com/images/get-started-twitter.jpg"],
  },
  alternates: {
    canonical: "https://cavemotions.com/get-started",
  },
}

export default function GetStartedPage() {
  return <GetStartedClientPage />
}
