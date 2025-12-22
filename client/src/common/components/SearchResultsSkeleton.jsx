export function SearchResultsSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-[#1A1A1A] border border-[#F5F5F5]/5 rounded-xl p-4 space-y-3"
        >
          <div className="h-4 w-24 bg-[#0D0D0D] rounded" />
          <div className="h-5 w-3/4 bg-[#0D0D0D] rounded" />
          <div className="h-4 w-full bg-[#0D0D0D] rounded" />
          <div className="flex justify-between pt-3">
            <div className="h-4 w-16 bg-[#0D0D0D] rounded" />
            <div className="h-8 w-20 bg-[#0D0D0D] rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
