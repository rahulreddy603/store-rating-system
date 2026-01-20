import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';

// Placeholder views - Replace with actual components
import AdminDashboard from './views/admin/AdminDashboard';
import StoreCard from './views/user/StoreCard';
import OwnerDashboard from './views/owner/OwnerDashboard';

function App() {
  const { user, loginUser, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLoginSuccess={loginUser} />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes by Role */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/owner/*" element={
          <ProtectedRoute allowedRoles={['store_owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/user/*" element={
          <ProtectedRoute allowedRoles={['user']}>
            <StoreCard/>
          </ProtectedRoute>
        } />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;