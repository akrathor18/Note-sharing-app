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
        </div>
    );
}

export default ActivityItem; 