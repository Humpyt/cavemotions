"use client"

import Script from 'next/script'

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'service' | 'article'
  data?: any
}

export default function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    }

    switch (type) {
      case 'organization':
        return {
          ...baseData,
          "@type": "Organization",
          "name": "Cave Motions",
          "description": "Uganda's premier digital innovation studio in Kampala, offering AI automation, web development, software development, and mobile application services across East Africa.",
          "url": "https://cavemotions.com",
          "logo": "https://cavemotions.com/images/logo.svg",
          "image": "https://cavemotions.com/images/og-image-main.svg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kampala",
            "addressCountry": "Uganda",
            "addressRegion": "Central Region"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+256-XXX-XXXXXX",
            "contactType": "customer service",
            "availableLanguage": ["English"]
          },
          "sameAs": [
            "https://twitter.com/cavemotions",
            "https://linkedin.com/company/cavemotions"
          ],
          "foundingDate": "2018",
          "foundingLocation": {
            "@type": "Place",
            "name": "Kampala, Uganda"
          },
          "areaServed": {
            "@type": "Place",
            "name": "East Africa"
          },
          "serviceType": [
            "AI Automation",
            "Web Development",
            "Software Development",
            "Mobile Application Development",
            "UI/UX Design",
            "Digital Transformation"
          ]
        }

      case 'website':
        return {
          ...baseData,
          "@type": "WebSite",
          "name": "Cave Motions",
          "description": "Uganda's premier digital innovation studio",
          "url": "https://cavemotions.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://cavemotions.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Cave Motions",
            "logo": {
              "@type": "ImageObject",
              "url": "https://cavemotions.com/images/logo.svg"
            }
          }
        }

      case 'service':
        return {
          ...baseData,
          "@type": "Service",
          "name": data?.name || "Digital Innovation Services",
          "description": data?.description || "Comprehensive digital services including AI automation, web development, and software solutions",
          "provider": {
            "@type": "Organization",
            "name": "Cave Motions",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kampala",
              "addressCountry": "Uganda"
            }
          },
          "areaServed": {
            "@type": "Place",
            "name": "East Africa"
          },
          "serviceType": data?.serviceType || "Digital Innovation",
          "category": "Technology Services"
        }

      case 'article':
        return {
          ...baseData,
          "@type": "Article",
          "headline": data?.title,
          "description": data?.description,
          "author": {
            "@type": "Organization",
            "name": "Cave Motions"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Cave Motions",
            "logo": {
              "@type": "ImageObject",
              "url": "https://cavemotions.com/images/logo.svg"
            }
          },
          "datePublished": data?.datePublished,
          "dateModified": data?.dateModified || data?.datePublished,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data?.url
          }
        }

      default:
        return baseData
    }
  }

  const structuredData = { ...getStructuredData(), ...data }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

// Export utility functions for common structured data
export const OrganizationStructuredData = () => <StructuredData type="organization" />
export const WebsiteStructuredData = () => <StructuredData type="website" />
export const ServiceStructuredData = (data: any) => <StructuredData type="service" data={data} />
export const ArticleStructuredData = (data: any) => <StructuredData type="article" data={data} />