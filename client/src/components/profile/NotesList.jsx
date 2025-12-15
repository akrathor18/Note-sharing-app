import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useNoteStore } from '../../store/noteStore';
import { formatDate } from '../../utils/formatDate';
import ErrorState from '../../common/components/ErrorState';
function NoteCard({ note }) {
    const { deleteNote, isDeleting } = useNoteStore();

    return (
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-[#FF007F]/10 text-[#FF007F] px-2 py-1 rounded-full">
                    {note.subject}
                </span>
                <span className="text-xs text-[#F5F5F5]/60">{formatDate(note.createdAt)}</span>
            </div>
            <h3 className="font-medium mb-3">{note.title}</h3>
            <div className="flex justify-between gap items-center text-xs text-[#F5F5F5]/60">
                <span>File Type: {note.fileType.toUpperCase()}</span>
                <button
                    onClick={() => deleteNote(note._id)}
                    disabled={isDeleting}
                    className="p-1 flex flex-row rounded-full  hover:bg-[#ff0000]/10 text-[#ff0000]"
                >
                    <Trash2 size={14} />{isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}

function NoteCardSkeleton() {
    return (


        <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5 animate-pulse">

                    {/* Top row */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="h-5 w-20 rounded-full bg-[#2A2A2A]" />
                        <div className="h-3 w-16 rounded bg-[#2A2A2A]" />
                    </div>

                    {/* Title */}
                    <div className="h-4 w-3/4 rounded bg-[#2A2A2A] mb-3" />

                    {/* Bottom row */}
                    <div className="flex items-center justify-between">
                        <div className="h-3 w-24 rounded bg-[#2A2A2A]" />
                        <div className="h-6 w-16 rounded-full bg-[#2A2A2A]" />
                    </div>
                </div>
            ))}
        </div>

    );
}
function NotesList() {
    const { fetchUserNotes, userNotes, isLoading, error } = useNoteStore();
    useEffect(() => {
        fetchUserNotes();
    }, [fetchUserNotes]);

    if (isLoading) return <NoteCardSkeleton />;
    if (error) return <ErrorState title="Unable to load notes"
        message="Something went wrong while fetching notes." />;
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">My Notes</h2>
                <button className="text-[#00E5FF] text-sm hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userNotes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                ))}
            </div>
        </div>
    );
}

export default NotesList; 