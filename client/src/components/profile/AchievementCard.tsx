import React from 'react';

function AchievementCard({ achievement, showProgress = true }) {
    return (
        <div className="p-3 rounded-lg bg-[#0D0D0D]">
            <div className="flex items-center gap-3 mb-2">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${achievement.color}20` }}
                >
                    <achievement.icon size={20} style={{ color: achievement.color }} />
                </div>
                <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-xs text-[#F5F5F5]/60">{achievement.description}</p>
                </div>
            </div>
            {showProgress && (
                <>
                    <div className="w-full bg-[#1A1A1A] rounded-full h-2">
                        <div
                            className="h-2 rounded-full"
                            style={{ width: `${achievement.progress}%`, backgroundColor: achievement.color }}
                        ></div>
                    </div>
                    <p className="text-right text-xs mt-1 text-[#F5F5F5]/60">
                        {achievement.progress}% complete
                    </p>
                </>
            )}
        </div>
    );
}

export default AchievementCard; 