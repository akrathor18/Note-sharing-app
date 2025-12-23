import React from 'react';
import ActivityItem from './ActivityItem';
import { Clock } from 'lucide-react';
import EmptyState from '../../common/components/EmptyState';
function ActivityHistory({ recentActivity }) {
    return (
        <div className="space-y-4 bg-[#1A1A1A] p-6">
            <h2 className="text-lg font-bold bg-[#1A1A1A]">Activity History</h2>
            {recentActivity.length > 0 ? (
                <div className="space-y-3 ">
                    {recentActivity.map((activity) => (
                        <ActivityItem key={activity.timestamp} activity={activity} />
                    ))}
                </div>
            ) : (
                <EmptyState type='activity'/>
            )}
        </div>
    );
}
export default ActivityHistory; 