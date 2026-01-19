import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    return isAuthenticated === 'true' ? <Outlet /> : <Navigate to="/admin" />;
};

export default ProtectedRoute;
