export default function DashboardLoading() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Hero skeleton */}
      <div className="skeleton rounded-2xl h-48 w-full" />

      {/* Grid skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton rounded-2xl h-44" />
        ))}
      </div>

      {/* Activity skeleton */}
      <div className="skeleton rounded-2xl h-52 w-full" />
    </div>
  );
}
