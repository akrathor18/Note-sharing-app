import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import profilePicUpload from '../middlewares/profilePicUpload.js';
import * as UserController from '../controllers/user.controller.js';

const router = express.Router();

router.patch('/me/password', VerifyJwtMiddleware, UserController.changePassword);
router.get('/profile', VerifyJwtMiddleware, UserController.getProfile);
router.get('/average-score', VerifyJwtMiddleware, UserController.getAverageScore);
router.patch('/bio', VerifyJwtMiddleware, UserController.updateBio);
router.put('/upload-profile-pic', VerifyJwtMiddleware, profilePicUpload.single('image'), UserController.uploadProfilePic);
router.delete('/delete-profile-pic', VerifyJwtMiddleware, UserController.deleteProfilePic);

export default router;