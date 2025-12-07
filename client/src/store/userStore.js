import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';
export const useUserStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    
    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/users/profile');
            set({ user: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message || "Failed to load user", isLoading: false });
        }
    },

    updateBio: async (newBio) => {
        try {
            
            await API.patch('/users/bio', { bio: newBio });
            set((state) => ({ user: {...state.user, bio: newBio } }));      
        } catch (error) {
            set({ error: error.message || "Failed to update bio" });
        }
    },


}));