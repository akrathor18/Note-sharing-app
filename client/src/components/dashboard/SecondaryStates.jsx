function SecondaryStates(statsData) {
    const secondaryStats = statsData.statsData;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {secondaryStats.map((stat, index) => (
                <div
                    key={index}
                    className="group relative bg-[#111111] rounded-2xl p-5 border border-white/[0.06] shadow-xl shadow-black/40 overflow-hidden transition-all duration-200 hover:border-white/[0.10]"
                >
                    {/* Background glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 0% 50%, ${stat.color}0D 0%, transparent 70%)` }}
                    />

                    <div className="flex items-center gap-4 relative">
                        {/* Icon */}
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                            style={{
                                backgroundColor: `${stat.color}15`,
                                boxShadow: `0 0 0 1px ${stat.color}22`,
                            }}
                        >
                            <stat.icon size={22} style={{ color: stat.color }} />
                        </div>

                        {/* Text */}
                        <div className="min-w-0">
                            <div
                                className="text-2xl font-bold leading-none mb-1 tabular-nums"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/50 truncate">{stat.label}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SecondaryStates