import React from 'react'
import { Trophy, Star } from "lucide-react"
function AverageQuizeScore(user) {
    const userData = user.user;
    return (
        <div className="bg-gradient-to-br from-[#9C27B0]/20 to-[#9C27B0]/5 rounded-xl p-6 border border-[#9C27B0]/20">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#9C27B0]/20 flex items-center justify-center mb-4">
                    <Trophy size={32} className="text-[#9C27B0]" />
                </div>
                <div className="text-3xl font-bold text-[#9C27B0] mb-2">🧠 {userData.averageQuizScore}%</div>
                <div className="text-lg font-medium text-[#F5F5F5] mb-2">Average Quiz Score</div>
                <div className="text-sm text-[#F5F5F5]/70 mb-4">
                    Excellent performance across {userData.totalQuizAttempts} attempts!
                </div>
                <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={16}
                            className={`${star <= Math.floor(userData.averageQuizScore / 20)
                                    ? "text-[#FFD93D] fill-current"
                                    : "text-[#F5F5F5]/20"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AverageQuizeScore
