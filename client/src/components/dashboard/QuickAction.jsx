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
        link: "/createquiz",
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
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F5F5F5]/5">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap size={20} className="text-[#FFD93D]" />
                Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        className="p-4 rounded-lg bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/20 transition-all group text-center"
                    >
                        <Link to={action.link}>
                        <div
                            className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: `${action.color}20` }}
                            >
                            <action.icon size={24} style={{ color: action.color }} />
                        </div>
                        <div className="font-medium text-sm mb-1">{action.title}</div>
                        <div className="text-xs text-[#F5F5F5]/60">{action.description}</div>
                            </Link>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuickAction
