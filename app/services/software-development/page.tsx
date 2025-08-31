import type { Metadata } from "next"
import SoftwareDevelopmentClientPage from "./SoftwareDevelopmentClientPage"

export const metadata: Metadata = {
  title: "Custom Software Development Services | Enterprise Solutions & Applications | Cave Motions",
  description:
    "Transform your business with Cave Motions' custom software development services. We build scalable enterprise applications, APIs, databases, and cloud solutions tailored to your specific business needs and requirements.",
  keywords: [
    "software development",
    "custom software development",
    "enterprise software solutions",
    "business applications",
    "software engineering",
    "application development",
    "enterprise applications",
    "custom applications",
    "software architecture",
    "system integration",
    "API development",
    "database development",
    "cloud software solutions",
    "scalable software",
    "enterprise software",
    "business software",
    "software consulting",
    "legacy system modernization",
    "software maintenance",
    "agile development",
    "DevOps integration",
    "microservices architecture",
    "full-stack development",
    "backend development",
    "software security",
    "performance optimization",
    "software testing",
    "quality assurance",
    "Cave Motions",
    "Uganda software development",
    "Kampala software developers",
    "East Africa software development",
  ],
  authors: [{ name: "Cave Motions Software Development Team" }],
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
    title: "Custom Software Development Services | Enterprise Solutions & Applications | Cave Motions",
    description:
      "Transform your business with Cave Motions' custom software development services. We build scalable enterprise applications, APIs, databases, and cloud solutions tailored to your specific business needs.",
    url: "https://cavemotions.com/services/software-development",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/services/software-development-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Software Development Services - Custom Enterprise Applications and Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Services | Enterprise Solutions & Applications | Cave Motions",
    description:
      "Transform your business with Cave Motions' custom software development services. We build scalable enterprise applications, APIs, databases, and cloud solutions.",
    images: ["https://cavemotions.com/images/services/software-development-twitter.jpg"],
    creator: "@cavemotions",
  },
  alternates: {
    canonical: "https://cavemotions.com/services/software-development",
  },
  other: {
    "article:author": "Cave Motions",
    "article:section": "Software Development Services",
    "article:tag": "Software Development, Enterprise Applications, Custom Software, API Development",
  },
}

export default function SoftwareDevelopmentPage() {
  return (
    <>
      {/* Service Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Software Development Services",
            provider: {
              "@type": "Organization",
              name: "Cave Motions",
              url: "https://cavemotions.com",
              logo: "https://cavemotions.com/images/cavemo-logo.png",
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
              "Custom software development services including enterprise applications, APIs, databases, and cloud solutions tailored to specific business requirements.",
            serviceType: "Software Development",
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Software Development Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Enterprise Applications",
                    description: "Scalable enterprise software solutions for complex business processes",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "API Development",
                    description: "RESTful and GraphQL APIs for seamless system integration",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Database Solutions",
                    description: "Custom database design and optimization for high-performance applications",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Cloud Solutions",
                    description: "Scalable cloud-native applications and migration services",
                  },
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "45",
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
                name: "What types of software do you develop?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We develop a wide range of software including enterprise applications, web applications, APIs, database systems, cloud solutions, and custom business software tailored to your specific requirements.",
                },
              },
              {
                "@type": "Question",
                name: "How long does software development take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Development timelines vary based on project complexity. Simple applications take 4-8 weeks, while complex enterprise systems can take 3-6 months. We provide detailed project timelines during our consultation phase.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide ongoing support and maintenance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we offer comprehensive support and maintenance packages including bug fixes, updates, performance monitoring, security patches, and feature enhancements to keep your software running optimally.",
                },
              },
              {
                "@type": "Question",
                name: "Can you integrate with existing systems?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. We specialize in system integration and can seamlessly connect your new software with existing databases, APIs, third-party services, and legacy systems to ensure smooth operations.",
                },
              },
              {
                "@type": "Question",
                name: "What technologies do you use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We use modern technologies including Node.js, Python, Java, .NET, React, databases like PostgreSQL and MongoDB, cloud platforms like AWS and Azure, and follow industry best practices for security and scalability.",
                },
              },
              {
                "@type": "Question",
                name: "How do you ensure software security?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Security is built into our development process from day one. We implement secure coding practices, conduct regular security audits, use encryption, follow OWASP guidelines, and perform penetration testing to protect your software and data.",
                },
              },
            ],
          }),
        }}
      />

      <SoftwareDevelopmentClientPage />
    </>
  )
}
