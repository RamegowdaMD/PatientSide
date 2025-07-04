import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// General purpose protected route for any logged-in user
const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let location = useLocation();

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Specific protected route for doctors only
export const DoctorRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let location = useLocation();

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (userInfo.role !== 'doctor') {
    // If a logged-in patient tries to access a doctor page, send them to their own dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;