import React from 'react'
import {
    BrainCircuit,
    Plus,
    Activity,
    Flame,
    Upload,
    Clock,
} from "lucide-react"

import { formatDate } from '../../utils/formatDate';
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

                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#F5F5F5]/60 mb-1">
                                        <span className="capitalize">{activity.description}</span>
                                        {activity.subject && <span>• {activity.subject}</span>}
                                        {activity.score && <span>{`• Score: ${activity.percentageScore}%`}</span>}
                                        <span>• {formatDate(activity.timestamp)}</span>
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
