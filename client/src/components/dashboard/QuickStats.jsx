import React from 'react'

function QuickStats(mainStats) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {mainStats.mainStats.map((stat, index) => (
                <div
                    key={index}
                    className="group relative bg-[#111111] rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.11] transition-all duration-200 overflow-hidden shadow-xl shadow-black/40"
                >
                    {/* Gradient background — preserved from original, softened */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-40 pointer-events-none`} />

                    {/* Corner orb — repositioned, more refined */}
                    <div
                        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: stat.color }}
                    />

                    {/* Content */}
                    <div className="relative flex flex-col gap-3">

                        {/* Icon */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center self-start transition-transform duration-200 group-hover:scale-105"
                            style={{
                                backgroundColor: `${stat.color}18`,
                                boxShadow: `0 0 0 1px ${stat.color}28`,
                            }}
                        >
                            <stat.icon size={19} style={{ color: stat.color }} />
                        </div>

                        {/* Value + labels */}
                        <div>
                            <div
                                className="text-2xl md:text-3xl font-bold leading-none mb-1.5 tabular-nums"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-white/75 mb-0.5">{stat.label}</div>
                            <div className="text-xs text-white/35 leading-snug">{stat.description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuickStats