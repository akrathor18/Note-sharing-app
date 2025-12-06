import React from 'react'
import { Flame } from "lucide-react"
function Streak(user) {
    const userData = user.user;

  return (
    <div className="bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 rounded-xl p-6 border border-[#FF6B35]/20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FF6B35]/20 flex items-center justify-center mb-4">
                <Flame size={32} className="text-[#FF6B35]" />
              </div>
              <div className="text-3xl font-bold text-[#FF6B35] mb-2">🔥 {userData.currentStreak} Days</div>
              <div className="text-lg font-medium text-[#F5F5F5] mb-2">Current Streak</div>
              <div className="text-sm text-[#F5F5F5]/70 mb-4">You're on fire! Keep up the consistent learning.</div>
              <div className="w-full bg-[#0D0D0D] rounded-full h-2">
                <div
                  className="bg-[#FF6B35] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((userData.currentStreak / 30) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-[#F5F5F5]/60 mt-2">
                {30 - userData.currentStreak > 0
                  ? `${30 - userData.currentStreak} days to 30-day milestone`
                  : "30-day milestone achieved!"}
              </div>
            </div>
          </div>
  )
}

export default Streak
