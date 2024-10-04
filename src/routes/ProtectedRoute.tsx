import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AccessDenied from '../pages/access/AccessDenied';


interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles, redirectPath = '/login' }) => {
  const { isAuthenticated, userRole } = useAuth();
 // const roles = ['admin', 'user']
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    return <div><AccessDenied/></div>; // You can customize this to be a better styled Access Denied component.
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
