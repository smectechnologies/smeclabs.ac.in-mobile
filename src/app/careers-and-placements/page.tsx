import type { Metadata } from "next";
import CareerClient from "../career/CareerClient";

const baseUrl = "https://smeclabs.ac.in";
const mobileUrl = "https://m.smeclabs.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(mobileUrl),
  title: "Career & Placements | SMEClabs Kochi",
  description: "Explore our student success stories, placement achievements, and career outcomes. Watch testimonials and see how SMEClabs transforms careers.",
  alternates: {
    canonical: `${baseUrl}/careers-and-placements`,
  },
  openGraph: {
    title: "Career & Placements | SMEClabs Kochi",
    description: "Explore our student success stories, placement achievements, and career outcomes.",
    url: `${baseUrl}/careers-and-placements`,
    siteName: "SMEClabs",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function CareersAndPlacementsPage() {
  return <CareerClient />;
}
