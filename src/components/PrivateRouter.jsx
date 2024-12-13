import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRouter() {
  const { user } = useSelector((state) => state.auth);
  // return user?.email && user?.password ? <Outlet /> : <Navigate to="/login" />;
  return user ? <Outlet /> : <Navigate to="/login" />;
}

// Outlet is a placeholder component provided by react-router-dom. It renders the child routes defined within the parent route in the routing configuration
