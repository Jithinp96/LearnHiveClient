import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../student/ProtectedRoute";
import GuestRoute from "../student/GuestRoute";

// Student Pages
import StudentAuthPage from "../../pages/student/StudentAuthPage";
import OTPPage from "../../pages/student/OTPPage";
import ForgotPasswordPage from "../../pages/student/ForgotPasswordPage";
import DashboardPage from "../../pages/student/DashboardPage";
import ResetPasswordPage from "../../pages/student/ResetPassowordPage";
import ProfilePage from "../../pages/student/ProfilePage";
import AllCourseListPage from "@/pages/student/AllCourseListPage";

const StudentRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Guest Routes */}
      <Route element={<GuestRoute />}>
        <Route path="/auth" element={<StudentAuthPage />} />
        <Route path="/otp-verify" element={<OTPPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/allcourses" element={<AllCourseListPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
