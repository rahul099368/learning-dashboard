import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { StatsTile } from "@/components/dashboard/StatsTile";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { CourseSkeleton } from "@/components/ui/CourseSkeleton";
import { fetchCourses } from "@/lib/data";

// Mock user — in a real app this would come from Supabase Auth session
const USER = {
  name: "Alex Rivera",
  streak: 14,
  level: 7,
  xp: 2340,
  xp_next: 3000,
};

export default async function DashboardPage() {
  return (
    <section className="p-5 lg:p-8 space-y-4 max-w-7xl mx-auto">
      {/* Hero tile — no async needed */}
      <HeroTile user={USER} />

      {/* Bento grid containing courses + stats */}
      <BentoGrid>
        {/* Courses: wrapped in Suspense for streaming */}
        <Suspense fallback={<CourseSkeleton count={4} />}>
          <CoursesSection />
        </Suspense>

        {/* Stats tile */}
        <StatsTile user={USER} />
      </BentoGrid>

      {/* Activity / contribution graph */}
      <ActivityTile />
    </section>
  );
}

// Async Server Component — fetches courses from Supabase
async function CoursesSection() {
  const { data: courses, error } = await fetchCourses();

  if (error) {
    return (
      <div className="col-span-full rounded-2xl border border-accent-rose/30 bg-accent-rose/5 p-6 text-center">
        <p className="text-accent-rose font-mono text-sm">⚠ Failed to load courses</p>
        <p className="text-slate-500 text-xs mt-1">{error}</p>
      </div>
    );
  }

  return <CourseGrid courses={courses} />;
}
