import React from 'react'
import { Flame } from "lucide-react"

function Streak(user) {
    const userData = user.user;
    const progress = Math.min((userData.currentStreak / 30) * 100, 100);
    const remaining = 30 - userData.currentStreak;

    return (
        <div className="relative bg-[#111111] rounded-2xl p-6 border border-[#FF6B35]/20 overflow-hidden shadow-xl shadow-black/40">

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 to-transparent pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#FF6B35]/10 blur-2xl pointer-events-none" />

            <div className="relative text-center">

                {/* Icon */}
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FF6B35]/15 border border-[#FF6B35]/25 flex items-center justify-center mb-4">
                    <Flame size={26} className="text-[#FF6B35]" />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-[#FF6B35] mb-1 tabular-nums leading-none">
                    🔥 {userData.currentStreak} Days
                </div>

                {/* Label */}
                <div className="text-base font-semibold text-white/80 mt-2 mb-1">Current Streak</div>

                {/* Subtitle */}
                <div className="text-sm text-white/40 mb-5">
                    You're on fire! Keep up the consistent learning.
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/[0.06] rounded-full h-1.5 mb-2 overflow-hidden">
                    <div
                        className="bg-[#FF6B35] h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Milestone label */}
                <div className="text-xs text-white/35">
                    {remaining > 0
                        ? <><span className="text-white/55 font-medium">{remaining} days</span> to 30-day milestone</>
                        : <span className="text-[#FF6B35] font-medium">🎉 30-day milestone achieved!</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Streak