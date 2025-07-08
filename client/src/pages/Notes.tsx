import { useState, useEffect } from 'react';
import API from '../config/axios';
import NotesHeader from '../components/notes/NotesHeader';
import SearchAndFilter from '../components/notes/SearchAndFilter';
import SubjectTabs from '../components/notes/SubjectTabs';
import NotesGrid from '../components/notes/NotesGrid';
import AddNoteModal from '../components/notes/AddNoteModal';

// Define Note type based on backend schema and usage in components
interface Note {
    _id: string;
    title: string;
    description?: string;
    subject: string;
    uploadedBy: string;
    fileUrl: string;
    fileType: string;
    createdAt: string;
    totalDownloads: number;
    totalViews: number;
}

export default function Notes() {
    // States
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeSubject, setActiveSubject] = useState('All Subjects');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

    // Data fetching
    const getNotes = async () => {
        try {
            const response = await API.get('/notes/getnotes');
            setNotes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Effects
    useEffect(() => {
        getNotes();
    }, []);

    // Handlers
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAddNoteClick = () => {
        setIsAddNoteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddNoteModalOpen(false);
    };

    const handleNoteAdded = () => {
        getNotes(); // Re-fetch notes after a new one is added
    };

    // Derived state
    const filteredNotes = notes
        .filter((note) => activeSubject === 'All Subjects' || note.subject === activeSubject)
        .filter(
            (note) =>
                searchTerm === '' ||
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (note.description &&
                    note.description.toLowerCase().includes(searchTerm.toLowerCase())),
        );

    return (
        <div className="space-y-4 md:space-y-6">
            <NotesHeader onAddNoteClick={handleAddNoteClick} />

            <SearchAndFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <SubjectTabs activeSubject={activeSubject} onSubjectClick={setActiveSubject} />

            <NotesGrid
                notes={filteredNotes}
                searchTerm={searchTerm}
                onAddNoteClick={handleAddNoteClick}
            />

            {isAddNoteModalOpen && (
                <AddNoteModal onClose={handleCloseModal} onNoteAdded={handleNoteAdded} />
            )}
        </div>
    );
}
