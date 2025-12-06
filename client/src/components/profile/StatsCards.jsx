import React from 'react';
import { FileText, BrainCircuit, CheckCircle2, Clock } from 'lucide-react';

function StatCard({ icon, value, label, iconClass, bgClass }) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
            <div className={`w-10 h-10 mx-auto rounded-full ${bgClass} flex items-center justify-center mb-2`}>
                {icon}
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-[#F5F5F5]/60">{label}</p>
        </div>
    );
}

function StatsCards({ stats }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <StatCard
                icon={<FileText size={18} className="text-[#FF007F]" />}
                // value={stats.totalNoteCreated}
                label="Notes Created"
                bgClass="bg-[#FF007F]/10"
            />
            <StatCard
                icon={<FileText size={18} className="text-[#00E5FF]" />}
                // value={stats.totalNoteVisits}/
                label="Notes Viewed"
                bgClass="bg-[#00E5FF]/10"
            />
            <StatCard
                icon={<BrainCircuit size={18} className="text-[#FF007F]" />}
                // value={stats.quizzesTaken}
                label="Quizzes Taken"
                bgClass="bg-[#FF007F]/10"
            />
            <StatCard
                icon={<CheckCircle2 size={18} className="text-[#00E5FF]" />}
                // value={stats.quizzesPassed}
                label="Quizzes Passed"
                bgClass="bg-[#00E5FF]/10"
            />
            <StatCard
                icon={<Clock size={18} className="text-[#FF007F]" />}
                // value={stats.totalStudyTime + 'h'}
                label="Study Hours"
                bgClass="bg-[#FF007F]/10"
            />
        </div>
    );
}

export default StatsCards; 