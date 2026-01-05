import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect based on role if unauthorized
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'ops_manager') return <Navigate to="/ops" replace />;
        if (user.role === 'dca_agent') return <Navigate to="/dca" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
