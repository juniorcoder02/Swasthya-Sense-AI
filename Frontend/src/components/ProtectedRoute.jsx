import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  // If user is not logged in, redirect to login page
  return user ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
