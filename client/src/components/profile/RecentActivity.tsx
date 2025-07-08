import React from 'react';
import ActivityItem from './ActivityItem';

function RecentActivity({ recentActivity }) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-5">
            <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
                {recentActivity.slice(0, 3).map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
}

export default RecentActivity; 