import express from 'express';
import noteUpload from '../middlewares/noteUpload.js'; // path to multer setup
import Note from '../models/noteSchema.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import User from '../models/UserSchema.js';
import { trackActivityAndStreak } from '../utils/activityTracker.js';
const router = express.Router();

router.post('/upload', verifyJWT, noteUpload.single('file'), async (req, res) => {
  try {
    const { title, description, subject } = req.body;

    const note = await Note.create({
      title,
      description,
      subject,
      uploadedBy: req.user.id,
      fileUrl: req.file.path,
      fileType: req.file.originalname.split('.').pop(),
    });

    // Link note to user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { notesUploaded: note._id }
    });
    const userId = req.user.id;

    await trackActivityAndStreak(userId, { totalQuizCreated: 1 });
    res.status(201).json({ success: true, note });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/getnotes', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find()
      .populate('uploadedBy', 'name email')
      .populate('subject', 'name');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve notes', error: error.message });
  }
});


router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search term is required' });
  }

  const searchQuery = {
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { subject: { $regex: query, $options: 'i' } },
    ],
  };

  try {
    const notes = await Note.find(searchQuery);
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

export default router;
