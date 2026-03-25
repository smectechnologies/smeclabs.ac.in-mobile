"use client";

import { useState, useSyncExternalStore } from "react";
import SmecnewLayout from "./components/smecnew/SmecnewLayout";
import PromotionalBanner from "./components/smecnew/PromotionalBanner";
import CategoryGrid from "./components/smecnew/CategoryGrid";
import FeaturedCourses from "./components/smecnew/FeaturedCourses";
import AboutSection from "./components/smecnew/AboutSection";
import WhyChooseUs from "./components/smecnew/WhyChooseUs";
import Testimonials from "./components/smecnew/Testimonials";

type ThemeMode = "light" | "dark";

function subscribeTheme(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getThemeSnapshot = (): ThemeMode =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const getThemeServerSnapshot = (): ThemeMode => "light";

const learningDomains = [
  { id: "1", name: "Automation", slug: "industrial-automation-course-in-kochi", icon: "https://api.iconify.design/mdi:robot-industrial.svg?color=%23dc2626&width=32", color: "bg-red", description: "Industrial Automation Training", courseCount: 5, order: 1 },
  { id: "2", name: "Oil & Gas", slug: "oil-and-gas-course-in-kochi", icon: "https://api.iconify.design/game-icons:oil-pump.svg?color=%23ea580c&width=32", color: "bg-orange", description: "Oil & Gas Industry Training", courseCount: 4, order: 2 },
  { id: "3", name: "IT", slug: "software-development-course-in-kochi", icon: "https://api.iconify.design/mdi:laptop.svg?color=%232563eb&width=32", color: "bg-blue", description: "IT & Software Development", courseCount: 10, order: 3 },
  { id: "4", name: "Fintech", slug: "fintech-course-in-kochi", icon: "https://api.iconify.design/mdi:bank.svg?color=%230d9488&width=32", color: "bg-teal", description: "Financial Technology Training", courseCount: 3, order: 4 },
  { id: "5", name: "Civil", slug: "civil-course-in-kochi", icon: "https://api.iconify.design/mdi:crane.svg?color=%23ca8a04&width=32", color: "bg-yellow", description: "Civil Engineering Training", courseCount: 7, order: 5 },
  { id: "6", name: "Management", slug: "logistics-course-in-kochi", icon: "https://api.iconify.design/mdi:briefcase.svg?color=%234338ca&width=32", color: "bg-indigo", description: "Business Management Training", courseCount: 4, order: 6 },
];

const featuredCourses = [
  {
    id: "1",
    name: "Industrial Automation",
    slug: "industrial-automation-course-in-kochi",
    description: "Master PLC, SCADA, and industrial control systems",
    duration: "6 months",
    rating: 4.8,
    studentCount: 2500,
    thumbnail: "/homecards/automation.webp",
    category: "automation",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Data Science & AI",
    slug: "data-science-course-in-kochi",
    description: "Learn Python, Machine Learning, and AI fundamentals",
    duration: "8 months",
    rating: 4.9,
    studentCount: 3000,
    thumbnail: "/homecards/datascience.webp",
    category: "data-science",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Full Stack Development",
    slug: "python-course-in-kochi",
    description: "Build modern web applications with Python and React",
    duration: "6 months",
    rating: 4.7,
    studentCount: 4000,
    thumbnail: "/homecards/fullstack.webp",
    category: "web-development",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function HomeClient() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredCategories = searchQuery
    ? learningDomains.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery) ||
          d.description.toLowerCase().includes(searchQuery)
      )
    : learningDomains;

  const filteredCourses = searchQuery
    ? featuredCourses.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery) ||
          c.description.toLowerCase().includes(searchQuery) ||
          c.category.toLowerCase().includes(searchQuery)
      )
    : featuredCourses;

  return (
    <SmecnewLayout onSearch={handleSearch}>
      {searchQuery && (
        <div className="smecnew-section" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--foreground)", opacity: 0.7, padding: "0 1rem" }}>
            {filteredCategories.length + filteredCourses.length > 0
              ? `Found ${filteredCategories.length} categories and ${filteredCourses.length} courses`
              : "No results found. Try a different search term."}
          </p>
        </div>
      )}

      {!searchQuery && <PromotionalBanner theme={theme} />}

      {filteredCategories.length > 0 && (
        <CategoryGrid categories={filteredCategories} theme={theme} />
      )}

      {filteredCourses.length > 0 && (
        <FeaturedCourses courses={filteredCourses} theme={theme} />
      )}

      {!searchQuery && <WhyChooseUs theme={theme} />}
      {!searchQuery && <Testimonials theme={theme} />}
      {!searchQuery && <AboutSection theme={theme} />}
    </SmecnewLayout>
  );
}
