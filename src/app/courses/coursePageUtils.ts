import type { Metadata } from "next";
import type { CourseEntry } from "./courseData";

const baseUrl = "https://smeclabs.ac.in";
const mobileUrl = "https://m.smeclabs.ac.in";

export function buildCourseMetadata(course: CourseEntry): Metadata {
  const courseTitle = `${course.title} in Kochi, Kerala | SMEClabs`;
  const courseDescription = `${course.description} Join the best ${course.title.toLowerCase()} training in Kochi with 100% placement assistance at SMEClabs.`;
  
  return {
    metadataBase: new URL(mobileUrl),
    title: courseTitle,
    description: courseDescription,
    keywords: `${course.title.toLowerCase()} course in kochi, ${course.title.toLowerCase()} training kochi, ${course.title.toLowerCase()} institute kerala, ${course.category.toLowerCase()} courses kochi, smeclabs ${course.title.toLowerCase()}, professional training kochi`,
    alternates: {
      canonical: `${baseUrl}/${course.slug}/`,
    },
    openGraph: {
      title: courseTitle,
      description: courseDescription,
      url: `${baseUrl}/${course.slug}/`,
      siteName: "SMEClabs",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: `${baseUrl}/img/logo-new.webp`,
          width: 1200,
          height: 630,
          alt: `${course.title} - SMEClabs Kochi`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: courseTitle,
      description: courseDescription,
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
}


