import * as QuizService from '../services/quiz.service.js';
import mongoose from 'mongoose';

export const createQuiz = async (req, res) => {
    try {
        const quiz = await QuizService.createQuiz({ body: req.body, userId: req.user.id });
        res.status(201).json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await QuizService.getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMyQuizzes = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const quizzes = await QuizService.getMyQuizzes(userId);
        res.status(200).json(quizzes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMyAttempts = async (req, res) => {
    try {
        const attempts = await QuizService.getMyAttempts(req.user.id);
        res.status(200).json({ quizAttempts: attempts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const searchQuizzes = async (req, res) => {
    const { query } = req.query;

    if (!query || !query.trim()) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const quizzes = await QuizService.searchQuizzes(query);
        res.status(200).json(quizzes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
};

export const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const quiz = await QuizService.getQuizById(id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        res.status(200).json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }

        const result = await QuizService.deleteQuiz({ id, userId: req.user._id });

        if (result.notFound) return res.status(404).json({ message: 'Quiz not found' });
        if (result.forbidden) return res.status(403).json({ message: 'Not authorized to delete this quiz' });

        res.status(200).json({ message: 'Quiz deleted successfully', quizId: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete quiz', error: err });
    }
};

export const attemptQuiz = async (req, res) => {
    try {
        const { answers } = req.body;
        const result = await QuizService.attemptQuiz({
            quizId: req.params.id,
            userId: req.user.id,
            answers,
        });

        if (result.notFound) return res.status(404).json({ message: 'Quiz not found' });
        if (result.unanswered) return res.status(400).json({ message: 'Please answer all questions before submitting the quiz' });
        if (result.invalidFormat) return res.status(400).json({ message: 'Invalid answers format' });

        res.status(200).json(result.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateQuiz = async (req, res) => {
    try {
        const result = await QuizService.updateQuiz({
            quizId: req.params.id,
            userId: req.user.id,
            updateData: req.body,
        });

        if (result.notFound) return res.status(404).json({ message: 'Quiz not found' });
        if (result.forbidden) return res.status(403).json({ message: 'Unauthorized: You can only update your own quizzes' });

        res.status(200).json(result.quiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};