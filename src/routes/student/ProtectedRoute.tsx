import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.student.isStudentAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;