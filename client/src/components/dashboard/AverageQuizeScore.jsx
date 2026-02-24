import { Trophy, Star } from "lucide-react"

function AverageQuizeScore(user) {
    const userData = user.user;
    const score = userData.averageQuizScore || 0;
    const filledStars = Math.floor(score / 20);

    return (
        <div className="relative bg-[#111111] rounded-2xl p-6 border border-[#9C27B0]/20 overflow-hidden shadow-xl shadow-black/40">

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9C27B0]/10 to-transparent pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#9C27B0]/10 blur-2xl pointer-events-none" />

            <div className="relative text-center">

                {/* Icon */}
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#9C27B0]/15 border border-[#9C27B0]/25 flex items-center justify-center mb-4">
                    <Trophy size={26} className="text-[#9C27B0]" />
                </div>

                {/* Score */}
                <div className="text-4xl font-bold text-[#9C27B0] mb-1 tabular-nums leading-none">
                    🧠 {score}%
                </div>

                {/* Label */}
                <div className="text-base font-semibold text-white/80 mt-2 mb-1">Average Quiz Score</div>

                {/* Attempts */}
                <div className="text-sm text-white/40 mb-5">
                    Across <span className="text-white/60 font-medium">{userData.attemptedQuizzes}</span> attempts
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={17}
                            className={
                                star <= filledStars
                                    ? "text-[#FFD93D] fill-[#FFD93D]"
                                    : "text-white/15"
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AverageQuizeScore    