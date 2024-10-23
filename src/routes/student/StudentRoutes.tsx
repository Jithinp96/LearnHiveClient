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
import CourseDetailPage from "@/pages/student/CourseDetailsPage";
import CartPage from "@/pages/student/CartPage";
import TutorProfilePage from "@/pages/student/TutorProfilePage";
import SlotBookingPage from "@/pages/student/SlotBookingPage";
import PaymentSuccessPage from "@/pages/student/PaymentSuccessPage";
import PaymentFailurePage from "@/pages/student/PaymentFailurePage";
import OrderListPage from "@/pages/student/OrderListPage";
import CourseViewerPage from "@/pages/student/CourseViewerPage";
import PurchasedCourseListPage from "@/pages/student/PurchasedCourseListPage";

const StudentRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Guest Routes */}
      <Route element={<GuestRoute />}>
        <Route path="/auth" element={<StudentAuthPage />} />
        <Route path="/otp-verify" element={<OTPPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/tutorprofile/:tutorId" element={<TutorProfilePage />} />
        <Route path="/slotbooking/:tutorId" element={<SlotBookingPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route path="/paymentfailure" element={<PaymentFailurePage />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/mycourses" element={<PurchasedCourseListPage />} />
        <Route path="/course-view/:id" element={<CourseViewerPage />} />
      </Route>
      
      <Route path="/allcourses" element={<AllCourseListPage />} />
      <Route path="/course/:id" element={<CourseDetailPage />} />
    </Routes>
  );
};

export default StudentRoutes;
