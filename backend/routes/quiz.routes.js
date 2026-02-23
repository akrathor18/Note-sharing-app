import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import * as QuizController from '../controllers/quiz.controller.js';

const router = express.Router();

router.post('/createQuiz', VerifyJwtMiddleware, QuizController.createQuiz);
router.get('/getQuiz', VerifyJwtMiddleware, QuizController.getAllQuizzes);
router.get('/myQuizzes', VerifyJwtMiddleware, QuizController.getMyQuizzes);
router.get('/attempts', VerifyJwtMiddleware, QuizController.getMyAttempts);
router.get('/search', QuizController.searchQuizzes);
router.get('/:id', QuizController.getQuizById);
router.delete('/:id', VerifyJwtMiddleware, QuizController.deleteQuiz);
router.post('/:id/attempt', VerifyJwtMiddleware, QuizController.attemptQuiz);
router.patch('/:id', VerifyJwtMiddleware, QuizController.updateQuiz);

export default router;