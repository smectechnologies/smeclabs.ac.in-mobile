import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

const baseUrl = "https://smeclabs.ac.in";
const mobileUrl = "https://m.smeclabs.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(mobileUrl),
  title: "About Us | SMEClabs Kochi",
  description: "SMEClabs, an ISO 9001:2015 Certified Training Center founded in 2001. 25+ years of excellence, 1 lakh+ placements, 50+ courses.",
  alternates: { canonical: `${baseUrl}/about-us` },
  openGraph: {
    title: "About Us | SMEClabs Kochi",
    description: "SMEClabs — ISO 9001:2015 certified, 25+ years of excellence, 1 lakh+ placements.",
    url: `${baseUrl}/about-us`,
    siteName: "SMEClabs",
    type: "website",
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
