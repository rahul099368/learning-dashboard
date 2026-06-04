interface CourseSkeletonProps {
  count?: number;
}

export function CourseSkeleton({ count = 4 }: CourseSkeletonProps) {
  return (
    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border-subtle overflow-hidden p-5 space-y-3"
          style={{ backgroundColor: "#0d1117" }}
        >
          {/* Icon skeleton */}
          <div className="skeleton w-10 h-10 rounded-xl" />
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="skeleton h-3.5 rounded-full w-3/4" />
            <div className="skeleton h-3 rounded-full w-1/2" />
          </div>
          {/* Progress skeleton */}
          <div className="pt-2 space-y-1.5">
            <div className="flex justify-between">
              <div className="skeleton h-2.5 w-14 rounded-full" />
              <div className="skeleton h-2.5 w-8 rounded-full" />
            </div>
            <div className="skeleton h-1 rounded-full w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
