export default function QuizSkeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      {/* Header */}
      <div className="mb-6">
        {/* Title */}
        <div className="h-6 w-2/3 bg-[#1A1A1A] rounded mb-3" />

        {/* Meta row */}
        <div className="flex justify-between">
          <div className="h-4 w-32 bg-[#1A1A1A] rounded" />
          <div className="h-4 w-20 bg-[#1A1A1A] rounded" />
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full mt-4 overflow-hidden">
          <div className="h-full w-1/3 bg-[#2A2A2A] rounded-full" />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
        {/* Question text */}
        <div className="h-5 w-4/5 bg-[#2A2A2A] rounded mb-6" />

        {/* Options */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="w-full p-4 rounded-lg flex items-center border border-[#F5F5F5]/10 bg-[#0D0D0D]"
            >
              <div className="w-6 h-6 rounded-full bg-[#1A1A1A] mr-3" />
              <div className="h-4 w-3/4 bg-[#1A1A1A] rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <div className="h-10 w-24 bg-[#1A1A1A] rounded-lg" />
        <div className="h-10 w-32 bg-[#1A1A1A] rounded-lg" />
      </div>
    </div>
  );
}
