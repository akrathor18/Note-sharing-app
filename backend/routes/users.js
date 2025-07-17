import express from 'express';
const router = express.Router();
import User from '../models/UserSchema.js';
import Role from '../models/Roles.js';
import jwt from 'jsonwebtoken';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import bcrypt from 'bcryptjs';

function generateSessionId(user, res) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
}


router.post('/register', async (req, res) => {
    try {
        const { email, role_name, ...rest } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json('Email already registered');
        }

        // Fetch role ObjectId
        const role = await Role.findOne({ role_name: role_name || 'student' });
        if (!role) {
            return res.status(400).json('Invalid role');
        }

        const newUser = new User({
            ...rest,
            email,
            role: role._id
        });

        const savedUser = await newUser.save();
        const token = generateSessionId(savedUser, res);

        res.status(201).json({ message: 'User registered successfully!', token });
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Populate role so we can access role_name
    const userLogin = await User.findOne({ email }).populate('role');

    if (!userLogin) return res.status(404).json('User not found');

    const isMatch = await userLogin.comparePassword(password);
    if (!isMatch) return res.status(400).json('Invalid credentials');

    const token = generateSessionId(userLogin, res);

    res.status(200).json({
      message: 'User logged in successfully!',
      token,
      user: {
        name: userLogin.name,
        email: userLogin.email,
      }
    });
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
    const userId = req.user._id;

    const user = await User.findById(userId).populate('role').select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/bio', authMiddleware, VerifyJwtMiddleware, async (req, res) => {
    const userId = req.user.id; 
    const { bio } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { bio }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/activity', authMiddleware, VerifyJwtMiddleware, async (req, res) => {
  const { type, refId } = req.body;

  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { recentActivity: { type, refId } }
    });

    res.status(200).json({ message: 'Activity recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to log activity' });
  }
});
export default router;
