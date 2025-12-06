import React from 'react'
import {
    ChevronRight,
    BrainCircuit,
    Plus,
    Activity,
    Flame,
    Upload,
    Clock,
} from "lucide-react"
function RecentActivity(activityData) {
    const activity = activityData.activity;

    const getActivityIcon = (type) => {
        switch (type) {
            case "note_upload":
                return Upload
            case "quiz_attempt":
                return BrainCircuit
            case "quiz_created":
                return Plus
            case "streak_milestone":
                return Flame
            default:
                return Activity
        }
    }

    const getActivityColor = (type) => {
        switch (type) {
            case "note_upload":
                return "#FF007F"
            case "quiz_attempt":
                return "#00E5FF"
            case "quiz_created":
                return "#4CAF50"
            case "streak_milestone":
                return "#FF6B35"
            default:
                return "#9E9E9E"
        }
    }
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Clock size={20} className="text-[#4CAF50]" />Recent Activity
                </h2>
                <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
                    View All <ChevronRight size={16} />
                </button>
            </div>

            <div className="space-y-3">
                {activity.map((activity) => {
                    const ActivityIcon = getActivityIcon(activity.type)
                    const activityColor = getActivityColor(activity.type)

                    return (
                        <div
                            key={activity.id}
                            className="flex items-center gap-4 p-4 rounded-lg bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 transition-colors border border-[#F5F5F5]/5"
                        >
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${activityColor}20` }}
                            >
                                <ActivityIcon size={20} style={{ color: activityColor }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium truncate">{activity.title}</h3>
                                    {activity.points && (
                                        <span className="text-xs bg-[#FFD93D]/20 text-[#FFD93D] px-2 py-0.5 rounded-full">
                                            +{activity.points} XP
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#F5F5F5]/60 mb-1">
                                    <span className="capitalize">{activity.action}</span>
                                    {activity.subject && <span>• {activity.subject}</span>}
                                    {activity.score && <span>• Score: {activity.score}</span>}
                                    <span>• {activity.time}</span>
                                </div>
                                {activity.details && <div className="text-xs text-[#F5F5F5]/50">{activity.details}</div>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecentActivity
