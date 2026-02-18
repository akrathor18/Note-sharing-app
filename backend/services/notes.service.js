import Note from '../models/noteSchema.js';
import User from '../models/UserSchema.js';
import cloudinary from '../config/cloudinary.js';
import { trackActivityAndStreak } from '../utils/activityTracker.js';
import { logActivity } from '../utils/logActivity.js';

export const uploadNote = async ({ title, description, subject, file, userId }) => {
    const note = await Note.create({
        title,
        description,
        subject,
        filePublicId: file.filename,
        mimetype: file.mimetype,
        uploadedBy: userId,
        fileUrl: file.path,
        fileType: file.originalname.split('.').pop(),
    });

    await User.findByIdAndUpdate(userId, { $push: { notes: note._id } });
    await trackActivityAndStreak(userId, { totalNotes: 1 });
    await logActivity(userId, 'note_upload', note._id, 'Uploaded a note', {
        refTitle: note.title,
        subject: note.subject,
    });

    return note;
};

export const getAllNotes = async () => {
    return await Note.find()
        .populate('uploadedBy', 'name email')
        .populate('subject', 'name')
        .sort({ createdAt: -1 });
};

export const getNotesByUser = async (userId) => {
    return await Note.find({ uploadedBy: userId })
        .populate('uploadedBy', 'name')
        .populate('subject', 'name');
};

export const deleteNote = async ({ id, userId }) => {
    const note = await Note.findById(id);

    if (!note) return { notFound: true };
    if (note.uploadedBy.toString() !== userId.toString()) return { forbidden: true };

    if (note.filePublicId) {
        await cloudinary.uploader.destroy(note.filePublicId, { resource_type: 'raw' });
    }

    await note.deleteOne();
    await User.findByIdAndUpdate(userId, { $pull: { notes: id } });

    return { success: true };
};

export const searchNotes = async (query) => {
    return await Note.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { subject: { $regex: query, $options: 'i' } },
        ],
    })
        .populate('uploadedBy', 'name')
        .limit(20);
};

export const getNoteById = async (id) => {
    return await Note.findById(id).select('-description -uploadedBy -__v');
};

export const trackView = async ({ noteId, userId }) => {
    const note = await Note.findById(noteId);
    if (!note) return { notFound: true };

    if (!note.viewedBy.includes(userId)) {
        note.views += 1;
        note.viewedBy.push(userId);
        await note.save();
    }

    return { views: note.views };
};

export const trackDownload = async (noteId) => {
    const note = await Note.findById(noteId);
    if (!note) return { notFound: true };

    note.totalDownloads += 1;
    await note.save();

    return { downloads: note.totalDownloads };
};