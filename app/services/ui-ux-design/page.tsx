import type { Metadata } from "next"
import UIUXDesignClientPage from "./UIUXDesignClientPage"

export const metadata: Metadata = {
  title: "UI/UX Design Services | User Experience & Interface Design | Cave Motions",
  description:
    "Create exceptional user experiences with Cave Motions' professional UI/UX design services. From wireframes to prototypes, we design interfaces that users love.",
  keywords: [
    "UI design",
    "UX design",
    "user interface design",
    "user experience design",
    "web design",
    "mobile app design",
    "wireframing",
    "prototyping",
    "design systems",
    "usability testing",
    "interaction design",
    "Cave Motions",
  ],
  openGraph: {
    title: "UI/UX Design Services | User Experience & Interface Design | Cave Motions",
    description:
      "Create exceptional user experiences with Cave Motions' professional UI/UX design services. From wireframes to prototypes, we design interfaces that users love.",
    url: "https://cavemotions.com/services/ui-ux-design",
    images: [
      {
        url: "https://cavemotions.com/images/services/ui-ux-design-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cave Motions UI/UX Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI/UX Design Services | User Experience & Interface Design | Cave Motions",
    description:
      "Create exceptional user experiences with Cave Motions' professional UI/UX design services. From wireframes to prototypes, we design interfaces that users love.",
    images: ["https://cavemotions.com/images/services/ui-ux-design-twitter.jpg"],
  },
  alternates: {
    canonical: "https://cavemotions.com/services/ui-ux-design",
  },
}

export default function UIUXDesignPage() {
  return <UIUXDesignClientPage />
}
