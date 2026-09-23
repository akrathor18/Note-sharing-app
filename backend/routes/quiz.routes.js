import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import * as QuizController from '../controllers/quiz.controller.js';
import createRedisRateLimiter from '../middlewares/redisRateLimiter.js';

const router = express.Router();

const searchLimiter = createRedisRateLimiter({
    windowMs: 60 * 1000,
    limit: 30,
    message: 'Too many quiz searches. Please try again shortly.',
});

router.post('/', VerifyJwtMiddleware, QuizController.createQuiz);
router.get('/', VerifyJwtMiddleware, QuizController.getAllQuizzes);
router.get('/me', VerifyJwtMiddleware, QuizController.getMyQuizzes);
router.get('/attempts', VerifyJwtMiddleware, QuizController.getMyAttempts);
router.get('/search', searchLimiter, QuizController.searchQuizzes);
router.get('/:id', QuizController.getQuizById);
router.delete('/:id', VerifyJwtMiddleware, QuizController.deleteQuiz);
router.post('/:id/attempt', VerifyJwtMiddleware, QuizController.attemptQuiz);
router.patch('/:id', VerifyJwtMiddleware, QuizController.updateQuiz);

export default router;
