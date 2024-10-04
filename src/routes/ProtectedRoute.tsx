import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AccessDenied from '../pages/access/AccessDenied';

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles, redirectPath = '/login' }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <AccessDenied />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
