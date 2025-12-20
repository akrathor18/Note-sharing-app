import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getToken, removeToken, isTokenExpired, handleAuthError, decodeToken } from '../utils/auth';

const ProtectedRoute = () => {
    const token = getToken();
    const alertShown = useRef(false);

    if (!token) {
        handleAuthError("no-token")
        return <Navigate to="/signin" replace />;
    }

    try {
        if (isTokenExpired()) {
            if (!alertShown.current) {
                alertShown.current = true;
                handleAuthError('expired');
            }
            removeToken();
            return <Navigate to="/signin" replace />;
        }

        return <Outlet />;
    } catch {
        if (!alertShown.current) {
            alertShown.current = true;
            handleAuthError('invalid');
        }
        removeToken();
        return <Navigate to="/signin" replace />;
    }
};


export default ProtectedRoute;
