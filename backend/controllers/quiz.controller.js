import * as QuizService from '../services/quiz.service.js';
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const createQuiz = async (req, res) => {
    try {
        const quiz = await QuizService.createQuiz({ body: req.body, userId: req.user._id });
        logger.info(`Quiz created by user ${req.user._id}: ${req.body.title}`);
        res.status(201).json({ success: true, message: 'Quiz created', data: { quiz } });
    } catch (err) {
        logger.error('Error creating quiz', err);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};

export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await QuizService.getAllQuizzes();
        res.status(200).json({ success: true, message: 'Quizzes retrieved', data: { quizzes } });
    } catch (err) {
        logger.error('Error retrieving all quizzes', err);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};

export const getMyQuizzes = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID', data: null });
        }

        const quizzes = await QuizService.getMyQuizzes(userId);
        res.status(200).json({ success: true, message: 'Quizzes retrieved', data: { quizzes } });
    } catch (err) {
        logger.error(`Error retrieving quizzes for user ${req.user._id}`, err);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};

export const getMyAttempts = async (req, res) => {
    try {
        const attempts = await QuizService.getMyAttempts(req.user._id);
        res.status(200).json({ success: true, message: 'Attempts retrieved', data: { quizAttempts: attempts } });
    } catch (err) {
        logger.error(`Error retrieving attempts for user ${req.user._id}`, err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const searchQuizzes = async (req, res) => {
    const { query } = req.query;

    if (!query || !query.trim()) {
        return res.status(400).json({ success: false, message: 'Search term is required', data: null });
    }

    try {
        const quizzes = await QuizService.searchQuizzes(query);
        res.status(200).json({ success: true, message: 'Quizzes found', data: { quizzes } });
    } catch (err) {
        logger.error(`Error searching quizzes with query: ${query}`, err);
        res.status(500).json({ success: false, message: 'Failed to fetch quizzes', data: null });
    }
};

export const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: 'Quiz not found', data: null });
        }

        const quiz = await QuizService.getQuizById(id);
        if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found', data: null });

        res.status(200).json({ success: true, message: 'Quiz retrieved', data: { quiz } });
    } catch (err) {
        logger.error(`Error fetching quiz ${req.params.id}`, err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid quiz ID', data: null });
        }

        const result = await QuizService.deleteQuiz({ id, userId: req.user._id });

        if (result.notFound) return res.status(404).json({ success: false, message: 'Quiz not found', data: null });
        if (result.forbidden)
            return res.status(403).json({ success: false, message: 'Not authorized to delete this quiz', data: null });

        logger.info(`Quiz deleted: ${id}`);
        res.status(200).json({ success: true, message: 'Quiz deleted successfully', data: { quizId: id } });
    } catch (err) {
        logger.error(`Error deleting quiz ${req.params.id}`, err);
        res.status(500).json({ success: false, message: 'Failed to delete quiz', data: null });
    }
};

export const attemptQuiz = async (req, res) => {
    try {
        const { answers } = req.body;
        const result = await QuizService.attemptQuiz({
            quizId: req.params.id,
            userId: req.user._id,
            answers,
        });

        if (result.notFound) return res.status(404).json({ success: false, message: 'Quiz not found', data: null });
        if (result.unanswered)
            return res.status(400).json({ success: false, message: 'Please answer all questions before submitting the quiz', data: null });
        if (result.invalidFormat)
            return res.status(400).json({ success: false, message: 'Invalid answers format', data: null });

        logger.info(`Quiz attempted: ${req.params.id} by user ${req.user._id}`);
        res.status(200).json({ success: true, message: 'Quiz submitted', data: result.data });
    } catch (err) {
        logger.error(`Error attempting quiz ${req.params.id}`, err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const updateQuiz = async (req, res) => {
    try {
        const result = await QuizService.updateQuiz({
            quizId: req.params.id,
            userId: req.user._id,
            updateData: req.body,
        });

        if (result.notFound) return res.status(404).json({ success: false, message: 'Quiz not found', data: null });
        if (result.forbidden)
            return res.status(403).json({ success: false, message: 'Unauthorized: You can only update your own quizzes', data: null });

        logger.info(`Quiz updated: ${req.params.id}`);
        res.status(200).json({ success: true, message: 'Quiz updated', data: { quiz: result.quiz } });
    } catch (err) {
        logger.error(`Error updating quiz ${req.params.id}`, err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

