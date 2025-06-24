export default function ActivityStats({ stats }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F5F5F5]/60 text-sm">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }