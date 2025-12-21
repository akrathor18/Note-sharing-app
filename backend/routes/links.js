import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
const router = express.Router();
import Link from '../models/Links.js';
import User from '../models/UserSchema.js';

router.post('/', VerifyJwtMiddleware, async (req, res) => {
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

        await User.findByIdAndUpdate(req.user.id, {
            $push: { links: newLink._id }
        });

        res.status(201).json({ message: 'Link created', link: newLink });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/me', VerifyJwtMiddleware, async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id });
        res.status(200).json(links);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/bulk', VerifyJwtMiddleware, async (req, res) => {
    const links = req.body;

    if (!Array.isArray(links)) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    // 1. Delete all existing user links
    await Link.deleteMany({ user: req.user.id });

    // 2. Insert new ones
    const newLinks = await Link.insertMany(
        links.map(link => ({
            user: req.user.id,
            label: link.label,
            url: link.url,
        }))
    );

    // 3. Update user.links
    await User.findByIdAndUpdate(req.user.id, {
        links: newLinks.map(l => l._id),
    });

    res.json(newLinks);
});

router.patch('/:id', VerifyJwtMiddleware, async (req, res) => {
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

router.delete('/:id', VerifyJwtMiddleware, async (req, res) => {
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
