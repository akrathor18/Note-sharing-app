import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import * as QuizController from '../controllers/quiz.controller.js';

const router = express.Router();

router.post('/', VerifyJwtMiddleware, QuizController.createQuiz);
router.get('/', VerifyJwtMiddleware, QuizController.getAllQuizzes);
router.get('/me', VerifyJwtMiddleware, QuizController.getMyQuizzes);
router.get('/attempts', VerifyJwtMiddleware, QuizController.getMyAttempts);
router.get('/search', QuizController.searchQuizzes);
router.get('/:id', QuizController.getQuizById);
router.delete('/:id', VerifyJwtMiddleware, QuizController.deleteQuiz);
router.post('/:id/attempt', VerifyJwtMiddleware, QuizController.attemptQuiz);
router.patch('/:id', VerifyJwtMiddleware, QuizController.updateQuiz);

export default router;