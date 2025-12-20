import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';

export const useUserStore = create((set) => ({
    user: null,
    userStates: null,
    bio: '',
    isLoading: false,
    error: null,
    averageScore: null,
    isUploading: false,
    isDeleting: false,
    errorOnDelete: null,
    errorOnUpload: null,
    uploadProgress: 0,//link upload progress profile 
    isUpdating: false,//link update in progress
    errorOnUpdate: null,//link update error
    isUpdatingBio: false,

    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/users/profile');
            set({
                user: response.data.user,
                userStates: response.data.userState,
                bio: response.data.user.bio,
                isLoading: false
            });
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


    updateBio: async (bio) => {
        set({ isUpdatingBio: true });
        const promise = API.patch('/users/bio', { bio });

        toast.promise(promise, {
            pending: 'Saving bio...',
            success: 'Bio updated successfully!',
            error: {
                render({ data }) {
                    return (
                        data?.response?.data?.message ||
                        'Failed to save bio'
                    );
                },
            },
        });
        try {
            const response = await promise;
            set({bio: response.data.bio})
            set({ isUpdatingBio: false });
            return true;
        } catch (error) {
            set({ isUpdatingBio: false });
            console.log(error);
            set({ error: error.message || "Failed to update bio" });
            return false;
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

    updateLinks: async (links) => {
        set({ isUpdating: true, errorOnUpdate: null });

        const promise = API.put('/liks/bulk', links);

        toast.promise(promise, {
            pending: 'Saving links...',
            success: 'Links updated successfully!',
            error: {
                render({ data }) {
                    return (
                        data?.response?.data?.message ||
                        'Failed to save links'
                    );
                },
            },
        });

        try {
            const response = await promise;

            set((state) => ({
                user: {
                    ...state.user,
                    links: response.data,
                },
            }));

            set({ isUpdating: false });
            return true;
        } catch (error) {
            console.error(error);
            set({
                isUpdating: false,
                errorOnUpdate: 'Failed to update links',
            });
            return false;
        }
    },

}));