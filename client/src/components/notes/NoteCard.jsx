import { FileText, Download, PenLine, UserPen, Eye, File } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

const FILE_TYPE_COLORS = {
  pdf: { bg: 'from-rose-500/30 to-pink-600/20', badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20' },
  doc: { bg: 'from-blue-500/30 to-blue-600/20', badge: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
  docx: { bg: 'from-blue-500/30 to-blue-600/20', badge: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
  ppt: { bg: 'from-orange-500/30 to-orange-600/20', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/20' },
  pptx: { bg: 'from-orange-500/30 to-orange-600/20', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/20' },
};

export default function NoteCard({ note }) {
  const navigate = useNavigate();
  const fileTypeKey = note.fileType?.toLowerCase();
  const colors = FILE_TYPE_COLORS[fileTypeKey] || { bg: 'from-[#FF007F]/25 to-[#00E5FF]/20', badge: 'bg-[#FF007F]/10 text-[#FF007F] border-[#FF007F]/20' };

  return (
    <div
      className="relative bg-[#161616] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 group flex flex-col"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
    >
      {/* Header Banner */}
      <div className={`relative h-40 bg-gradient-to-br ${colors.bg} flex items-center justify-center shrink-0 overflow-hidden`}>
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`
        }} />
        <FileText
          size={56}
          className="text-white/60 group-hover:text-white/80 transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
        />

        {/* File type badge — top right */}
        {note.fileType && (
          <span className={`absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md border ${colors.badge}`}>
            {note.fileType}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Subject + Date */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-medium bg-[#FF007F]/10 text-[#FF007F] px-2.5 py-1 rounded-full border border-[#FF007F]/15">
            {note.subject}
          </span>
          <span className="text-[11px] text-white/40 flex items-center gap-1">
            <PenLine size={12} />
            {formatDate(note.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base text-white/90 leading-snug line-clamp-2 capitalize">
          {note.title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-white/50 line-clamp-2 leading-relaxed flex-1">
          {note.description}
        </p>

        {/* Uploader */}
        <div className="flex items-center gap-1.5 text-[11px] text-white/35 pt-1 border-t border-white/[0.05]">
          <UserPen size={13} className="shrink-0" />
          <span className="truncate">
            {(note.uploadedBy && note.uploadedBy.name)
              ? `by ${note.uploadedBy.name}`
              : 'Uploader unknown'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-5 flex gap-2">
        <a
          href={note.fileUrl}
          download
          rel="noopener noreferrer"
          className="flex-1"
        >
          <button className="w-full py-3 px-3 rounded-xl bg-[#FF007F]/90 hover:bg-[#FF007F] active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 text-sm font-semibold text-white shadow-lg shadow-[#FF007F]/20">
            <Download size={15} />
            Download
          </button>
        </a>

        <button
          onClick={() => navigate(`/notes/${note._id}/preview`)}
          className="flex-1 py-3 px-3 rounded-xl bg-[#00E5FF]/90 hover:bg-[#00E5FF] active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 text-sm font-semibold text-[#0D0D0D] shadow-lg shadow-[#00E5FF]/15"
        >
          <Eye size={15} />
          Preview
        </button>
      </div>
    </div>
  );
}