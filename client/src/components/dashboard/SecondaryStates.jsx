function SecondaryStates(statsData) {
    const secondaryStats = statsData.statsData;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryStats.map((stat, index) => (
                <div key={index} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F5F5F5]/5">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${stat.color}20` }}
                        >
                            <stat.icon size={28} style={{ color: stat.color }} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-[#F5F5F5] mb-1">{stat.label}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SecondaryStates
