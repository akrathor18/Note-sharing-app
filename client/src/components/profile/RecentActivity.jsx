import React from 'react';
import ActivityItem from './ActivityItem';
import { Clock } from 'lucide-react';
function RecentActivity({ recentActivity }) {
    return (
  <div className="bg-[#1A1A1A] rounded-xl p-5">
    <h2 className="text-lg font-bold mb-4">Recent Activity</h2>

    {recentActivity.length > 0 ? (
      <div className="space-y-3">
        {recentActivity.slice(0, 5).map((activity) => (
          <ActivityItem key={activity._id} activity={activity} />
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#0D0D0D] flex items-center justify-center mb-4">
          <Clock size={32} className="text-[#F5F5F5]/30" />
        </div>
        <h3 className="text-lg font-medium text-[#F5F5F5]/70 mb-2">
          No Recent Activity
        </h3>
        <p className="text-sm text-[#F5F5F5]/50 text-center max-w-xs">
          Start uploading notes or taking quizzes to see your activity here.
          Your learning journey starts now!
        </p>
      </div>
    )}
  </div>
);
}


export default RecentActivity; 