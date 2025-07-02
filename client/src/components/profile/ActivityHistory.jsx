import React from 'react';
import ActivityItem from './ActivityItem';

function ActivityHistory({ recentActivity }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Activity History</h2>
            <div className="space-y-3">
                {recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
}

export default ActivityHistory; 