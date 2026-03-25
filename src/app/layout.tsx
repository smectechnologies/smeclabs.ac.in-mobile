import type { Metadata } from "next";
import "./globals.css";
import { OrganizationSchema, LocalBusinessSchema } from "./components/StructuredData";

export const metadata: Metadata = {
  title: "SMEClabs Mobile - Best Training Institute in Kochi, Kerala | Professional Courses",
  description: "SMEClabs is the leading training institute in Kochi, Kerala offering professional courses in Industrial Automation, Software Development, Data Science, Digital Marketing, Civil Engineering, MEP, Oil & Gas, and more. 100% placement assistance. Enroll now!",
  keywords: "training institute in kochi, courses in kochi, professional training kerala, smeclabs kochi, industrial automation course kochi, software training kochi, data science course kerala, digital marketing course kochi, civil engineering training kochi, placement assistance kochi",
  authors: [{ name: "SMEClabs" }],
  metadataBase: new URL("https://m.smeclabs.ac.in"),
  alternates: {
    canonical: "https://smeclabs.ac.in",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "SMEClabs - Best Training Institute in Kochi, Kerala",
    description: "Professional training courses with 100% placement assistance in Kochi, Kerala",
    url: "https://smeclabs.ac.in",
    siteName: "SMEClabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMEClabs - Best Training Institute in Kochi, Kerala",
    description: "Professional training courses with 100% placement assistance",
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
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" media="only screen and (min-width: 641px)" href="https://smeclabs.ac.in" />
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Kochi" />
        <meta name="geo.position" content="9.9312;76.2673" />
        <meta name="ICBM" content="9.9312, 76.2673" />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

