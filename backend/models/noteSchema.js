import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String, // Optional description of the note
    subject: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        enum: ['pdf', 'doc', 'docx'],
        required: true,
    },
    filePublicId: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        default: 0, // Default to 0 if not specified
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    viewedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    totalDownloads: {
        type: Number,
        default: 0,
    },
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
