import React from 'react';
import AchievementCard from './AchievementCard';
import { Smile } from 'lucide-react';

function AchievementsList({ achievements }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">My Achievements</h2>
            <div className="space-y-4">
                {achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} showProgress={true} />
                ))}
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-5 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FF007F]/10 flex items-center justify-center mb-3">
                    <Smile size={32} className="text-[#FF007F]" />
                </div>
                <h3 className="text-lg font-medium mb-2">Keep Going!</h3>
                <p className="text-[#F5F5F5]/60 mb-4">
                    Complete more quizzes and create notes to unlock more achievements
                </p>
                <button className="px-4 py-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white rounded-lg">
                    Explore More Quizzes
                </button>
            </div>
        </div>
    );
}

export default AchievementsList; 