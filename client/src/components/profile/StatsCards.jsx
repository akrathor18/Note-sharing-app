import React from 'react';
import { FileText, BrainCircuit, CheckCircle2, Flame,
    Upload,
    Trophy, } from 'lucide-react';

function StatCard({ icon, value, label, iconClass, bgClass }) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
            <div className={`w-10 h-10 mx-auto rounded-full ${bgClass} flex items-center justify-center mb-2`}>
                {icon}
            </div>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-xs text-[#F5F5F5]/60">{label}</p>
        </div>
    );
}

function StatsCards({ stats }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
           { console.log(stats)}
            <StatCard
                icon={<FileText size={18} className="text-[#FF007F] " />}
                value={stats.totalNotes}
                label="Notes Created"
                bgClass="bg-[#FF007F]/10"
            />
            <StatCard
                icon={<FileText size={18} className="text-[#00E5FF]" />}
                value={stats.totalQuizCreated}
                label="Quizzes Created"
                bgClass="bg-[#00E5FF]/10"
            />
            <StatCard
                icon={<BrainCircuit size={18} className="text-[#4caf50]" />}
                value={stats.totalQuizzesTaken}
                label="Quizzes attempted"
                bgClass="bg-[#4caf50]/10"
            />
            <StatCard
                icon={<Trophy size={18} className="text-[#9c27b0]" />}
                value={`${stats.averageScore}%`}
                label="Average Score"
                bgClass="bg-[#9c27b0]/10"
            />
            <StatCard
                icon={<Flame size={18} className="text-[#FF6B35]" />}
                value={`${stats.streak}`}
                label="Current Streak"
                bgClass="bg-[#FF6B35]/10"
            />
        </div>
    );
}

export default StatsCards; 