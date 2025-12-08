import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';
export const useUserStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    averageScore: null,
    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/users/profile');
            set({ user: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message || "Failed to load user", isLoading: false });
        }
    },

    getScore: async () => {
        try {
            const response = await API.get('/users/average-score');
            set({ averageScore: response.data  });
        } catch (error) {
            console.log(error)
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