import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

// Token management
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// JWT decoding and validation
export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const isTokenExpired = () => {
    const token = getToken();
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};


// Auth-related toast notifications
export const handleAuthError = (type) => {
    switch (type) {
        case 'no-token':
            toast.error('You need to log-in to access this page!');
            break;
        case 'expired':
            toast.error('Session expired. Please log in again.');
            break;
        case 'invalid':
            toast.error('Invalid session. Please log in again.');
            break;
        case 'logout':
            toast.success('Log-out successfully!');
            break;
        case 'signin-success':
            toast.success('Sign in successfully!');
            break;
        case 'signup-success':
            toast.success('Register successfully!');
            break;
        default:
            toast.error('Authentication error.');
    }
};

export const isAuthenticated = () => {
    const token = getToken();
    return token && !isTokenExpired(token);
};
