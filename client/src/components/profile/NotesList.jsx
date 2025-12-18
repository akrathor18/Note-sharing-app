import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useNoteStore } from '../../store/noteStore';
import { formatDate } from '../../utils/formatDate';
import ErrorState from '../../common/components/ErrorState';
import CardSkeleton from '../../common/components/CardSkeleton';
import EmptyState from '../../common/components/EmptyState';
function NoteCard({ note }) {
    const { deleteNote, deletingNoteId } = useNoteStore();

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
                {deletingNoteId === note._id ? (
                    <span className="text-red-400 flex items-center gap-1">
                        <Trash2 size={14} />
                        Deleting...
                    </span>
                ) : (
                    <button
                        onClick={() => deleteNote(note._id)}
                        className="text-red-500 flex flex-row gap-1 hover:text-red-400"
                    >
                        <Trash2 size={14} />Delete 
                    </button>
                )}

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
    if (error) return <ErrorState title="Unable to load notes"
        message="Something went wrong while fetching notes." />;

if (!userNotes || userNotes.length === 0) {
  return <EmptyState type="note" />;
}

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