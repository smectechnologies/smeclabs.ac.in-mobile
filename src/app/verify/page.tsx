import type { Metadata } from "next";
import VerifyClient from "./VerifyClient";

const baseUrl = "https://smeclabs.ac.in";
const mobileUrl = "https://m.smeclabs.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(mobileUrl),
  title: "Verify Certificate | SMEClabs Kochi",
  description: "Verify the authenticity of your SMEClabs course completion certificate using your certificate ID.",
  alternates: { canonical: `${baseUrl}/verify` },
  openGraph: {
    title: "Verify Certificate | SMEClabs Kochi",
    description: "Verify the authenticity of your SMEClabs course completion certificate.",
    url: `${baseUrl}/verify`,
    siteName: "SMEClabs",
    type: "website",
  },
};

export default function VerifyPage() {
  return <VerifyClient />;
}
