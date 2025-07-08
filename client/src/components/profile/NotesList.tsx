import React from 'react';

function NoteCard({ note }) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-[#FF007F]/10 text-[#FF007F] px-2 py-1 rounded-full">
                    {note.subject}
                </span>
                <span className="text-xs text-[#F5F5F5]/60">{note.date}</span>
            </div>
            <h3 className="font-medium mb-3">{note.title}</h3>
            <div className="flex items-center text-xs text-[#F5F5F5]/60">
                <span>{note.downloads} downloads</span>
            </div>
        </div>
    );
}

function NotesList({ userNotes }) {
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