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
    percentageScore:{
        type : Number,
        required: true
    },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            selectedAnswer: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,  
                required: true
            }
        }
    ],
    attemptedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('QuizAttempt', quizAttemptSchema);
