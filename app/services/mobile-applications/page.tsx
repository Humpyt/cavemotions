import type { Metadata } from "next"
import MobileApplicationsClientPage from "./MobileApplicationsClientPage"

export const metadata: Metadata = {
  title: "Mobile App Development Services | iOS & Android Applications | Cave Motions",
  description:
    "Transform your business with Cave Motions' mobile app development services. We build native iOS and Android applications, cross-platform solutions, and progressive web apps tailored to your specific business needs.",
  keywords: [
    "mobile app development",
    "iOS app development",
    "Android app development",
    "cross-platform apps",
    "native mobile apps",
    "mobile application development",
    "app development services",
    "mobile app design",
    "React Native development",
    "Flutter development",
    "progressive web apps",
    "PWA development",
    "mobile UI/UX design",
    "app store optimization",
    "mobile app testing",
    "app maintenance",
    "mobile app consulting",
    "enterprise mobile apps",
    "custom mobile solutions",
    "mobile app security",
    "app performance optimization",
    "mobile backend development",
    "API integration",
    "push notifications",
    "offline functionality",
    "mobile analytics",
    "app monetization",
    "Cave Motions",
    "Uganda mobile app development",
    "Kampala app developers",
    "East Africa mobile development",
  ],
  authors: [{ name: "Cave Motions Mobile Development Team" }],
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
  openGraph: {
    title: "Mobile App Development Services | iOS & Android Applications | Cave Motions",
    description:
      "Transform your business with Cave Motions' mobile app development services. We build native iOS and Android applications, cross-platform solutions, and progressive web apps.",
    url: "https://cavemotions.com/services/mobile-applications",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/services/mobile-applications-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Mobile App Development Services - iOS and Android Applications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development Services | iOS & Android Applications | Cave Motions",
    description:
      "Transform your business with Cave Motions' mobile app development services. We build native iOS and Android applications and cross-platform solutions.",
    images: ["https://cavemotions.com/images/services/mobile-applications-twitter.jpg"],
    creator: "@cavemotions",
  },
  alternates: {
    canonical: "https://cavemotions.com/services/mobile-applications",
  },
  other: {
    "article:author": "Cave Motions",
    "article:section": "Mobile App Development Services",
    "article:tag": "Mobile Apps, iOS Development, Android Development, Cross-Platform Apps",
  },
}

export default function MobileApplicationsPage() {
  return (
    <>
      {/* Service Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Mobile App Development Services",
            provider: {
              "@type": "Organization",
              name: "Cave Motions",
              url: "https://cavemotions.com",
              logo: "https://cavemotions.com/images/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bugolobi",
                addressLocality: "Kampala",
                addressRegion: "Uganda",
                addressCountry: "UG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+256-787-022105",
                contactType: "customer service",
                areaServed: "Worldwide",
                availableLanguage: "English",
              },
            },
            description:
              "Mobile app development services including native iOS and Android applications, cross-platform solutions, and progressive web apps tailored to specific business requirements.",
            serviceType: "Mobile App Development",
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Mobile App Development Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "iOS App Development",
                    description: "Native iOS applications built with Swift and modern iOS frameworks",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Android App Development",
                    description: "Native Android applications built with Kotlin and modern Android frameworks",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Cross-Platform Development",
                    description: "Cross-platform mobile apps using React Native and Flutter frameworks",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Progressive Web Apps",
                    description: "PWAs that provide native-like experiences across all devices",
                  },
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "38",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What types of mobile apps do you develop?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We develop native iOS and Android apps, cross-platform solutions using React Native and Flutter, progressive web apps (PWAs), and enterprise mobile applications tailored to your specific business needs.",
                },
              },
              {
                "@type": "Question",
                name: "How long does mobile app development take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Development timelines vary based on app complexity. Simple apps take 6-12 weeks, while complex enterprise applications can take 4-8 months. We provide detailed project timelines during our consultation phase.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide app store submission and optimization?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we handle the complete app store submission process for both iOS App Store and Google Play Store, including app store optimization (ASO) to improve visibility and downloads.",
                },
              },
              {
                "@type": "Question",
                name: "Can you integrate with existing systems and APIs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. We specialize in integrating mobile apps with existing databases, APIs, third-party services, and enterprise systems to ensure seamless data flow and functionality.",
                },
              },
              {
                "@type": "Question",
                name: "What platforms and technologies do you use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We use native technologies like Swift for iOS and Kotlin for Android, cross-platform frameworks like React Native and Flutter, and modern backend technologies for robust, scalable mobile solutions.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide ongoing app maintenance and updates?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we offer comprehensive maintenance packages including bug fixes, OS updates, feature enhancements, performance monitoring, and security updates to keep your app running optimally.",
                },
              },
            ],
          }),
        }}
      />

      <MobileApplicationsClientPage />
    </>
  )
}
