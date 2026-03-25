import type { Metadata } from "next";
import ContactClient from "../contact/ContactClient";

const baseUrl = "https://smeclabs.ac.in";
const mobileUrl = "https://m.smeclabs.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(mobileUrl),
  title: "Contact Us | SMEClabs Kochi",
  description: "Get in touch with SMEClabs. Visit us at Kaloor Complex, Kochi or call us at +91 9656227714. We're here to help you start your career journey.",
  alternates: {
    canonical: `${baseUrl}/contact-us`,
  },
  openGraph: {
    title: "Contact Us | SMEClabs Kochi",
    description: "Get in touch with SMEClabs. Visit us at Kaloor Complex, Kochi or call us at +91 9656227714.",
    url: `${baseUrl}/contact-us`,
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

export default function ContactUsPage() {
  return <ContactClient />;
}
