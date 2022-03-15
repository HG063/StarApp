import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if ((user && user.role === 1) || (user && user.role === 3)) {
    return true;
  }
  return false;
};

const AllowanceProtected = (props) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/NotAuthorized" />;
};

export default AllowanceProtected;
