import express from 'express';
const router = express.Router();
import Quiz from '../models/quizSchema.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import User from '../models/UserSchema.js';
import QuizAttempt from '../models/QuizAttempt.js';
import { trackActivityAndStreak } from '../utils/activityTracker.js';
import { logActivity } from '../utils/logActivity.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import mongoose from 'mongoose';

router.post('/createQuiz', verifyJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const quizData = {
            ...req.body,
            createdBy: req.user.id
        };

        const newQuiz = new Quiz(quizData);
        const resp = await newQuiz.save();

        await User.findByIdAndUpdate(req.user.id, {
            $push: { quizzes: resp._id }
        });
        await trackActivityAndStreak(userId, { totalQuizCreated: 1 });
        await logActivity(req.user.id, 'quiz_created', resp._id, 'Created a quiz');
        res.status(201).json(resp);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
});

router.get('/getQuiz', async (req, res) => {
    try {
        const quiz = await Quiz.find().populate('createdBy', 'name email'); // optional
        res.status(200).json(quiz);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
});

router.get('/myQuizzes', verifyJWT, async (req, res) => {
    try {
        const userId = req.user.id;

        const quizzes = await Quiz.aggregate([
            {
                $match: { createdBy: new mongoose.Types.ObjectId(userId) }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    createdAt: 1,
                    category: 1,
                    questionCount: { $size: "$questions" }
                }
            }
        ]);

        res.status(200).json(quizzes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Search Quizzes
router.get('/search', async (req, res) => {
    const { search } = req.query;

    const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ],
        }
        : {};

    try {
        const quizzes = await Quiz.find(query);
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

// Delete quiz by ID only by the creator
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid quiz ID" });
        }

        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (quiz.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to delete this quiz",
            });
        }

        await quiz.deleteOne();

        res.status(200).json({
            message: "Quiz deleted successfully",
            quizId: id,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete quiz",
            error: error.message,
        });
    }
});
//Get quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswer');;
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:id/attempt', authMiddleware, verifyJWT, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const { answers } = req.body;
        // `answers` should be an array of user answers matching the order of quiz.questions

        if (!answers || answers.length !== quiz.questions.length) {
            return res.status(400).json({ message: 'Invalid number of answers' });
        }

        let score = 0;
        const results = quiz.questions.map((q, index) => {
            const isCorrect = q.correctAnswer === answers[index];
            if (isCorrect) score++;
            return {
                question: q.text,
                questionId: q._id,
                userAnswer: answers[index],
                correctAnswer: q.correctAnswer,
                isCorrect
            };

        });

        const totalQuestions = quiz.questions.length;
        const percentageScore = (score / totalQuestions) * 100;

        const attempt = new QuizAttempt({
            user: req.user.id,
            quiz: quiz._id,
            score,
            percentageScore,
            answers: results.map(r => ({
                questionId: r.questionId,
                selectedAnswer: r.userAnswer,
                isCorrect: r.isCorrect
            }))
        });
        await attempt.save();
        await User.findByIdAndUpdate(req.user.id, {
            $push: { quizzesTaken: quiz._id }
        });
        // track activity and streak
        await trackActivityAndStreak(req.user.id, {
            totalQuizzesTaken: 1,
            correctAnswers: percentageScore
        });

        await logActivity(req.user.id, 'quiz_attempt', req.params.id, 'Attempted a quiz', {
            score,
            totalQuestions: quiz.questions.length,
            percentageScore,
            refTitle: quiz.title,
            subject: quiz.category
        });

        res.json({
            score,
            total: quiz.questions.length,
            results,
            percentageScore
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch("/:id", authMiddleware, verifyJWT, async (req, res) => {
    try {
        const quizId = req.params.id;
        const userId = req.user.id;
        const updateData = req.body;
        // Find the quiz to make sure it exists and belongs to this user
        const quiz = await Quiz.find
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        if (quiz.createdBy.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own quizzes" });
        }
        // Update the quiz
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updateData, { new: true });
        res.status(200).json(updatedQuiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;