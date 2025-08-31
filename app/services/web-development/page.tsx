import type { Metadata } from "next"
import WebDevelopmentClientPage from "./WebDevelopmentClientPage"

export const metadata: Metadata = {
  title: "Professional Web Development Services | Custom Websites & Web Apps | Cave Motions",
  description:
    "Transform your digital presence with Cave Motions' expert web development services. We create responsive websites, custom web applications, e-commerce platforms, and progressive web apps that drive business growth and deliver exceptional user experiences.",
  keywords: [
    "web development",
    "website development",
    "custom web applications",
    "responsive web design",
    "e-commerce development",
    "progressive web apps",
    "web app development",
    "frontend development",
    "backend development",
    "full-stack development",
    "React development",
    "Next.js development",
    "JavaScript development",
    "TypeScript development",
    "Node.js development",
    "web performance optimization",
    "mobile-first design",
    "SEO-friendly websites",
    "modern web technologies",
    "scalable web solutions",
    "user experience design",
    "web accessibility",
    "cross-browser compatibility",
    "API integration",
    "database design",
    "cloud deployment",
    "web security",
    "Cave Motions",
    "Uganda web development",
    "Kampala web developers",
    "East Africa web development",
  ],
  authors: [{ name: "Cave Motions Web Development Team" }],
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
    title: "Professional Web Development Services | Custom Websites & Web Apps | Cave Motions",
    description:
      "Transform your digital presence with Cave Motions' expert web development services. We create responsive websites, custom web applications, e-commerce platforms, and progressive web apps that drive business growth.",
    url: "https://cavemotions.com/services/web-development",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/services/web-development-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions Web Development Services - Custom Websites and Web Applications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Web Development Services | Custom Websites & Web Apps | Cave Motions",
    description:
      "Transform your digital presence with Cave Motions' expert web development services. We create responsive websites, custom web applications, e-commerce platforms, and progressive web apps.",
    images: ["https://cavemotions.com/images/services/web-development-twitter.jpg"],
    creator: "@cavemotions",
  },
  alternates: {
    canonical: "https://cavemotions.com/services/web-development",
  },
  other: {
    "article:author": "Cave Motions",
    "article:section": "Web Development Services",
    "article:tag": "Web Development, Custom Websites, Web Applications, Responsive Design",
  },
}

export default function WebDevelopmentPage() {
  return (
    <>
      {/* Service Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Web Development Services",
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
              "Professional web development services including responsive websites, custom web applications, e-commerce platforms, and progressive web apps.",
            serviceType: "Web Development",
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Web Development Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Responsive Web Design",
                    description: "Mobile-first responsive websites that work perfectly on all devices",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Custom Web Applications",
                    description: "Tailored web applications with complex functionality for specific business needs",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "E-commerce Development",
                    description: "Complete e-commerce solutions with payment integration and inventory management",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Progressive Web Apps",
                    description: "Web applications with native-like experiences and offline capabilities",
                  },
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "50",
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
                name: "How long does it take to develop a website?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The timeline depends on the complexity and scope of your project. A simple website typically takes 2-4 weeks, while complex web applications can take 8-16 weeks. We provide detailed timelines during our initial consultation.",
                },
              },
              {
                "@type": "Question",
                name: "Will my website be mobile-friendly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All our websites are built with a mobile-first approach, ensuring they look and function beautifully across all devices, from smartphones and tablets to desktop computers.",
                },
              },
              {
                "@type": "Question",
                name: "Can you help with SEO for my website?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we implement SEO best practices during the development process to ensure your website is optimized for search engines. We also offer additional SEO services to help improve your search rankings and drive more organic traffic.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide ongoing support and maintenance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we offer comprehensive support and maintenance packages to keep your website secure, updated, and performing optimally. Our support includes regular updates, security monitoring, and technical assistance.",
                },
              },
              {
                "@type": "Question",
                name: "What technologies do you use for web development?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We use modern technologies including React, Next.js, TypeScript, Node.js, and various databases. We select the best technology stack based on your specific project requirements and business goals.",
                },
              },
              {
                "@type": "Question",
                name: "How do you ensure website security?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Security is a top priority in our development process. We implement industry best practices for secure coding, use HTTPS encryption, perform regular security audits, and keep all software and dependencies up-to-date to protect against vulnerabilities.",
                },
              },
            ],
          }),
        }}
      />

      <WebDevelopmentClientPage />
    </>
  )
}
