'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Course, ThemeMode } from './types';

interface FeaturedCoursesProps {
  courses?: Course[];
  theme: ThemeMode;
}

const defaultCourses: Course[] = [
  {
    id: '1',
    name: 'Industrial Automation & PLC',
    slug: 'industrial-automation-course-in-kochi',
    description: 'Master PLC programming, SCADA, and industrial control systems.',
    duration: '6 months',
    rating: 4.8,
    studentCount: 2500,
    thumbnail: '/homecards/automation.webp',
    category: 'Automation',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Data Science & Machine Learning',
    slug: 'data-science-course-in-kochi',
    description: 'Learn data analysis, ML algorithms, and AI with Python.',
    duration: '8 months',
    rating: 4.9,
    studentCount: 3200,
    thumbnail: '/homecards/datascience.webp',
    category: 'IT',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Python Full Stack Development',
    slug: 'python-course-in-kochi',
    description: 'Build modern web apps with Python, Django, and React.',
    duration: '7 months',
    rating: 4.7,
    studentCount: 2800,
    thumbnail: '/homecards/fullstack.webp',
    category: 'IT',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="pc-stars" aria-label={`Rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'pc-star filled' : 'pc-star'}>★</span>
      ))}
      <span className="pc-rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function FeaturedCourses({ courses = defaultCourses, theme }: FeaturedCoursesProps) {
  return (
    <section className="smecnew-section" aria-labelledby="popular-courses-heading">
      <div className="pc-header">
        <h2 id="popular-courses-heading" className="pc-heading">
          <span className="pc-heading-accent">🔥</span> Popular Courses
        </h2>
        <Link href="/courses" className="pc-view-all">See all</Link>
      </div>

      <div className="pc-list">
        {courses.map((course, i) => (
          <Link
            key={course.id}
            href={`/${course.slug}`}
            className="pc-card"
            aria-label={`View ${course.name}`}
          >
            {/* Rank badge */}
            <div className="pc-rank">#{i + 1}</div>

            {/* Thumbnail */}
            <div className="pc-thumb">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.name}
                  fill
                  sizes="88px"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <span className="pc-thumb-fallback">📚</span>
              )}
            </div>

            {/* Info */}
            <div className="pc-info">
              <span className="pc-category">{course.category}</span>
              <h3 className="pc-name">{course.name}</h3>
              <StarRating rating={course.rating} />
              <div className="pc-meta">
                <span>⏱ {course.duration}</span>
                <span>·</span>
                <span>👥 {course.studentCount.toLocaleString()}+</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="pc-arrow">›</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
