import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';

export const useQuizStore = create((set) => ({

    QuizzesList: [],
    userQuizzes:[],
    isLoading: false,
    error: null,
    isUploading:false,
    isDeleting:false,


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

    getQuizById: async (id) => {
        const existingQuiz = get().quizzes.find((quiz) => quiz.id === id);
        
        // If found locally, return it instantly
        if (existingQuiz) return existingQuiz;
        
        // Otherwise, fetch from API (new or not loaded quiz)
        try {
            set({ isLoading: true, error: null });
            const response = await api.get(`/quiz/${id}`);
            const fetchedQuiz = response.data;

            // Store it for future access
            set((state) => ({
                quizzes: [...state.quizzes, fetchedQuiz],
            }));
            set({ isLoading: false });
            return fetchedQuiz;
        } catch (error) {
            console.error('Failed to fetch quiz by id:', error);
            throw error;
        }
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


}))