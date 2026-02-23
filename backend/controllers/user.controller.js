import * as UserService from '../services/user.service.js';

export const changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const result = await UserService.changePassword({ userId: req.user._id, password, newPassword });

        if (result.notFound)
            return res.status(404).json({ success: false, message: 'User not found', data: null });
        if (result.incorrectPassword)
            return res.status(400).json({ success: false, message: 'Incorrect current password!', data: null });

        res.status(200).json({ success: true, message: 'Password changed successfully', data: null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await UserService.getProfile(userId);

        if (result.notFound) return res.status(404).json({ success: false, message: 'User not found', data: null });

        res.status(200).json({
            success: true,
            message: 'Profile retrieved',
            data: { userState: result.userState, user: result.user },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};

export const getAverageScore = async (req, res) => {
    try {
        const result = await UserService.getAverageScore(req.user._id);
        res.status(200).json({ success: true, message: 'Average score retrieved', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const updateBio = async (req, res) => {
    try {
        const result = await UserService.updateBio({ userId: req.user._id, bio: req.body.bio });

        if (result.notFound) return res.status(404).json({ success: false, message: 'User not found', data: null });

        res.status(200).json({ success: true, message: 'Bio updated', data: { bio: result.bio } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ success: false, message: 'No file uploaded', data: null });

        const result = await UserService.uploadProfilePic({ userId: req.user._id, file: req.file });

        if (result.notFound) return res.status(404).json({ success: false, message: 'User not found', data: null });

        res.status(200).json({
            success: true,
            message: 'Profile picture updated!',
            data: { profilePic: result.profilePic },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Upload failed', data: null });
    }
};

export const deleteProfilePic = async (req, res) => {
    try {
        const result = await UserService.deleteProfilePic(req.user._id);

        if (result.notFound) return res.status(404).json({ success: false, message: 'User not found', data: null });
        if (result.noPic)
            return res.status(400).json({ success: false, message: 'No profile picture to delete', data: null });

        res.status(200).json({ success: true, message: 'Profile picture deleted successfully', data: null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete profile picture', data: null });
    }
};