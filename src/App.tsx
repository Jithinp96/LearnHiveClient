import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";

// Route files
import StudentRoutes from "./routes/student/StudentRoutes";
import TutorRoutes from "./routes/tutor/TutorRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";

// Public Page
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  // return (
  //   <Router>
  //     <Routes>
  //       {/* Public Route */}
  //       <Route path="/" element={<HomePage />} />

  //       {/* Student, Tutor, and Admin Routes */}
  //       <Route path="/*" element={<StudentRoutes />} />
  //       <Route path="/tutor/*" element={<TutorRoutes />} />
  //       <Route path="/admin/*" element={<AdminRoutes />} />
  //     </Routes>
  //   </Router>
  // );

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/" 
          element={
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          } 
        />

        {/* Student, Tutor, and Admin Routes wrapped with ErrorBoundary */}
        <Route 
          path="/*" 
          element={
            <ErrorBoundary>
              <StudentRoutes />
            </ErrorBoundary>
          } 
        />
        <Route 
          path="/tutor/*" 
          element={
            <ErrorBoundary >
              <TutorRoutes />
            </ErrorBoundary>
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            <ErrorBoundary>
              <AdminRoutes />
            </ErrorBoundary>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;