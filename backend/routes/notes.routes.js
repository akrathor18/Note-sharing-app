import express from 'express';
import noteUpload from '../middlewares/noteUpload.js';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import * as NoteController from '../controllers/notes.controller.js';
import createRedisRateLimiter from '../middlewares/redisRateLimiter.js';

const router = express.Router();

const searchLimiter = createRedisRateLimiter({
    windowMs: 60 * 1000,
    limit: 30,
    message: 'Too many note searches. Please try again shortly.',
});

router.post('/upload', VerifyJwtMiddleware, noteUpload.single('file'), NoteController.uploadNote);
router.get('/', NoteController.getAllNotes);
router.get('/me', VerifyJwtMiddleware, NoteController.getMyNotes);
router.get('/search', searchLimiter, NoteController.searchNotes);
router.get('/:id', NoteController.getNoteById);
router.delete('/:id', VerifyJwtMiddleware, NoteController.deleteNote);
router.post('/:id/view', VerifyJwtMiddleware, NoteController.trackView);
router.post('/:id/download', VerifyJwtMiddleware, NoteController.trackDownload);

export default router;
