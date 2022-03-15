import React from "react";
import { Navigate, Outlet } from "react-router-dom";



const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if ((user && user.role === 1)) {
    return true;
  }
  return false;
};

const RestrictedRoute = (props) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/NotAuthorized" />;
};

export default RestrictedRoute;
