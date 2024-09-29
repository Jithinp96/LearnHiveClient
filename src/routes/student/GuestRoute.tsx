import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const GuestRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.student.isStudentAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default GuestRoute;