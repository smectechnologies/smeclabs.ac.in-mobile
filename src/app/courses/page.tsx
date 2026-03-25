import type { Metadata } from "next";
import CoursesClient from "../CoursesClient";
import { CourseListSchema } from "../components/StructuredData";
import { courses } from "./courseData";

const baseUrl = "https://smeclabs.ac.in";
const mobileUrl = "https://m.smeclabs.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(mobileUrl),
  title: "Courses | SMEClabs Kochi",
  description:
    "Explore all SMEClabs courses across automation, IT, data science, logistics, oil and gas, and more with practical training and placement support.",
  alternates: {
    canonical: `${baseUrl}/courses`,
  },
  openGraph: {
    title: "Courses | SMEClabs Kochi",
    description:
      "Browse all industry-aligned SMEClabs courses and choose your career-focused learning track.",
    url: `${baseUrl}/courses`,
    siteName: "SMEClabs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${baseUrl}/img/logo-new.webp`,
        width: 1200,
        height: 630,
        alt: "SMEClabs Courses",
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

export default function CoursesPage() {
  return (
    <>
      <CourseListSchema courseList={courses} />
      <CoursesClient />
    </>
  );
}
