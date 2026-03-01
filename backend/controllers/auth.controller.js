import * as AuthService from '../services/auth.service.js';
import { logger } from '../utils/logger.js';

export const register = async (req, res) => {
    try {
        const result = await AuthService.register(req.body);

        if (result.emailTaken)
            return res.status(400).json({ success: false, message: 'Email already registered', data: null });
        if (result.invalidRole)
            return res.status(400).json({ success: false, message: 'Invalid role', data: null });

        logger.info(`User registered successfully: ${req.body.email}`);
        res.status(201).json({ success: true, message: 'User registered successfully!', data: { token: result.token } });
    } catch (err) {
        logger.error('Registration error', err);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login({ email, password });

        if (result.notFound)
            return res.status(404).json({ success: false, message: 'User not found', data: null });
        if (result.invalidCredentials)
            return res.status(400).json({ success: false, message: 'Invalid credentials', data: null });

        logger.info(`User logged in successfully: ${email}`);
        res.status(200).json({
            success: true,
            message: 'User logged in successfully!',
            data: { token: result.token, user: result.user },
        });
    } catch (err) {
        logger.error('Login error', err);
        res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    logger.info(`User logged out`);
    res.status(200).json({ success: true, message: 'Logged out successfully!', data: null });
};
