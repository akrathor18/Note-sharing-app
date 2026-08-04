import { useState, useEffect } from 'react';

import Header from '../common/components/Header.jsx';
import SearchAndFilter from '../common/components/SearchAndFilter';
import SubjectTabs from '../common/components/SubjectTabs';
import NotesGrid from '../components/notes/NotesGrid';
import AddNoteModal from '../components/notes/AddNoteModal';
import Pagination from '../common/components/Pagination';
import Skeleton from '../common/components/Skeleton';
import ErrorState from '../common/components/ErrorState';
import { useNoteStore } from '../store/noteStore';

export default function Notes() {
    const {
        notes, error, isLoading,
        fetchNotes, cancelCreateNote,
        currentPage, totalPages,
    } = useNoteStore();

    // States
    const [activeSubject, setActiveSubject] = useState('All Subjects');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

    // Data fetching
    useEffect(() => {
        fetchNotes(currentPage);
    }, []);

    if (isLoading) return <Skeleton />;
    if (error) return <ErrorState title='Unable to load notes' message={error} />;

    // Handlers
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddNoteClick = () => {
        setIsAddNoteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddNoteModalOpen(false);
        cancelCreateNote()
    };

    const handleNoteAdded = () => {
        fetchNotes(1); // Re-fetch from page 1 after a new note is added
    };

    const handlePageChange = (page) => {
        fetchNotes(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Header route={"Note"} onAddClick={handleAddNoteClick} title={"Notes"} description={"Browse and download study materials"} />

            <SearchAndFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <SubjectTabs activeSubject={activeSubject} onSubjectClick={setActiveSubject} />

            <NotesGrid
                notes={filteredNotes}
                searchTerm={searchTerm}
                onAddNoteClick={handleAddNoteClick}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {isAddNoteModalOpen && (
                <AddNoteModal onClose={handleCloseModal} onNoteAdded={handleNoteAdded} />
            )}
        </div>
    );
}
