export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-xl p-4 h-32">
      <div className="h-8 w-8 bg-gray-300 rounded-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <div className="animate-pulse h-20 bg-gray-200 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
      <SkeletonList count={4} />
    </div>
  );
}
