import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';

export const useQuizStore = create((set) => ({

    QuizzesList: [],
    isLoading: false,
    error: null,
    //Get quizzes
    fetchQuizzes: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.get('/quizzes/getquizzes');
            set({ quizzes: response.data, isLoading: false });
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
            const response = await api.get(`/quiz/${id}`);
            const fetchedQuiz = response.data;

            // Store it for future access
            set((state) => ({
                quizzes: [...state.quizzes, fetchedQuiz],
            }));

            return fetchedQuiz;
        } catch (error) {
            console.error('Failed to fetch quiz by id:', error);
            throw error;
        }
    },

}))