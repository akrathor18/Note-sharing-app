import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';
export const useNoteStore = create((set, get) => ({
    notes: [],
    userNotes: [],
    isLoading: false,
    error: null,
    deletingNoteId: null,
    isUploading: false,
    errorOnUpload: null,
    errorOnDelete: null,

    //Get notes
    fetchNotes: async () => {
        set({ isLoading: true, error: null, errorOnUpload: null });
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

        get().abortController?.abort();

        const controller = new AbortController();
        set({ abortController: controller, isSaving: true, error: null });

        try {
            set({ isUploading: true });

            const formData = new FormData();
            if (selectedFile) formData.append('file', selectedFile);
            formData.append('title', noteData.title);
            formData.append('description', noteData.content);
            formData.append('subject', noteData.subject);

            const response = await API.post('/notes/upload', formData,
                {
                    signal: controller.signal,
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

            set((state) => ({
                notes: [...state.notes, response.data],
                isUploading: false, abortController: null
            }));

            toast.success('Note uploaded successfully');
            if (onSuccess) onSuccess(); // refresh notes
            if (onClose) onClose();     // close modal
        } catch (error) {
            if (error.name === 'CanceledError') {
                toast.info('Note creation canceled');
                return false;
            }
            console.error(error);
            set({ errorOnUpload: error.response.data.message || "Failed to upload note" });
            toast.error(error.response.data.message);
            set({ isUploading: false });
        }
    },

    cancelCreateNote: () => {
        get().abortController?.abort();
        set({ abortController: null, isUploading: false });
    },

    fetchUserNotes: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/notes/mynotes');
            set({ userNotes: response.data, isLoading: false });
        }
        catch (error) {
            console.log(error)
            set({ error: error.message || "Failed to load user notes", isLoading: false });
        }
    },

    deleteNote: async (noteId) => {
        set({ deletingNoteId: noteId, errorOnDelete: null });
        try {
            await API.delete(`/notes/${noteId}`);
            set((state) => ({
                userNotes: state.userNotes.filter((note) => note.id !== noteId),
                deletingNoteId: null,
            }));
            fetchUserNotes();
            toast.success('Note deleted successfully');
        }
        catch (error) {
            set({ errorOnDelete: error.message || "Failed to delete note", deletingNoteId: null });
            toast.error(
                error?.response?.data?.message || 'Server error. Note could not be deleted.',
            );
        }
    },

}));