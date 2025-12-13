import express from 'express';
const router = express.Router();
import User from '../models/UserSchema.js';
import Role from '../models/Roles.js';
import QuizAttempt from '../models/QuizAttempt.js';
import jwt from 'jsonwebtoken';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import profilePicUpload from '../middlewares/profilePicUpload.js';
import cloudinary from '../config/cloudinary.js';
import bcrypt from 'bcryptjs';
import {trackActivityAndStreak} from '../utils/activityTracker.js';

// Helper function to generate JWT and set cookie 
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

// Auth routes below
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

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully!" });
});


//user routes below
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
    const userId = req.user._id || req.user.id;

    // track activity and streak (if this is lightweight for you)
    const userState = await trackActivityAndStreak(userId);

    // fetch user
   const user = await User.findById(userId)
  .populate('role')
  .populate('links')
  .select('-password -userstate -__v')
  .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // only send latest N activities (e.g. 10)
  const recentActivity =
  (user.recentActivity || [])
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
    }));

user.recentActivity = recentActivity;

    // attach clean recentActivity to user object
    user.recentActivity = recentActivity;

    res.status(200).json({ userState, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/average-score', authMiddleware, VerifyJwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all attempts for this user
    const attempts = await QuizAttempt.find({ user: userId });

    if (!attempts.length) {
      return res.json({ averagePercentage: 0, attempts: 0 });
    }

    // Calculate average percentage
    const total = attempts.reduce((sum, a) => sum + a.percentageScore, 0);
    const average = total / attempts.length;

    res.json({
      attempts: attempts.length,
      averagePercentage: Number(average.toFixed(2)),
    });

  } catch (err) {
    console.error("Error calculating average score:", err);
    res.status(500).json({ message: "Server error" });
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

router.put('/upload-profile-pic', authMiddleware, VerifyJwtMiddleware, profilePicUpload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.profilePicId) { // if user already has a profile pic
      // Delete old profile picture from Cloudinary
      await cloudinary.uploader.destroy(user.profilePicId, {
        resource_type: 'image'
      });
    }

    user.profilePic = req.file.path;
    user.profilePicId = req.file.filename;

    await user.save();
    res.status(200).json({ message: 'Profile picture updated!', profilePic: user.profilePic });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.delete('/delete-profile-pic', authMiddleware, VerifyJwtMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'No profile picture to delete' });
    }

    await cloudinary.uploader.destroy(user.profilePicId, {
      resource_type: 'image'
    });

    user.profilePic = '';
    user.profilePicId = '';
    await user.save();

    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ message: 'Failed to delete profile picture' });
  }
});

export default router;