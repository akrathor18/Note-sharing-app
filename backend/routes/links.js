import express from 'express';
import verifyJWT from '../middlewares/verifyJWT.js';
const router = express.Router();
import Link from '../models/Links.js';

router.post('/', verifyJWT, async (req, res) => {
    const { label, url } = req.body;

    if (!label || !url) {
        return res.status(400).json({ message: 'Label and URL are required' });
    }

    try {
        const newLink = await Link.create({
            user: req.user.id,
            label,
            url
        });

        res.status(201).json({ message: 'Link created', link: newLink });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/me', verifyJWT, async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id });
        res.status(200).json(links);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.patch('/:id', verifyJWT, async (req, res) => {
    const { label, url } = req.body;

    try {
        const link = await Link.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { label, url },
            { new: true }
        );

        if (!link) return res.status(404).json({ message: 'Link not found' });

        res.status(200).json({ message: 'Link updated', link });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/:id', verifyJWT, async (req, res) => {
  try {
    const deleted = await Link.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) return res.status(404).json({ message: 'Link not found' });

    res.status(200).json({ message: 'Link deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


export default router;  
