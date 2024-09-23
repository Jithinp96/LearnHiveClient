import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// STUDENT
import StudentAuthPage from './pages/studentPages/StudentAuthPage';
import OTPPage from './pages/studentPages/OTPPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/studentPages/DashboardPage';

// TUTOR
import TutorAuthPage from './pages/tutorPages/TutorAuthPage';

//ADMIN
import AdminSignInPage from './pages/adminPages/AdminSignInPage';
import AdminDashboardPage from './pages/adminPages/AdminDashboardPage';
import AdminStudentPage from './pages/adminPages/AdminStudentPage';
import AdminStudentDetailsPage from './pages/adminPages/AdminStudentDetailsPage';
import TutorDashboardPage from './pages/tutorPages/TutorDashboardPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<StudentAuthPage />} />
                <Route path="/otp-verify" element={<OTPPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path='/tutors/auth' element = {<TutorAuthPage />} />
                <Route path='tutor/dashboard' element={< TutorDashboardPage />} />

                <Route path='/admin/signin' element={<AdminSignInPage />} />
                <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
                <Route path='/admin/students' element={<AdminStudentPage />} />
                <Route path='/admin/student/:id' element={<AdminStudentDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;