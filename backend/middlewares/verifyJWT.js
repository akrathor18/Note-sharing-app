import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

const VerifyJwtMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error); // Debugging line
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default VerifyJwtMiddleware;
