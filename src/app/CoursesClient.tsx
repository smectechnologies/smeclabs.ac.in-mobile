"use client";

import Link from "next/link";
import SmecnewLayout from "./components/smecnew/SmecnewLayout";
import { courses } from "./courses/courseData";

const courseStages = [
  { title: "Foundation", from: 0, to: 5 },
  { title: "Specialization", from: 5, to: 11 },
  { title: "Career Track", from: 11, to: 16 },
];

export default function CoursesClient() {
  return (
    <SmecnewLayout>
      <div className="career-hero">
        <p className="career-eyebrow">All Courses</p>
        <h1 className="career-title">Choose your learning path</h1>
        <p className="career-desc">
          Open any course to view the detailed roadmap blocks and learning progression.
        </p>
      </div>

      <div className="courses-roadmap" aria-label="Courses roadmap">
        <div className="courses-roadmap-line" aria-hidden />
        {courseStages.map((stage) => (
          <section key={stage.title} className="courses-stage">
            <h2 className="courses-stage-title">{stage.title}</h2>
            <div className="courses-grid">
              {courses.slice(stage.from, stage.to).map((course) => (
                <Link key={course.slug} href={`/${course.slug}`} className="course-block">
                  <span className="course-block-title">{course.title}</span>
                  <span className="course-block-meta">{course.category}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SmecnewLayout>
  );
}
