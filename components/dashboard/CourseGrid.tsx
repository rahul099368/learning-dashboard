import { CourseCard } from "./CourseCard";
import type { Course } from "@/types";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </div>
  );
}
