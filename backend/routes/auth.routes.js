import express from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import createRedisRateLimiter from '../middlewares/redisRateLimiter.js';

const router = express.Router();

const authAttemptLimiter = createRedisRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: 'Too many authentication attempts. Please try again later.',
});

const loginLimiter = createRedisRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: 'Too many login attempts. Please try again later.',
});

router.post('/register', authAttemptLimiter, AuthController.register);
router.post('/login', loginLimiter, AuthController.login);
router.post('/logout', AuthController.logout);

export default router;
