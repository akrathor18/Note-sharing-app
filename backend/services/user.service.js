import bcrypt from 'bcryptjs';
import User from '../models/UserSchema.js';
import QuizAttempt from '../models/QuizAttempt.js';
import cloudinary from '../config/cloudinary.js';
import { trackActivityAndStreak } from '../utils/activityTracker.js';

export const changePassword = async ({ userId, password, newPassword }) => {
    const user = await User.findById(userId);
    if (!user) return { notFound: true };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { incorrectPassword: true };

    user.password = newPassword;
    await user.save();

    return { success: true };
};

export const getProfile = async (userId) => {
    const userState = await trackActivityAndStreak(userId);

    const user = await User.findById(userId)
        .populate('role')
        .populate('links')
        .select('-password -userstate -__v')
        .lean();

    if (!user) return { notFound: true };

    const recentActivity = (user.recentActivity || [])
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10)
        .map((activity) => ({
            type: activity.type,
            refId: activity.refId,
            title: activity.refTitle || 'Untitled',
            description: activity.description,
            score: activity.score ?? null,
            percentageScore: activity.percentageScore ?? null,
            totalQuestions: activity.totalQuestions ?? null,
            timestamp: activity.timestamp,
            subject: activity.subject || 'General',
        }));

    user.recentActivity = recentActivity;

    return { userState, user };
};

export const getAverageScore = async (userId) => {
    const attempts = await QuizAttempt.find({ user: userId });

    if (!attempts.length) return { averagePercentage: 0, attempts: 0 };

    const total = attempts.reduce((sum, a) => sum + a.percentageScore, 0);
    const average = total / attempts.length;

    return {
        attempts: attempts.length,
        averagePercentage: Number(average.toFixed(2)),
    };
};

export const updateBio = async ({ userId, bio }) => {
    const user = await User.findByIdAndUpdate(userId, { bio }, { new: true });
    if (!user) return { notFound: true };

    return { bio: user.bio };
};

export const uploadProfilePic = async ({ userId, file }) => {
    const user = await User.findById(userId);
    if (!user) return { notFound: true };

    if (user.profilePicId) {
        try {
            await cloudinary.uploader.destroy(user.profilePicId);
        } catch (err) {
            console.warn('Cloudinary delete failed:', err.message);
        }
    }

    user.profilePic = file.path;
    user.profilePicId = file.filename;
    await user.save();

    return { profilePic: user.profilePic };
};

export const deleteProfilePic = async (userId) => {
    const user = await User.findById(userId);
    if (!user) return { notFound: true };
    if (!user.profilePicId) return { noPic: true };

    await cloudinary.uploader.destroy(user.profilePicId, { resource_type: 'image' });

    user.profilePic = '';
    user.profilePicId = '';
    await user.save();

    return { success: true };
};