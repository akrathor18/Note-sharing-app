import { FileText, Download, PenLine, UserPen, Eye } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
export default function NoteCard({ note }) {
    const navigate = useNavigate()
    return (
        <div
            key={note._id}
            className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/20 transition-all duration-300 group"
        >
            <div className="h-32 bg-gradient-to-r from-[#FF007F]/20 to-[#00E5FF]/20 flex items-center justify-center">
                <FileText size={48} className="text-[#F5F5F5]/80" />
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <span className="text-xs bg-[#FF007F]/10 text-[#FF007F] px-2 py-1 rounded-full">
                        {note.subject}
                    </span>
                    <span className="text-xs text-[#F5F5F5]/60 flex flex-row items-center gap-1">
                        <PenLine size={14} />
                        {formatDate(note.createdAt)
                        }</span>
                </div>
                <h3 className="font-medium mb-2 line-clamp-2 capitalize">{note.title}</h3>
                <p className="text-xs text-[#F5F5F5]/70 mb-3 line-clamp-2">{note.description}</p>
                <div className="flex items-center justify-between ">
                    <span className="text-xs text-[#F5F5F5]/60 flex flex-row gap-2">
                        <UserPen size={16} />
                        {(note.uploadedBy && note.uploadedBy.name) ? `Uploaded by ${note.uploadedBy.name}` : 'Uploader info not available'}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                        <Download size={14} />
                        {note.fileType}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-around mb-2   w-full py-2 ">

                <div>
                    <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                        <button className="w-full mt-3 p-2 rounded-lg bg-[#FF007F] hover:bg-[#FF007F]/80 transition-colors flex items-center justify-center gap-2 font-medium">
                            <Download size={16} />
                            Download
                        </button>
                    </a>
                </div>
                <div>
                    <button
                        onClick={() => navigate(`/notes/${note._id}/preview`)}
                        className="w-full mt-3 p-2 rounded-lg bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0D0D0D] transition-colors flex items-center justify-center gap-2 font-medium">
                        <Eye size={16} />
                        Preview
                    </button>
                </div>
            </div>
        </div>
    );
}
