import * as UserService from '../services/user.service.js';

export const changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const result = await UserService.changePassword({ userId: req.user.id, password, newPassword });

        if (result.notFound) return res.status(404).json('User not found');
        if (result.incorrectPassword) return res.status(400).json('Incorrect current password!');

        res.status(200).json('Password changed successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const result = await UserService.getProfile(userId);

        if (result.notFound) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ userState: result.userState, user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAverageScore = async (req, res) => {
    try {
        const result = await UserService.getAverageScore(req.user.id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateBio = async (req, res) => {
    try {
        const result = await UserService.updateBio({ userId: req.user.id, bio: req.body.bio });

        if (result.notFound) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ bio: result.bio });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const result = await UserService.uploadProfilePic({ userId: req.user.id, file: req.file });

        if (result.notFound) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'Profile picture updated!', profilePic: result.profilePic });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Upload failed' });
    }
};

export const deleteProfilePic = async (req, res) => {
    try {
        const result = await UserService.deleteProfilePic(req.user.id);

        if (result.notFound) return res.status(404).json({ message: 'User not found' });
        if (result.noPic) return res.status(400).json({ message: 'No profile picture to delete' });

        res.status(200).json({ message: 'Profile picture deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete profile picture' });
    }
};