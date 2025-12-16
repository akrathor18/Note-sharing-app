import { useState, useEffect } from 'react';
import API from '../config/axios';
import Header from '../common/components/Header.jsx';
import SearchAndFilter from '../common/components/SearchAndFilter';
import SubjectTabs from '../common/components/SubjectTabs';
import NotesGrid from '../components/notes/NotesGrid';
import AddNoteModal from '../components/notes/AddNoteModal';

export default function Notes() {
    // States
    const [notes, setNotes] = useState([]);
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
    const handleSearchChange = (e) => {
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
            <Header onAddClick={handleAddNoteClick} title={"Notes"} description={"Browse and download study materials"}/>

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
