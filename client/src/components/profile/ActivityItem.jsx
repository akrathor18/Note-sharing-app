import React from 'react';
import { FileText, BrainCircuit, Clock, } from 'lucide-react';
import { getActivityColor, getActivityIcon } from '../../utils/getActivityIconColor';
import { formatDate } from '../../utils/formatDate';
function ActivityItem({ activity }) {
    const ActivityIcon = getActivityIcon(activity.type)
    const activityColor = getActivityColor(activity.type)
    return (
        <div className="space-y-3">
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
                    <div className="
      text-sm text-[#F5F5F5]/60
      flex flex-col gap-1
      sm:flex-row sm:items-center sm:gap-2
    ">
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

        </div>
    );
}

export default ActivityItem; 