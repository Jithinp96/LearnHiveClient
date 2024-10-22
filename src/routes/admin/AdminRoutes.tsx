import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

// Admin Pages
import AdminSignInPage from "../../pages/admin/AdminSignInPage";
import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import AdminStudentPage from "../../pages/admin/AdminStudentPage";
import AdminStudentDetailsPage from "../../pages/admin/AdminStudentDetailsPage";
import AdminCourseCategoryPage from "../../pages/admin/AdminCourseCategoryPage";
import TutorListPage from "../../pages/admin/TutorListPage";
import TutorDetailsPage from "../../pages/admin/TutorDetailsPage";
import AdminCourseCategoryListPage from "@/pages/admin/AdminCourseListPage";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route element={<GuestRoute />}>
        <Route path="/signin" element={<AdminSignInPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/students" element={<AdminStudentPage />} />
        <Route path="/student/:id" element={<AdminStudentDetailsPage />} />
        <Route path="/tutors" element={<TutorListPage />} />
        <Route path="/tutor/:id" element={<TutorDetailsPage />} />
        <Route path="/course-categories" element={<AdminCourseCategoryPage />} />
        <Route path="/courses" element={<AdminCourseCategoryListPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
