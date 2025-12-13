import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    timeLimit: { type: Number, default: 10 },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium',
    },
    questions: [
        {
            text: { type: String, required: true },
            options: [
                {
                    id: { type: String, required: true }, // "a", "b", "c", "d"
                    text: { type: String, required: true },
                },
            ],
            correctAnswer: { type: String, required: true }, // e.g., "a"
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Quiz', quizSchema);