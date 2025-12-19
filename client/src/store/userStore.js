import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';

export const useUserStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    averageScore: null,
    isUploading: false,
    isDeleting: false,
    errorOnDelete: null,
    errorOnUpload: null,
    uploadProgress: 0,

    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/users/profile');
            set({ user: response.data, isLoading: false });
            console.log(response.data)
        } catch (error) {
            set({ error: error.message || "Failed to load user", isLoading: false });
        }
    },

    getScore: async () => {
        try {
            const response = await API.get('/users/average-score');
            set({ averageScore: response.data });
        } catch (error) {
            console.log(error)
        }
    },

    updateBio: async (newBio) => {
        try {

            await API.patch('/users/bio', { bio: newBio });
            set((state) => ({ user: { ...state.user, bio: newBio } }));
        } catch (error) {
            set({ error: error.message || "Failed to update bio" });
        }
    },

    updateProfilePic: async (imageFile) => {
        try {
            set({ isUploading: true, uploadProgress: 0 });

            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await API.put(
                "/users/upload-profile-pic",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        if (!progressEvent.total) {
                            set({ uploadProgress: 90 });
                            return;
                        }

                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );

                        set({ uploadProgress: Math.min(percent, 95) });
                    },
                }
            );
            set((state) => ({
                user: {
                    ...state.user,
                    profilePic: `${response.data.profilePic}}`
                }
            }));

            set({ uploadProgress: 100 });

            setTimeout(() => {
                set({ isUploading: false, uploadProgress: 0 });
            }, 400);

            toast.success("Profile picture updated successfully");
            return true;
        } catch (error) {
            console.log(error)
            set({
                isUploading: false,
                uploadProgress: 0,
                errorOnUpload: "Failed to upload image",
            });
            return false;
        }
    },


    deleteProfilePic: async () => {
        try {
            set({ isDeleting: true });

            await API.delete("/users/delete-profile-pic");
            set((state) => ({
                user: {
                    ...state.user,
                    profilePic: null
                }
            }));

            set({ isDeleting: false });
            toast.success("Profile picture deleted successfully");
            return true;
        } catch (error) {
            console.log(error)
            set({ isDeleting: false });
            toast.error("Failed to delete profile picture");
            return false;
        }
    },


}));