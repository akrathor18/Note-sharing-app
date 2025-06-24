export default function StudyActivityChart() {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Study Activity</h2>
        <select className="bg-[#0D0D0D] text-sm border border-[#F5F5F5]/10 rounded-lg px-2 py-1 focus:outline-none focus:border-[#FF007F]">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="h-36 md:h-48 flex items-end justify-between px-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
          // Generate random heights for the chart bars
          const height = Math.floor(Math.random() * 80) + 20;
          return (
            <div key={day} className="flex flex-col items-center">
              <div
                className="bg-white w-6 md:w-8 rounded-t-sm transition-all duration-500 hover:opacity-80"
                style={{
                  height: `${height}%`,
                  backgroundColor: i === 2 ? "#FF007F" : "#00E5FF",
                }}
              ></div>
              <span className="text-xs mt-2 text-[#F5F5F5]/60">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}