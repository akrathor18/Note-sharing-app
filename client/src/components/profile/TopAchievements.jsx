import React from 'react';
import AchievementCard from './AchievementCard';

function TopAchievements({ achievements }) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-5">
            <h2 className="text-lg font-bold mb-4">Top Achievements</h2>
            <div className="space-y-3">
                {achievements.slice(0, 2).map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
        </div>
    );
}

export default TopAchievements; 