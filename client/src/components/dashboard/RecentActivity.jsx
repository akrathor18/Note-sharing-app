import React from 'react'
import { Clock } from "lucide-react"

import { formatDate } from '../../utils/formatDate';
import { getActivityIcon, getActivityColor } from '../../utils/getActivityIconColor';

function RecentActivity(activityData) {
    const activity = activityData.activity;

    return (
        <div className="bg-[#111111] rounded-2xl p-6 border border-white/[0.06] shadow-xl shadow-black/40">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                    <Clock size={17} className="text-[#4CAF50]" />
                </div>
                <h2 className="text-base font-semibold tracking-tight text-white/90">Recent Activity</h2>
                {activity.length > 0 && (
                    <span className="ml-auto text-xs font-medium text-white/30 bg-white/5 px-2.5 py-1 rounded-full border border-white/[0.06]">
                        {activity.length} {activity.length === 1 ? 'entry' : 'entries'}
                    </span>
                )}
            </div>

            {/* Activity List */}
            {activity.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {activity.map((item, index) => {
                        const ActivityIcon = getActivityIcon(item.type)
                        const activityColor = getActivityColor(item.type)

                        return (
                            <div
                                key={item._id}
                                className="group flex gap-3.5 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 border border-white/[0.04] hover:border-white/[0.09] cursor-default"
                                style={{ animationDelay: `${index * 40}ms` }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                                    style={{ backgroundColor: `${activityColor}18`, boxShadow: `0 0 0 1px ${activityColor}25` }}
                                >
                                    <ActivityIcon size={17} style={{ color: activityColor }} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-medium text-sm text-white/85 truncate leading-snug">
                                            {item.title}
                                        </h3>
                                        <span className="text-[11px] text-white/30 shrink-0 mt-0.5 tabular-nums">
                                            {formatDate(item.timestamp)}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-white/45">
                                        <span className="capitalize">{item.description}</span>

                                        {item.subject && (
                                            <>
                                                <span className="text-white/20">·</span>
                                                <span>{item.subject}</span>
                                            </>
                                        )}

                                        {item.score && (
                                            <>
                                                <span className="text-white/20">·</span>
                                                <span
                                                    className="font-semibold"
                                                    style={{ color: activityColor }}
                                                >
                                                    {item.percentageScore}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="relative mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                            <Clock size={28} className="text-white/20" />
                        </div>
                        <div className="absolute -inset-3 rounded-3xl bg-white/[0.015] -z-10 blur-sm" />
                    </div>
                    <h3 className="text-sm font-semibold text-white/50 mb-1.5">No activity yet</h3>
                    <p className="text-xs text-white/30 max-w-[220px] leading-relaxed">
                        Upload notes or take a quiz to start tracking your learning journey.
                    </p>
                </div>
            )}
        </div>
    )
}

export default RecentActivity