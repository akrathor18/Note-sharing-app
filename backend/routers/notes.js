import express from 'express';
import upload from '../middleware/upload.js'; // path to multer setup
import Note from '../model/noteSchema.js';
import verifyJWT from '../middleware/verifyJWT.js';
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post('/upload', verifyJWT, upload.single('file'), async (req, res) => {
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

    res.status(201).json({ success: true, note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/getnotes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve notes', error: error.message });
  }
})

router.get('/search', async (req, res) => {
  const { search } = req.query;

  const query = search
    ? {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ]
    }
    : {};

  try {
    const notes = await Note.find(query);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});


export default router;
