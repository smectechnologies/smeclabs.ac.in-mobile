'use client';

import Link from 'next/link';
import { Category, ThemeMode } from './types';

interface CategoryGridProps {
  categories?: Category[];
  theme: ThemeMode;
}

// Default categories as specified in the requirements
const defaultCategories: Category[] = [
  { 
    id: '1', 
    name: 'Automation', 
    slug: 'industrial-automation-course-in-kochi', 
    icon: '⚙️', 
    color: 'bg-red',
    description: 'Industrial automation and control systems',
    courseCount: 12,
    order: 1
  },
  { 
    id: '2', 
    name: 'Oil & Gas', 
    slug: 'oil-and-gas-course-in-kochi', 
    icon: '🛤️', 
    color: 'bg-orange',
    description: 'Oil and gas industry training',
    courseCount: 6,
    order: 2
  },
  { 
    id: '3', 
    name: 'IT', 
    slug: 'software-development-course-in-kochi', 
    icon: '💻', 
    color: 'bg-blue',
    description: 'IT & software development',
    courseCount: 18,
    order: 3
  },
  { 
    id: '4', 
    name: 'Fintech', 
    slug: 'fintech-course-in-kochi', 
    icon: '💰', 
    color: 'bg-teal',
    description: 'Financial technology and services',
    courseCount: 10,
    order: 4
  },
  { 
    id: '5', 
    name: 'Civil', 
    slug: 'civil-course-in-kochi', 
    icon: '🏗️', 
    color: 'bg-yellow',
    description: 'Civil engineering and construction',
    courseCount: 9,
    order: 5
  },
  { 
    id: '6', 
    name: 'Management', 
    slug: 'logistics-course-in-kochi', 
    icon: '🏢', 
    color: 'bg-indigo',
    description: 'Business management training',
    courseCount: 5,
    order: 6
  },
];

export default function CategoryGrid({ categories = defaultCategories, theme }: CategoryGridProps) {
  return (
    <section className="smecnew-section" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="section-heading">
        Select Your Area of Interest
      </h2>
      <div className="category-grid" data-testid="category-grid" role="list">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className={`category-card ${category.color}`}
            data-testid="category-card"
            role="listitem"
            aria-label={`Explore ${category.name} courses`}
          >
            <span className="category-icon" aria-hidden="true">
              {category.icon.startsWith('http') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={category.icon} alt="" width={32} height={32} style={{ width: 32, height: 32 }} />
              ) : (
                category.icon
              )}
            </span>
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}