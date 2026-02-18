import express from 'express';
import VerifyJwtMiddleware from '../middlewares/verifyJWT.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import profilePicUpload from '../middlewares/profilePicUpload.js';
import * as UserController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/changepassword', VerifyJwtMiddleware, authMiddleware, UserController.changePassword);
router.get('/profile', VerifyJwtMiddleware, authMiddleware, UserController.getProfile);
router.get('/average-score', VerifyJwtMiddleware, authMiddleware, UserController.getAverageScore);
router.patch('/bio', VerifyJwtMiddleware, authMiddleware, UserController.updateBio);
router.put('/upload-profile-pic', VerifyJwtMiddleware, authMiddleware, profilePicUpload.single('image'), UserController.uploadProfilePic);
router.delete('/delete-profile-pic', VerifyJwtMiddleware, authMiddleware, UserController.deleteProfilePic);

export default router;