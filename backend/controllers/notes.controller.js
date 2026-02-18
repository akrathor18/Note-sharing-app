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
            userId: req.user.id,
        });
        res.status(201).json({ success: true, note });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const notes = await NoteService.getAllNotes();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve notes', error: err.message });
    }
};

export const getMyNotes = async (req, res) => {
    try {
        const notes = await NoteService.getNotesByUser(req.user.id);
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve user notes', error: err.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const result = await NoteService.deleteNote({ id, userId: req.user.id });

        if (result.notFound) return res.status(404).json({ message: 'Note not found' });
        if (result.forbidden) return res.status(403).json({ message: 'Not authorized' });

        res.status(200).json({ message: 'Note and file deleted successfully', noteId: id });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Failed to delete note', error: err.message });
    }
};

export const searchNotes = async (req, res) => {
    const { query } = req.query;

    if (!query || !query.trim()) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const notes = await NoteService.searchNotes(query);
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const note = await NoteService.getNoteById(id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        res.status(200).json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const trackView = async (req, res) => {
    try {
        const result = await NoteService.trackView({ noteId: req.params.id, userId: req.user.id });
        if (result.notFound) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ views: result.views });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update views' });
    }
};

export const trackDownload = async (req, res) => {
    try {
        const result = await NoteService.trackDownload(req.params.id);
        if (result.notFound) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ downloads: result.downloads });
    } catch (err) {
        res.status(500).json({ message: 'Failed to track download' });
    }
};