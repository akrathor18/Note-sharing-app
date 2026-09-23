import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import profilePicUpload from '../middlewares/profilePicUpload.js';
import * as UserController from '../controllers/user.controller.js';
import createRedisRateLimiter from '../middlewares/redisRateLimiter.js';

const router = express.Router();

const passwordChangeLimiter = createRedisRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: 'Too many password change attempts. Please try again later.',
});

router.patch('/me/password', passwordChangeLimiter, VerifyJwtMiddleware, UserController.changePassword);
router.get('/profile', VerifyJwtMiddleware, UserController.getProfile);
router.get('/average-score', VerifyJwtMiddleware, UserController.getAverageScore);
router.patch('/bio', VerifyJwtMiddleware, UserController.updateBio);
router.put('/upload-profile-pic', VerifyJwtMiddleware, profilePicUpload.single('image'), UserController.uploadProfilePic);
router.delete('/delete-profile-pic', VerifyJwtMiddleware, UserController.deleteProfilePic);

export default router;
