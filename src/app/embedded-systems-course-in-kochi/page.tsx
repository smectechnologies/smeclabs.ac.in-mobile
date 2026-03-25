import type { Metadata } from "next";
import CourseRoadmapClient from "../courses/CourseRoadmapClient";
import { coursesBySlug } from "../courses/courseData";
import { buildCourseMetadata } from "../courses/coursePageUtils";

const course = coursesBySlug.get("embedded-systems-course-in-kochi");

if (!course) {
  throw new Error("Missing course data for embedded-systems-course-in-kochi");
}

export const metadata: Metadata = buildCourseMetadata(course);

export default function CoursePage() {
  return <CourseRoadmapClient course={course!} />;
}
