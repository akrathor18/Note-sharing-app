import React from 'react'
import {
    Clock,
} from "lucide-react"

import { formatDate } from '../../utils/formatDate';
import { getActivityIcon, getActivityColor } from '../../utils/getActivityIconColor';
function RecentActivity(activityData) {
    const activity = activityData.activity;


    return (
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Clock size={20} className="text-[#4CAF50]" />Recent Activity
                </h2>
                {/* <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
                    View All <ChevronRight size={16} />
                </button> */}
            </div>



            {activity.length > 0 ? (
                <div className="space-y-3">
                    {activity.map((activity) => {
                        const ActivityIcon = getActivityIcon(activity.type)
                        const activityColor = getActivityColor(activity.type)

                        return (
                            <div
                                key={activity._id}
                                className="flex gap-4 p-4 rounded-lg bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 transition-colors border border-[#F5F5F5]/5"
                            >
                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${activityColor}20` }}
                                >
                                    <ActivityIcon size={20} style={{ color: activityColor }} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {/* Title */}
                                    <h3 className="font-medium truncate mb-1">
                                        {activity.title}
                                    </h3>

                                    {/* Meta info */}
                                    <div className="text-sm text-[#F5F5F5]/60 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                                        <span className="capitalize">{activity.description}</span>

                                        {activity.subject && (
                                            <>
                                                <span className="hidden sm:inline">•</span>
                                                <span>{activity.subject}</span>
                                            </>
                                        )}

                                        {activity.score && (
                                            <>
                                                <span className="hidden sm:inline">•</span>
                                                <span>{`Score: ${activity.percentageScore}%`}</span>
                                            </>
                                        )}

                                        {/* Date */}
                                        <span className="text-xs opacity-70 sm:ml-auto">
                                            {formatDate(activity.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#0D0D0D] flex items-center justify-center mb-4">
                        <Clock size={32} className="text-[#F5F5F5]/30" />
                    </div>
                    <h3 className="text-lg font-medium text-[#F5F5F5]/70 mb-2">No Recent Activity</h3>
                    <p className="text-sm text-[#F5F5F5]/50 text-center max-w-xs">
                        Start uploading notes or taking quizzes to see your activity here. Your learning journey starts now!
                    </p>
                </div>
            )}

        </div>
    )
}

export default RecentActivity
