import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    attemptedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('QuizAttempt', quizAttemptSchema);
