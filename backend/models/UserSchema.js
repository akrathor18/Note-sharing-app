import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' }, // User's bio section
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    quizzesTaken: [
        {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
            score: { type: Number },
            timeSpent: { type: Number }, // Time spent on this quiz in minutes
        },
    ],
    stats: {
        totalNoteVisits: { type: Number, default: 0 }, // Tracks how many notes they visited
        totalStudyTime: { type: Number, default: 0 }, // Total time spent studying in minutes
        totalNoteCreated: { type: Number, default: 0 },
        quizzesPassed: { type: Number, default: 0 },
        quizzesTaken: { type: Number, default: 0 },
    },
    recentActivity: [
        {
            type: { type: String, enum: ['note_view', 'quiz_attempt', 'achievement'] },
            description: { type: String },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    achievements: [
        {
            title: { type: String },
            description: { type: String },
            dateEarned: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
