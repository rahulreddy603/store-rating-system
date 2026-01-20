import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Handle Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Check if user is logged in
  if (!user) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Check Role-Based Access Control (RBAC)
  // If allowedRoles is provided, check if the user's role is in the list
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user is logged in but doesn't have the right role, send them back to their default dashboard
    const redirectPath = user.role === 'admin' ? '/admin' : user.role === 'store_owner' ? '/owner' : '/user';
    return <Navigate to={redirectPath} replace />;
  }

  // 4. If everything is fine, render the requested component
  return children;
};

export default ProtectedRoute;