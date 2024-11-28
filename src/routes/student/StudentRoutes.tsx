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
import TutorProfilePage from "@/pages/student/TutorProfilePage";
import SlotBookingPage from "@/pages/student/SlotBookingPage";
import PaymentSuccessPage from "@/pages/student/PaymentSuccessPage";
import PaymentFailurePage from "@/pages/student/PaymentFailurePage";
import CourseOrderListPage from "@/pages/student/CourseOrderListPage";
import CourseViewerPage from "@/pages/student/CourseViewerPage";
import PurchasedCourseListPage from "@/pages/student/PurchasedCourseListPage";
import VideoCallRoomPage from "@/pages/communication/VideoCallRoomPage";
import VideoCallEntryPage from "@/pages/communication/VideoCallEntryPage";
import SlotOrderListPage from "@/pages/student/SlotOrderListPage";
import StudentAssessmentListPage from "@/pages/assessment/StudentAssessmentListPage";
import AssessmentGuidelinesPage from "@/pages/assessment/AssessmentGuidelinesPage";
import AssessmentInterfacePage from "@/pages/assessment/AssessmentInterfacePage";
import SubmissionSuccessPage from "@/pages/assessment/SubmissionSuccessPage";
import AssessmentResultPage from "@/pages/assessment/AssessmentResultPage";
import CertificatePage from "@/pages/student/CertificatePage";

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
        <Route path="/tutorprofile/:tutorId" element={<TutorProfilePage />} />
        <Route path="/slotbooking/:tutorId" element={<SlotBookingPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route path="/paymentfailure" element={<PaymentFailurePage />} />
        <Route path="/course-orders" element={<CourseOrderListPage />} />
        <Route path="/slot-orders" element={<SlotOrderListPage />} />
        <Route path="/mycourses" element={<PurchasedCourseListPage />} />
        <Route path="/course-view/:id" element={<CourseViewerPage />} />
        <Route path="/assessment-list" element={<StudentAssessmentListPage />} />
        <Route path="/assessment-guidelines/:assessmentId" element={<AssessmentGuidelinesPage />} />
        <Route path="/start-assessment/:assessmentId" element={ <AssessmentInterfacePage /> } />
        <Route path='/assessment-complete' element={<SubmissionSuccessPage />} />
        <Route path="/assessment-result/:assessmentId" element={<AssessmentResultPage />} />
        <Route path="/certificate" element={< CertificatePage />} />
      </Route>
      
      <Route path="/allcourses" element={<AllCourseListPage />} />
      <Route path="/course/:id" element={<CourseDetailPage />} />
      <Route path="/room" element={<VideoCallEntryPage />} />
      <Route path="/room/:id" element={<VideoCallRoomPage />} />
    </Routes>
  );
};

export default StudentRoutes;
