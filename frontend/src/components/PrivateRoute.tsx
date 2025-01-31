// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust this import based on your store file location

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  // Access user state from Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  // If user is not authenticated, redirect to login page
  return user ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
