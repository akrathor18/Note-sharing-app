import express from 'express';
import noteUpload from '../middlewares/noteUpload.js';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import * as NoteController from '../controllers/notes.controller.js';

const router = express.Router();

router.post('/upload', VerifyJwtMiddleware, noteUpload.single('file'), NoteController.uploadNote);
router.get('/getnotes', VerifyJwtMiddleware, NoteController.getAllNotes);
router.get('/mynotes', VerifyJwtMiddleware, NoteController.getMyNotes);
router.get('/search', NoteController.searchNotes);
router.get('/:id', NoteController.getNoteById);
router.delete('/:id', VerifyJwtMiddleware, NoteController.deleteNote);
router.post('/:id/view', VerifyJwtMiddleware, NoteController.trackView);
router.post('/:id/download', VerifyJwtMiddleware, NoteController.trackDownload);

export default router;