import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';
import Role from '../models/Roles.js';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

export const register = async ({ email, role_name, ...rest }) => {
    const userExist = await User.findOne({ email });
    if (userExist) return { emailTaken: true };

    const role = await Role.findOne({ role_name: role_name || 'student' });
    if (!role) return { invalidRole: true };

    const newUser = new User({ ...rest, email, role: role._id });
    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    return { token };
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).populate('role');
    if (!user) return { notFound: true };

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return { invalidCredentials: true };

    const token = generateToken(user);

    return {
        token,
        user: {
            name: user.name,
            email: user.email,
        },
    };
};