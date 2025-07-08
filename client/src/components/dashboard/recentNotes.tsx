import { ChevronRight, Download, FileText } from 'lucide-react';

export default function RecentNotes({ notes }) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Recent Notes</h2>
                <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
                    View All <ChevronRight size={16} />
                </button>
            </div>

            <div className="space-y-3">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 transition-colors"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-[#FF007F]/10 flex items-center justify-center flex-shrink-0">
                                <FileText size={20} className="text-[#FF007F]" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-medium truncate">{note.title}</h3>
                                <p className="text-xs text-[#F5F5F5]/60 truncate">
                                    {note.subject} • {note.date}
                                </p>
                            </div>
                        </div>
                        <button className="p-2 rounded-full hover:bg-[#1A1A1A] transition-colors flex-shrink-0">
                            <Download size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
