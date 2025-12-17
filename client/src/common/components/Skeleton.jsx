function QuizListSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-6 w-32 bg-[#1A1A1A] rounded mb-2"></div>
        <div className="h-4 w-64 bg-[#1A1A1A] rounded"></div>
      </div>

      {/* Create Button */}
      <div className="h-10 w-48 bg-[#1A1A1A] rounded-lg"></div>

      {/*  Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-[#1A1A1A] border border-[#F5F5F5]/5 rounded-xl p-4 space-y-3"
          >
            <div className="h-4 w-20 bg-[#0D0D0D] rounded"></div>
            <div className="h-5 w-3/4 bg-[#0D0D0D] rounded"></div>
            <div className="h-4 w-full bg-[#0D0D0D] rounded"></div>
            <div className="flex justify-between mt-4">
              <div className="h-4 w-16 bg-[#0D0D0D] rounded"></div>
              <div className="h-8 w-20 bg-[#0D0D0D] rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default QuizListSkeleton;