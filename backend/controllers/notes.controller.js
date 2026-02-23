import * as NoteService from '../services/notes.service.js';
import mongoose from 'mongoose';

export const uploadNote = async (req, res) => {
    try {
        const { title, description, subject } = req.body;
        const note = await NoteService.uploadNote({
            title,
            description,
            subject,
            file: req.file,
            userId: req.user._id,
        });
        res.status(201).json({ success: true, message: 'Note uploaded successfully', data: { note } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const notes = await NoteService.getAllNotes();
        res.status(200).json({ success: true, message: 'Notes retrieved', data: { notes } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve notes', data: null });
    }
};

export const getMyNotes = async (req, res) => {
    try {
        const notes = await NoteService.getNotesByUser(req.user._id);
        res.status(200).json({ success: true, message: 'Notes retrieved', data: { notes } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve user notes', data: null });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid note ID', data: null });
        }

        const result = await NoteService.deleteNote({ id, userId: req.user._id });

        if (result.notFound) return res.status(404).json({ success: false, message: 'Note not found', data: null });
        if (result.forbidden) return res.status(403).json({ success: false, message: 'Not authorized', data: null });

        res.status(200).json({ success: true, message: 'Note and file deleted successfully', data: { noteId: id } });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ success: false, message: 'Failed to delete note', data: null });
    }
};

export const searchNotes = async (req, res) => {
    const { query } = req.query;

    if (!query || !query.trim()) {
        return res.status(400).json({ success: false, message: 'Search term is required', data: null });
    }

    try {
        const notes = await NoteService.searchNotes(query);
        res.status(200).json({ success: true, message: 'Notes found', data: { notes } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch notes', data: null });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid note ID', data: null });
        }

        const note = await NoteService.getNoteById(id);
        if (!note) return res.status(404).json({ success: false, message: 'Note not found', data: null });

        res.status(200).json({ success: true, message: 'Note retrieved', data: { note } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error', data: null });
    }
};

export const trackView = async (req, res) => {
    try {
        const result = await NoteService.trackView({ noteId: req.params.id, userId: req.user._id });
        if (result.notFound) return res.status(404).json({ success: false, message: 'Note not found', data: null });
        res.status(200).json({ success: true, message: 'View tracked', data: { views: result.views } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update views', data: null });
    }
};

export const trackDownload = async (req, res) => {
    try {
        const result = await NoteService.trackDownload(req.params.id);
        if (result.notFound) return res.status(404).json({ success: false, message: 'Note not found', data: null });
        res.status(200).json({ success: true, message: 'Download tracked', data: { downloads: result.downloads } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to track download', data: null });
    }
};