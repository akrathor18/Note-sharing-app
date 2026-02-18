import * as AuthService from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const result = await AuthService.register(req.body);

        if (result.emailTaken) return res.status(400).json('Email already registered');
        if (result.invalidRole) return res.status(400).json('Invalid role');

        res.status(201).json({ message: 'User registered successfully!', token: result.token });
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login({ email, password });

        if (result.notFound) return res.status(404).json('User not found');
        if (result.invalidCredentials) return res.status(400).json('Invalid credentials');

        res.status(200).json({
            message: 'User logged in successfully!',
            token: result.token,
            user: result.user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully!' });
};