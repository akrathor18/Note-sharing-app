import React from 'react'
import {
    Plus,
    Upload,
    Eye,
    Play,
    Zap,
} from "lucide-react"
import { Link } from 'react-router-dom'


const quickActions = [
    {
        title: "Create Quiz",
        description: "Share your knowledge",
        icon: Plus,
        color: "#FF007F",
        action: "create-note",
        link: "/quizzes/createquiz",
    },
    {
        title: "Take Quiz",
        description: "Test your skills",
        icon: Play,
        color: "#00E5FF",
        action: "take-quiz",
        link: "/quizzes",
    },
    {
        title: "Browse Notes",
        description: "Find study materials",
        icon: Eye,
        color: "#4CAF50",
        action: "browse-notes",
        link: "/notes",
    },
    {
        title: "Upload Notes",
        description: "Share resources",
        icon: Upload,
        color: "#FFD93D",
        action: "upload",
        link: "/notes",
    },
]

function QuickAction() {
    return (
        <div className="bg-[#111111] rounded-2xl p-6 border border-white/[0.06] shadow-xl shadow-black/40">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#FFD93D]/10 flex items-center justify-center shrink-0">
                    <Zap size={17} className="text-[#FFD93D]" />
                </div>
                <h2 className="text-base font-semibold tracking-tight text-white/90">Quick Actions</h2>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action, index) => (
                    <Link
                        to={action.link}
                        key={index}
                        className="group relative flex flex-col items-center text-center p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.04] hover:border-white/[0.10] transition-all duration-200 overflow-hidden"
                    >
                        {/* Subtle color glow on hover */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                            style={{ background: `radial-gradient(ellipse at 50% 0%, ${action.color}0D 0%, transparent 70%)` }}
                        />

                        {/* Icon */}
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110"
                            style={{
                                backgroundColor: `${action.color}15`,
                                boxShadow: `0 0 0 1px ${action.color}22`,
                            }}
                        >
                            <action.icon size={20} style={{ color: action.color }} />
                        </div>

                        {/* Text */}
                        <div className="font-semibold text-sm text-white/80 group-hover:text-white/95 transition-colors duration-150 mb-0.5 leading-snug">
                            {action.title}
                        </div>
                        <div className="text-[11px] text-white/35 leading-snug">
                            {action.description}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default QuickAction