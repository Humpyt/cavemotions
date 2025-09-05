import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HydrationSafeWrapper from "@/components/hydration-safe-wrapper"
import { ErrorSuppressor } from "@/components/blog/error-suppressor"
import type { Metadata } from "next"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL("https://cavemotions.com"),
  title: {
    default: "Cave Motions | Premium Digital Innovation Studio",
    template: "%s | Cave Motions",
  },
  description:
    "Cave Motions is a premium digital innovation studio offering AI automation, web development, software development, and mobile application services.",
  keywords: [
    "digital innovation",
    "AI automation",
    "web development",
    "software development",
    "mobile applications",
    "UI/UX design",
  ],
  authors: [{ name: "Cave Motions Team" }],
  creator: "Cave Motions",
  publisher: "Cave Motions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    type: "website",
    locale: "en_US",
    url: "https://cavemotions.com/",
    siteName: "Cave Motions",
    title: "Cave Motions | Premium Digital Innovation Studio",
    description:
      "Cave Motions is a premium digital innovation studio offering AI automation, web development, software development, and mobile application services.",
    images: [
      {
        url: "https://cavemotions.com/images/og-image-main.svg",
        width: 1200,
        height: 630,
        alt: "Cave Motions - Digital Innovation Studio in Kampala, Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cave Motions | Premium Digital Innovation Studio",
    description:
      "Cave Motions is a premium digital innovation studio offering AI automation, web development, software development, and mobile application services.",
    images: ["https://cavemotions.com/images/twitter-image-main.svg"],
    creator: "@cavemotions",
  },
  alternates: {
    canonical: "https://cavemotions.com",
    languages: {
      "en-US": "https://cavemotions.com",
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/cave-logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/cave-logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Prevent browser extension errors */}
        <Script id="extension-error-handler" strategy="beforeInteractive">
          {`
            // Prevent extension errors from affecting the site
            window.addEventListener('error', function(e) {
              if (e.filename && e.filename.includes('extension://')) {
                e.preventDefault();
                return false;
              }
            });
            
            // Suppress extension console errors
            const originalError = console.error;
            console.error = function(...args) {
              const message = args.join(' ');
              if (message.includes('extension://') || 
                  message.includes('chrome-extension://') ||
                  message.includes('enable_click_download') ||
                  message.includes('Access to storage is not allowed')) {
                return;
              }
              originalError.apply(console, args);
            };
          `}
        </Script>
        
        <HydrationSafeWrapper>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <ErrorSuppressor />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow pt-20">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </HydrationSafeWrapper>

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cave Motions",
              url: "https://cavemotions.com",
              logo: "https://cavemotions.com/images/logo.png",
              sameAs: [
                "https://twitter.com/cavemotions",
                "https://www.facebook.com/cavemotions",
                "https://www.linkedin.com/company/cavemotions",
                "https://www.instagram.com/cavemotions",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+256-787-022105",
                contactType: "customer service",
                areaServed: "Worldwide",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bugolobi",
                addressLocality: "Kampala",
                addressRegion: "Uganda",
                postalCode: "",
                addressCountry: "UG",
              },
              description:
                "Cave Motions is a premium digital innovation studio offering AI automation, web development, software development, and mobile application services.",
            }),
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://cavemotions.com/#localbusiness",
              name: "Cave Motions",
              image: "https://cavemotions.com/images/logo.png",
              url: "https://cavemotions.com",
              telephone: "+256-787-022105",
              email: "hello@cavemotions.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bugolobi",
                addressLocality: "Kampala",
                addressRegion: "Central Region",
                addressCountry: "Uganda",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "0.3476",
                longitude: "32.6204",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
              },
              sameAs: [
                "https://twitter.com/cavemotions",
                "https://www.facebook.com/cavemotions",
                "https://www.linkedin.com/company/cavemotions",
                "https://www.instagram.com/cavemotions",
              ],
              priceRange: "$$",
              description: "Leading digital innovation studio in Kampala, Uganda specializing in AI automation, web development, software development, and mobile applications.",
              areaServed: {
                "@type": "Country",
                name: "Uganda",
              },
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: "0.3476",
                longitude: "32.6204",
                },
                geoRadius: "50000",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
