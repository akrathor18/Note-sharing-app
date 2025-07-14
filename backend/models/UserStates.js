import mongoose from "mongoose";

const userStateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    totalNotes: { type: Number, default: 0 },
    totalQuizCreated: { type: Number, default: 0 },
    totalQuizzesTaken: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
});

userStateSchema.index({ user: 1 }, { unique: true });
const UserState = mongoose.model('UserState', userStateSchema);
export default UserState;