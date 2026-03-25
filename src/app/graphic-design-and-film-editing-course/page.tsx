import type { Metadata } from "next";
import CourseRoadmapClient from "../courses/CourseRoadmapClient";
import { coursesBySlug } from "../courses/courseData";
import { buildCourseMetadata } from "../courses/coursePageUtils";

const course = coursesBySlug.get("graphic-design-and-film-editing-course");

if (!course) {
  throw new Error("Missing course data for graphic-design-and-film-editing-course");
}

export const metadata: Metadata = buildCourseMetadata(course);

export default function CoursePage() {
  return <CourseRoadmapClient course={course!} />;
}
