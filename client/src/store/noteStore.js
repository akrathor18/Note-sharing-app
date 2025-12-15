import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';
export const useNoteStore = create((set) => ({
    notes: [],
    userNotes: [],
    isLoading: false,
    error: null,
    isDeleting: false,
    isUploading: false,
    //Get notes
    fetchNotes: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/notes/getnotes');
            set({ notes: response.data, isLoading: false });
        }
        catch (error) {
            set({ error: error.message || "Failed to load notes", isLoading: false });
        }
    },
    //Uploade new notes
    uploadNote: async (noteData, selectedFile, onSuccess, onClose) => {
        try {
            set({ isUploading: true });

            const formData = new FormData();
            if (selectedFile) formData.append('file', selectedFile);
            formData.append('title', noteData.title);
            formData.append('description', noteData.content);
            formData.append('subject', noteData.subject);

            const response = await API.post('/notes/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            set((state) => ({
                notes: [...state.notes, response.data],
                isUploading: false,
            }));

            toast.success('Note uploaded successfully');
            if (onSuccess) onSuccess(); // refresh notes
            if (onClose) onClose();     // close modal
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            set({ isUploading: false });
        }
    },

    fetchUserNotes: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/notes/mynotes');
            set({ userNotes: response.data, isLoading: false });
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
            set({ error: error.message || "Failed to load user notes", isLoading: false });
        }
    },
    
    deleteNote: async (noteId) => {
        set({ isDeleting: true, error: null });
        try {
            await API.delete(`/notes/${noteId}`);
            set((state) => ({
                userNotes: state.userNotes.filter((note) => note.id !== noteId),
                isDeleting: false,
            }));
            toast.success('Note deleted successfully');
        }
        catch (error) {
            console.log(error)
            set({ error: error.message || "Failed to delete note", isLoading: false });
        }   
    },
    
}));