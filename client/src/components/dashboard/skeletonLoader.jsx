export default function SkeletonLoader() {
  return (
    <div className="space-y-6 md:space-y-8 animate-pulse">
      {/* Welcome Section */}
      <div>
        <div className="h-6 w-2/3 bg-[#2A2A2A] rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-[#2A2A2A] rounded"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-16 bg-[#2A2A2A] rounded mb-2"></div>
                <div className="h-6 w-24 bg-[#2A2A2A] rounded"></div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2A2A2A] rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Notes Skeleton */}
      <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <div className="h-5 w-1/4 bg-[#2A2A2A] rounded"></div>
          <div className="h-4 w-16 bg-[#2A2A2A] rounded"></div>
        </div>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D0D]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-[#2A2A2A] rounded-lg"></div>
              <div className="space-y-1 min-w-0">
                <div className="h-4 w-32 bg-[#2A2A2A] rounded"></div>
                <div className="h-3 w-24 bg-[#2A2A2A] rounded"></div>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#2A2A2A] rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Quizzes and Activity Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Quizzes */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5 space-y-3">
          <div className="h-5 w-1/3 bg-[#2A2A2A] rounded mb-3"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-3 rounded-lg bg-[#0D0D0D] space-y-2">
              <div className="h-4 w-1/2 bg-[#2A2A2A] rounded"></div>
              <div className="h-3 w-1/3 bg-[#2A2A2A] rounded"></div>
            </div>
          ))}
        </div>

        {/* Activity Chart */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
          <div className="h-5 w-1/3 bg-[#2A2A2A] rounded mb-4"></div>
          <div className="h-36 md:h-48 flex items-end justify-between px-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-6 md:w-8 bg-[#2A2A2A] rounded-sm"
                  style={{ height: `${30 + i * 5}px` }}
                ></div>
                <div className="h-3 w-6 mt-2 bg-[#2A2A2A] rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
