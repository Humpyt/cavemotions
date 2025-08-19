import type { Metadata } from "next"
import AIAutomationClientPage from "./AIAutomationClientPage"

export const metadata: Metadata = {
  title: "AI Automation Services | Intelligent Business Solutions",
  description:
    "Transform your business with Cave Motions' AI automation services. We create intelligent systems that streamline operations, reduce errors, and boost efficiency.",
  alternates: {
    canonical: "https://cavemotions.com/services/ai-automation",
  },
  openGraph: {
    title: "AI Automation Services | Intelligent Business Solutions",
    description:
      "Transform your business with Cave Motions' AI automation services. We create intelligent systems that streamline operations, reduce errors, and boost efficiency.",
    url: "https://cavemotions.com/services/ai-automation",
    siteName: "Cave Motions",
    images: [
      {
        url: "https://cavemotions.com/images/ai-automation-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI Automation Services by Cave Motions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function AIAutomationPage() {
  return (
    <>
      <AIAutomationClientPage />
      {/* AI Automation Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Automation",
            serviceType: "Artificial Intelligence Solutions",
            provider: {
              "@type": "Organization",
              name: "Cave Motions",
              url: "https://cavemotions.com",
            },
            description:
              "Harness the power of artificial intelligence to streamline operations and unlock new possibilities for your business.",
            offers: {
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
    </>
  )
}
