import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Route files
import StudentRoutes from "./routes/student/StudentRoutes";
import TutorRoutes from "./routes/tutor/TutorRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";

// Public Page
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />

        {/* Student, Tutor, and Admin Routes */}
        <Route path="/*" element={<StudentRoutes />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;