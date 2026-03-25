export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SMEClabs",
    "alternateName": "SMEC Automation Training Division",
    "url": "https://smeclabs.ac.in",
    "logo": "https://smeclabs.ac.in/img/logo-new.webp",
    "description": "Leading training institute in Kochi, Kerala offering professional courses in Industrial Automation, Software Development, Data Science, and more with 100% placement assistance.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "postalCode": "682XXX",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.9312,
      "longitude": 76.2673
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8289887322",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "ml"]
    },
    "sameAs": [
      "https://www.facebook.com/smeclabs",
      "https://www.instagram.com/smeclabs",
      "https://www.linkedin.com/company/smeclabs"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseSchema({ course }: { course: { title: string; description: string; slug: string; category: string } }) {
  const baseUrl = "https://smeclabs.ac.in";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${course.title} in Kochi`,
    "description": course.description,
    "url": `${baseUrl}/courses/${course.slug}/`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "SMEClabs",
      "url": baseUrl,
      "sameAs": baseUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kochi",
        "addressRegion": "Kerala",
        "addressCountry": "IN"
      }
    },
    "courseCode": course.slug,
    "educationalLevel": "Professional",
    "inLanguage": ["en", "ml"],
    "teaches": course.category,
    "educationalCredentialAwarded": "Professional Certificate",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "category": "Professional Training",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["onsite", "online", "blended"],
      "courseWorkload": "PT6M",
      "location": {
        "@type": "Place",
        "name": "SMEClabs Kochi",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseListSchema({ courseList }: { courseList: Array<{ title: string; slug: string }> }) {
  const baseUrl = "https://smeclabs.ac.in";
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Professional Courses at SMEClabs Kochi",
    "description": "Browse all professional training courses offered by SMEClabs in Kochi, Kerala.",
    "url": `${baseUrl}/courses/`,
    "numberOfItems": courseList.length,
    "itemListElement": courseList.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.title,
      "url": `${baseUrl}/courses/${c.slug}/`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SMEClabs",
    "image": "https://smeclabs.ac.in/img/logo-new.webp",
    "@id": "https://smeclabs.ac.in",
    "url": "https://smeclabs.ac.in",
    "telephone": "+91-8289887322",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "postalCode": "682XXX",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.9312,
      "longitude": 76.2673
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/smeclabs",
      "https://www.instagram.com/smeclabs",
      "https://www.linkedin.com/company/smeclabs"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
