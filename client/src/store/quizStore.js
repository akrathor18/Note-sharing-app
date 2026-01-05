import { create } from 'zustand';
import API from '../config/axios';
import { toast } from 'react-toastify';

export const useQuizStore = create((set, get) => ({
    QuizzesList: [],
    userQuizzes: [],
    attemptedQuiz: [],
    errorOnAttempt: false,
    activeQuiz: null,
    isLoading: false,
    error: null,
    isUploading: false,
    deleteQuizId: null,
    errorOnDelete: null,
    uploadingAnswers: false,
    result: null,

    //Get quizzes
    fetchQuizzes: async () => {

        const { QuizzesList } = get();
        console.log(QuizzesList.length)
        if (QuizzesList.length > 0) return;

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
            const response= await API.post('quiz/createQuiz', quizData);
            set((state) => ({
            QuizzesList: [response.data, ...state.QuizzesList],
            isUploading: false,
        }));

            toast.success('Success! Your quiz is ready to use.');
            set({ isUploading: false });
        } catch (error) {
            console.log(error)
            set({ isUploading: false });
            set({ error: error.message || "Failed to upload quiz" });
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
                res: res,
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

    getAttemptedQuiz: async () => {
        try {
            set({ isLoading: true, errorOnAttempt: null });
            const response = await API.get(`/quiz/attempts`);
            set({ attemptedQuiz: response.data.quizAttempts, isLoading: false });
        } catch (error) {
            console.log(error)
            set({ errorOnAttempt: error.data.message || "Failed to load attempt result", isLoading: false });
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
        } catch (error) {
            console.log(error)
            set({ error: error.message || "Failed to load user quizzes", isLoading: false });
        }
    },

    deleteQuiz: async (quizId) => {
        try {
            set({ deleteQuizId: null });
            await API.delete(`/quiz/${quizId}`);
            set((state) => ({
                userQuizzes: state.userQuizzes.filter((quiz) => quiz._id !== quizId),
                deleteQuizId: null,
            }));

            toast.success('Quiz deleted successfully');
        } catch (error) {
            set({ errorOnDelete: error.message || "Failed to delete quiz", deleteQuizId: null });
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