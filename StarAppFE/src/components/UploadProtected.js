import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role === 2) {
    return true;
  }
  return false;
};

const UploadProtected = (props) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/NotAuthorized" />;
};

export default UploadProtected;
