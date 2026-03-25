import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const baseUrl = "https://smeclabs.ac.in";
const mobileUrl = "https://m.smeclabs.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(mobileUrl),
  title: "SMEClabs Kochi – Leading Skill Development & Internship Provider in Kerala",
  description:
    "SMEClabs Kochi, located in Kochi, Kerala, offers industry-aligned training in Automation, IT, Data Science, Logistics, and more. With over 1 lakh successful placements and 25+ years of expertise, we provide hands-on courses, internships, and job assistance to students and professionals.",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "SMEClabs Kochi | Industry-Aligned Training & Placement Support",
    description:
      "SMEClabs Kochi, located in Kochi, Kerala, offers industry-aligned training in Automation, IT, Data Science, Logistics, and more. With over 1 lakh successful placements and 25+ years of expertise, we provide hands-on courses, internships, and job assistance to students and professionals.",
    url: baseUrl,
    siteName: "SMEClabs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${baseUrl}/img/logo-new.webp`,
        width: 1200,
        height: 630,
        alt: "SMEClabs Kochi - Training and Placement",
      },
    ],
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

export default function Home() {
  return <HomeClient />;
}
