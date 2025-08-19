import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Metadata } from "next"

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
        url: "https://cavemotions.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions - Digital Innovation Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cave Motions | Premium Digital Innovation Studio",
    description:
      "Cave Motions is a premium digital innovation studio offering AI automation, web development, software development, and mobile application services.",
    images: ["https://cavemotions.com/images/twitter-image.jpg"],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

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
      </body>
    </html>
  )
}
