import * as LinkService from '../services/links.service.js';

export const createLink = async (req, res) => {
    const { label, url } = req.body;

    if (!label || !url) {
        return res.status(400).json({ message: 'Label and URL are required' });
    }

    try {
        const link = await LinkService.createLink({ userId: req.user.id, label, url });
        res.status(201).json({ message: 'Link created', link });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getMyLinks = async (req, res) => {
    try {
        const links = await LinkService.getLinksByUser(req.user.id);
        res.status(200).json(links);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const bulkUpdateLinks = async (req, res) => {
    const links = req.body;

    if (!Array.isArray(links)) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        const newLinks = await LinkService.bulkUpdateLinks({ userId: req.user.id, links });
        res.status(200).json(newLinks);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const updateLink = async (req, res) => {
    const { label, url } = req.body;

    try {
        const link = await LinkService.updateLink({ id: req.params.id, userId: req.user.id, label, url });

        if (!link) return res.status(404).json({ message: 'Link not found' });

        res.status(200).json({ message: 'Link updated', link });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const deleteLink = async (req, res) => {
    try {
        const deleted = await LinkService.deleteLink({ id: req.params.id, userId: req.user.id });

        if (!deleted) return res.status(404).json({ message: 'Link not found' });

        res.status(200).json({ message: 'Link deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};