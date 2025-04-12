import express from 'express';
import upload from '../middleware/upload.js'; // path to multer setup
import Note from '../models/noteModel.js';

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject, uploadedBy } = req.body;
    const note = await Note.create({
      title,
      description,
      subject,
      uploadedBy,
      fileUrl: req.file.path,
      fileType: req.file.originalname.split('.').pop(),
    });

    res.status(201).json({ success: true, note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
