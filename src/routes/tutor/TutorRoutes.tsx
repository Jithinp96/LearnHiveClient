import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../tutor/ProtectedRoute";
import GuestRoute from "../tutor/GuestRoute";

// Tutor Pages
import TutorAuthPage from "../../pages/tutor/TutorAuthPage";
import TutorDashboardPage from "../../pages/tutor/TutorDashboardPage";
import ForgotPasswordPage from "../../pages/tutor/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/tutor/ResetPasswordPage";

const TutorRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Guest Routes */}
      <Route element={<GuestRoute />}>
        <Route path="/auth" element={<TutorAuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<TutorDashboardPage />} />
      </Route>
    </Routes>
  );
};

export default TutorRoutes;
