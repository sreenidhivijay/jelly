import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './UserContext';

function AdminRoute() {
  const { user } = useUser();

  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ redirectTo: '/admin' }} replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
