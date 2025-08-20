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
  return (
    <>
      {/* Service Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Automation Services",
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
              "AI automation services including machine learning solutions, intelligent workflows, robotic process automation, and custom AI systems tailored to specific business requirements.",
            serviceType: "AI Automation",
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "AI Automation Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Machine Learning Solutions",
                    description: "Custom machine learning models for predictive analytics and intelligent decision making",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Robotic Process Automation",
                    description: "RPA solutions to automate repetitive tasks and streamline business processes",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "AI Chatbots",
                    description: "Intelligent conversational AI for customer service and business automation",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Workflow Automation",
                    description: "Automated workflows and intelligent systems for enhanced business efficiency",
                  },
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "32",
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
                name: "What types of AI automation do you provide?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We provide machine learning solutions, robotic process automation (RPA), AI chatbots, workflow automation, predictive analytics, natural language processing, and custom AI systems tailored to your business needs.",
                },
              },
              {
                "@type": "Question",
                name: "How long does AI automation implementation take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Implementation timelines vary based on complexity. Simple automation takes 4-8 weeks, while complex AI systems can take 3-6 months. We provide detailed project timelines during our consultation phase.",
                },
              },
              {
                "@type": "Question",
                name: "Can AI automation integrate with existing systems?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our AI solutions are designed to seamlessly integrate with your existing software, databases, APIs, and business systems to enhance rather than replace your current infrastructure.",
                },
              },
              {
                "@type": "Question",
                name: "What ROI can I expect from AI automation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our clients typically see 40-80% efficiency improvements, 60% reduction in manual errors, and significant cost savings within 6-12 months of implementation, with full ROI often achieved within the first year.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide training and ongoing support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we provide comprehensive training for your team, detailed documentation, and ongoing support packages including system monitoring, updates, and optimization to ensure continued success.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data secure with AI automation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. We implement enterprise-grade security measures, data encryption, access controls, and compliance with international data protection standards to ensure your data remains secure and private.",
                },
              },
            ],
          }),
        }}
      />

      <AIAutomationClientPage />
              "@type": "Offer",
              price: "5000.00",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "5000.00",
                priceCurrency: "USD",
                minPrice: "5000.00",
                maxPrice: "100000.00",
              },
            },
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "AI Automation Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Intelligent Chatbots",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Predictive Analytics",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Process Automation",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Custom AI Solutions",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What types of businesses can benefit from AI automation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Businesses of all sizes and across industries can benefit from AI automation. Whether you're looking to streamline operations, gain insights from data, or enhance customer experiences, AI can provide valuable solutions tailored to your specific needs.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need a large amount of data to implement AI solutions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "While having more data can improve AI model accuracy, we can work with various data volumes. Our team can help you identify the right approach based on your available data and implement strategies to collect more if needed.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to develop and implement an AI solution?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The timeline varies depending on the complexity of the solution and your specific requirements. Simple automation projects might take a few weeks, while more complex AI systems could take several months. We'll provide a detailed timeline during our initial consultation.",
                },
              },
              {
                "@type": "Question",
                name: "How do you ensure the security and privacy of our data?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Data security and privacy are our top priorities. We implement robust security measures, follow industry best practices, and comply with relevant regulations to ensure your data is protected throughout the development and deployment process.",
                },
              },
            ],
          }),
        }}
      />

      <AIAutomationClientPage />
    </>
  )
}
