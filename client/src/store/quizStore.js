import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';
import ActivityItem from '../components/profile/ActivityItem';

export const useQuizStore = create((set) => ({

    QuizzesList: [],
    userQuizzes: [],
    activeQuiz: null,
    isLoading: false,
    error: null,
    isUploading: false,
    isDeleting: false,
    uploadingAnswers: false,
    result: null,

    //Get quizzes
    fetchQuizzes: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('quiz/getquiz');
            set({ QuizzesList: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message || "Failed to load quizzes", isLoading: false });
        }
    },

    UploadQuiz: async (quizData) => {
        try {
            set({ isUploading: true });
            console.log(quizData);
            await API.post('quiz/createQuiz', quizData);
            toast.success('Success! Your quiz is ready to use.');
            set({ isUploading: false });
            navigate('/quizzes');
        } catch (error) {
            set({ error: error.message || "Failed to upload quiz" });
            toast.error(
                error?.response?.data?.message || 'Server error. Quiz could not be created.',
            );
        }
    },

    getQuizById: async (quizId) => {
        try {
            set({
                isLoading: true,
                error: null,
                result: null, 
            });

            const res = await API.get(`/quiz/${quizId}`);
            console.log(res)
            set({
                res:res,
                activeQuiz: res.data,
                isLoading: false,
            });
        } catch (err) {
            set({
                error: err?.response?.data?.message || 'Failed to load quiz',
                isLoading: false,
            });
        }
    },



    resetQuizState: () => {
        set({
            activeQuiz: null,
            result: null,
            error: null,
            uploadingAnswers: false,
        });
    },



    ftechUserQuizzes: async (userId) => {
        try {
            set({ isLoading: true, error: null });
            const response = await API.get('/quiz/myQuizzes');
            set({ userQuizzes: response.data, isLoading: false });
            console.log(response.data)
        } catch (error) {
            console.log(error)
            set({ error: error.message || "Failed to load user quizzes", isLoading: false });
        }
    },

    deleteQuiz: async (quizId) => {
        try {
            set({ isDeleting: true });
            await API.delete(`/quiz/deleteQuiz/${quizId}`);
            set((state) => ({
                userQuizzes: state.userQuizzes.filter((quiz) => quiz._id !== quizId),
                isDeleting: false,
            }));
            toast.success('Quiz deleted successfully');
        } catch (error) {
            set({ error: error.message || "Failed to delete quiz", isDeleting: false });

            toast.error(
                error?.response?.data?.message || 'Server error. Quiz could not be deleted.',
            );
        }
    },

    attmptQuiz: async ({ quizId, answers }) => {
        try {
            set({ uploadingAnswers: true, error: null });

            const response = await API.post(
                `/quiz/${quizId}/attempt`,
                { answers }
            );

            set({
                result: response.data,
                uploadingAnswers: false
            });

        } catch (error) {
            set({
                error: error?.response?.data?.message || "Failed to attempt quiz",
                uploadingAnswers: false
            });
        }
    },


}))