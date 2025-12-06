import React from 'react'

function QuickStats(mainStats) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {mainStats.mainStats.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl p-6 border border-[#F5F5F5]/10 hover:border-[#F5F5F5]/20 transition-all duration-300 group relative overflow-hidden`}
                >
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: `${stat.color}30` }}
                            >
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>

                        </div>
                        <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: stat.color }}>
                            {stat.value}
                        </div>
                        <div className="text-sm font-medium text-[#F5F5F5] mb-1">{stat.label}</div>
                        <div className="text-xs text-[#F5F5F5]/60">{stat.description}</div>
                    </div>
                    <div
                        className="absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-10"
                        style={{ backgroundColor: stat.color }}
                    ></div>
                </div>
            ))}
        </div>
    )
}

export default QuickStats
