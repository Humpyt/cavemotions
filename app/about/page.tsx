import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Cave Motions | Leading Software Agency in Kampala, Uganda",
  description:
    "Cave Motions is a leading technology agency in Kampala, Uganda, helping businesses transform through web design, software development, AI automation, branding, and motion design since 2018.",
  alternates: {
    canonical: "https://cavemotions.com/about",
  },
  openGraph: {
    title: "About Cave Motions | Leading Software Agency in Kampala, Uganda",
    description:
      "Cave Motions is a leading technology agency in Kampala, Uganda, helping businesses transform through web design, software development, AI automation, branding, and motion design since 2018.",
    url: "https://cavemotions.com/about",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About Cave Motions - Leading Software Agency in Kampala",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
