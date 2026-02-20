import { useEffect, useState } from 'react';
import { Trash2, Eye, Download, ArrowUpRight, Globe, Lock, MoreVertical, X } from 'lucide-react';
import { useNoteStore } from '../../store/noteStore';
import { formatDate } from '../../utils/formatDate';
import ErrorState from '../../common/components/ErrorState';
import CardSkeleton from '../../common/components/CardSkeleton';
import EmptyState from '../../common/components/EmptyState';

//── Dynamic accent colours per file type
const FT_ACCENT = {
    pdf: { color: '#FF2D6B', bg: 'rgba(255,45,107,0.1)', border: 'rgba(255,45,107,0.25)' },
    doc: { color: '#00D4FF', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.25)' },
    docx: { color: '#00D4FF', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.25)' },
    ppt: { color: '#FF8C00', bg: 'rgba(255,140,0,0.1)', border: 'rgba(255,140,0,0.25)' },
    pptx: { color: '#FF8C00', bg: 'rgba(255,140,0,0.1)', border: 'rgba(255,140,0,0.25)' },
};
const FT_DEFAULT = { color: '#888888', bg: 'rgba(136,136,136,0.1)', border: 'rgba(136,136,136,0.2)' };

function NoteCard({ note, index }) {
    const { deleteNote, deletingNoteId } = useNoteStore();
    const [confirm, setConfirm] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDeleting = deletingNoteId === note._id;
    const ft = FT_ACCENT[note.fileType?.toLowerCase()] ?? FT_DEFAULT;
    const initials = (note.uploadedBy?.name ?? '?').slice(0, 2).toUpperCase();

    useEffect(() => {
        if (!menuOpen) setConfirm(false);
    }, [menuOpen]);

    const handleDelete = () => {
        if (confirm) {
            deleteNote(note._id);
            setConfirm(false);
            setMenuOpen(false);
        } else {
            setConfirm(true);
        }
    };

    return (
        <div
            className="group relative rounded-2xl bg-[#0f0f0f] border border-white/[0.07] overflow-hidden
                 transition-all duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 65}ms` }}
        >
            {/* Dynamic hover glow — needs ft.color so must be inline */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `0 0 0 1px ${ft.color}40, 0 20px 50px rgba(0,0,0,0.5)` }}
            />

            {/* ── Top strip ── */}
            <div
                className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/[0.06]"
                style={{ background: `linear-gradient(90deg, ${ft.color}15 0%, transparent 65%)` }}
            >
                {/* Subject dot + label */}
                <div className="flex items-center gap-2">
                    <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: ft.color, boxShadow: `0 0 6px ${ft.color}` }}
                    />
                    <span
                        className="text-[10px] font-semibold tracking-widest uppercase"
                        style={{ color: ft.color }}
                    >
                        {note.subject}
                    </span>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="relative z-10 p-4 flex flex-col gap-4">

                {/* Title + description */}
                <div>
                    <h3 className="text-[15px] font-bold text-[#f0f0f0] leading-snug tracking-tight">
                        {note.title}
                    </h3>
                    {note.description && (
                        <p className="mt-1.5 text-[13px] text-white/40 leading-relaxed line-clamp-2">
                            {note.description}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.05]" />

                {/* Footer: author + stats */}
                <div className="flex items-center justify-between gap-2">
                    {/* Author */}
                    <div className="flex items-center gap-2 min-w-0">
                        <div
                            className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-extrabold"
                            style={{
                                background: `linear-gradient(135deg, ${ft.color}40, ${ft.color}18)`,
                                border: `1px solid ${ft.color}35`,
                                color: ft.color,
                            }}
                        >
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-white/70 truncate leading-none">
                                {note.uploadedBy?.name ?? 'Unknown'}
                            </p>
                            <p className="text-[10px] text-white/30 mt-0.5 leading-none">
                                {formatDate(note.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* Stats + visibility */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <span className="flex items-center gap-1 text-[11px] text-white/30">
                            <Eye size={11} /> {note.views ?? 0}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-white/30">
                            <Download size={11} /> {note.totalDownloads ?? 0}
                        </span>
                        <span
                            className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border
                ${note.visibility === 'public'
                                    ? 'text-green-400 bg-green-400/[0.07] border-green-400/20'
                                    : 'text-white/30 bg-white/[0.04] border-white/[0.07]'
                                }`}
                        >
                            {note.visibility === 'public' ? <Globe size={9} /> : <Lock size={9} />}
                            {note.visibility}
                        </span>
                    </div>
                </div>

                {/* ── Action bar ── */}
                <div className="flex items-center gap-2 pt-0.5">
                    {/* Open file */}
                    <a
                        href={note.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold
                       rounded-[9px] py-2.5 transition-all duration-200 no-underline"
                        style={{
                            color: ft.color,
                            background: ft.bg,
                            border: `1px solid ${ft.border}`,
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = ft.color + '22';
                            e.currentTarget.style.borderColor = ft.color + '60';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = ft.bg;
                            e.currentTarget.style.borderColor = ft.border;
                        }}
                    >
                        <ArrowUpRight size={13} /> Open file
                    </a>

                    {/* Delete button */}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-[9px]
                        border transition-all duration-200
                        ${isDeleting
                                ? 'text-red-500/35 border-red-500/10 cursor-not-allowed animate-pulse'
                                : confirm
                                    ? 'text-white bg-red-500 border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.28)]'
                                    : 'text-red-500/55 border-red-500/20 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/40'
                            }`}
                    >
                        <Trash2 size={13} />
                        {isDeleting ? 'Deleting…' : confirm ? 'Sure?' : 'Delete'}
                    </button>

                    {/* Cancel */}
                    {confirm && !isDeleting && (
                        <button
                            onClick={() => setConfirm(false)}
                            className="text-[11px] font-semibold text-white/30 border border-white/[0.08] rounded-[9px]
                        px-3 py-2.5 transition-all duration-150 hover:text-white/70 hover:border-white/20"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function NotesList() {
    const { fetchUserNotes, userNotes, isLoading, error } = useNoteStore();

    useEffect(() => {
        fetchUserNotes();
    }, [fetchUserNotes]);

    if (isLoading) return <CardSkeleton />;
    if (error) return (
        <ErrorState
            title="Unable to load notes"
            message="Something went wrong while fetching notes."
        />
    );
    if (!userNotes || userNotes.length === 0) return <EmptyState type="note" />;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-[#F5F5F5]">My Notes</h2>
                    <p className="text-xs text-[#F5F5F5]/30 mt-0.5">
                        {userNotes.length} note{userNotes.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <button className="text-[13px] font-semibold text-[#00D4FF]/70 hover:text-[#00D4FF] transition-colors hover:underline underline-offset-2">
                    View All
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userNotes.map((note, i) => (
                    <NoteCard key={note._id} note={note} index={i} />
                ))}
            </div>
        </div>
    );
}

export default NotesList;