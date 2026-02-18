import express from 'express';
import noteUpload from '../middlewares/noteUpload.js';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as NoteController from '../controllers/notes.controller.js';

const router = express.Router();

router.post('/upload', VerifyJwtMiddleware, authMiddleware, noteUpload.single('file'), NoteController.uploadNote);
router.get('/getnotes', VerifyJwtMiddleware, authMiddleware, NoteController.getAllNotes);
router.get('/mynotes', VerifyJwtMiddleware, authMiddleware, NoteController.getMyNotes);
router.get('/search', NoteController.searchNotes);
router.get('/:id', NoteController.getNoteById);
router.delete('/:id', VerifyJwtMiddleware, authMiddleware, NoteController.deleteNote);
router.post('/:id/view', VerifyJwtMiddleware, NoteController.trackView);
router.post('/:id/download', VerifyJwtMiddleware, NoteController.trackDownload);

export default router;