import * as LinkService from '../services/links.service.js';
import { logger } from '../utils/logger.js';

export const createLink = async (req, res) => {
    const { label, url } = req.body;

    if (!label || !url) {
        return res.status(400).json({ success: false, message: 'Label and URL are required', data: null });
    }

    try {
        const link = await LinkService.createLink({ userId: req.user._id, label, url });
        logger.info(`Link created for user ${req.user._id}: ${label}`);
        res.status(201).json({ success: true, message: 'Link created', data: { link } });
    } catch (err) {
        logger.error('Error creating link', err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const getMyLinks = async (req, res) => {
    try {
        const links = await LinkService.getLinksByUser(req.user._id);
        res.status(200).json({ success: true, message: 'Links retrieved', data: { links } });
    } catch (err) {
        logger.error('Error retrieving links', err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const bulkUpdateLinks = async (req, res) => {
    const links = req.body;

    if (!Array.isArray(links)) {
        return res.status(400).json({ success: false, message: 'Invalid data', data: null });
    }

    try {
        const newLinks = await LinkService.bulkUpdateLinks({ userId: req.user._id, links });
        logger.info(`Links bulk updated for user ${req.user._id}`);
        res.status(200).json({ success: true, message: 'Links updated', data: { links: newLinks } });
    } catch (err) {
        logger.error('Error bulk updating links', err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const updateLink = async (req, res) => {
    const { label, url } = req.body;

    try {
        const link = await LinkService.updateLink({ id: req.params.id, userId: req.user._id, label, url });

        if (!link) return res.status(404).json({ success: false, message: 'Link not found', data: null });

        logger.info(`Link updated: ${req.params.id}`);
        res.status(200).json({ success: true, message: 'Link updated', data: { link } });
    } catch (err) {
        logger.error('Error updating link', err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const deleteLink = async (req, res) => {
    try {
        const deleted = await LinkService.deleteLink({ id: req.params.id, userId: req.user._id });

        if (!deleted) return res.status(404).json({ success: false, message: 'Link not found', data: null });

        logger.info(`Link deleted: ${req.params.id}`);
        res.status(200).json({ success: true, message: 'Link deleted', data: null });
    } catch (err) {
        logger.error('Error deleting link', err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};
