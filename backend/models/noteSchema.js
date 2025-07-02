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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    totalDownloads: {
        type: Number,
        default: 0,
    },
    totalViews: {
        type: Number,
        default: 0,
    },
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
