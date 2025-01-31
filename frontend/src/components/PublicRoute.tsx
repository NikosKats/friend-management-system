import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PublicRouteProps {
  element: React.ReactNode;
  restricted: boolean;
  redirectPath: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, restricted, redirectPath }) => {
  const { user } = useSelector((state: any) => state.auth);

  // If the user is logged in and tries to access a restricted page (login/signup), redirect to home
  if (user && restricted) {
    return <Navigate to={redirectPath} />;
  }

  return <>{element}</>;
};

export default PublicRoute;
