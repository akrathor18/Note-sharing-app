import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as QuizController from '../controllers/quiz.controller.js';

const router = express.Router();

router.post('/createQuiz', VerifyJwtMiddleware, QuizController.createQuiz);
router.get('/getQuiz', VerifyJwtMiddleware, authMiddleware, QuizController.getAllQuizzes);
router.get('/myQuizzes', VerifyJwtMiddleware, QuizController.getMyQuizzes);
router.get('/attempts', VerifyJwtMiddleware, authMiddleware, QuizController.getMyAttempts);
router.get('/search', QuizController.searchQuizzes);
router.get('/:id', QuizController.getQuizById);
router.delete('/:id', VerifyJwtMiddleware, QuizController.deleteQuiz);
router.post('/:id/attempt', VerifyJwtMiddleware, authMiddleware, QuizController.attemptQuiz);
router.patch('/:id', VerifyJwtMiddleware, authMiddleware, QuizController.updateQuiz);

export default router;