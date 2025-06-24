import express from 'express';
const router = express.Router();
import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import bcrypt from 'bcryptjs';
function generateSessionId(user, res) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
}

router.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        const userExist = await User.findOne({ email: userData.email });
        if (userExist) {
            return res.status(400).json('Email already registered');
        }
        const newUser = new User(userData);
        const resp = await newUser.save();
        const token = generateSessionId(newUser, res);
        res.status(201).json({ message: 'User registered successfully!', token });
    } catch (error) {
        console.log(error);
        res.status(500).json(`Internal server error`);
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await User.findOne({ email });

        if (!userLogin) return res.status(404).json('User not found');
        const isMatch = await userLogin.comparePassword(password);
        if (!isMatch) return res.status(400).json('Invalid credentials');
        const token = generateSessionId(userLogin, res);
        res.status(201).json({ message: 'User registered successfully!', token });
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
});

router.post('/changepassword', authMiddleware, VerifyJwtMiddleware, async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const userId = req.user.id;

        // 1. Find the user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json('User not found');

        // // 2. Compare old password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json('Incorrect current password!');

        // 3. Save new password
        user.password = newPassword;
        await user.save();
        res.status(200).json('Password changed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

router.get('/profile', authMiddleware, VerifyJwtMiddleware, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch('/bio', authMiddleware, VerifyJwtMiddleware, async (req, res) => {
    const userId = req.user.id; // Extracted from the token
    const { bio } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { bio }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
