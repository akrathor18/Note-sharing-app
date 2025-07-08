import React from 'react';
import { FileText, BrainCircuit } from 'lucide-react';

function ActivityItem({ activity }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0D0D0D]">
            <div
                className={`w-10 h-10 rounded-lg ${activity.type === 'note' ? 'bg-[#FF007F]/10' : 'bg-[#00E5FF]/10'
                    } flex items-center justify-center`}
            >
                {activity.type === 'note' ? (
                    <FileText size={20} className="text-[#FF007F]" />
                ) : (
                    <BrainCircuit size={20} className="text-[#00E5FF]" />
                )}
            </div>
            <div>
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-xs text-[#F5F5F5]/60">
                    {activity.action} {activity.score ? `• Score: ${activity.score}` : ''} • {activity.date}
                </p>
            </div>
        </div>
    );
}

export default ActivityItem; 