import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getToken, removeToken, isTokenExpired, handleAuthError, decodeToken } from '../utils/auth';

const ProtectedRoute = () => {
    const token = getToken();
    const alertShown = useRef(false); // Prevent multiple toasts

    useEffect(() => {
        if (!token && !alertShown.current && window.location.pathname !== '/signin') {
            alertShown.current = true;
            handleAuthError('no-token');
        }
    }, [token]);

    try {
        if (isTokenExpired()) {
            if (!alertShown.current) {
                alertShown.current = true;
                handleAuthError('expired');
            }
            removeToken();
            return <Navigate to="/signin" />;
        }
        return <Outlet />;
    } catch (error) {
        if (!alertShown.current) {
            alertShown.current = true;
            handleAuthError('invalid');
        }
        removeToken();
        return <Navigate to="/signin" />;
    }
};

export default ProtectedRoute;
