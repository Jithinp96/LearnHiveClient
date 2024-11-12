import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from "./components/ErrorBoundary";

// Route files
import StudentRoutes from "./routes/student/StudentRoutes";
import TutorRoutes from "./routes/tutor/TutorRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";

// Public Page
import HomePage from "./pages/HomePage";
import ChatRoutes from "./routes/Chat/ChatRoutes";

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
          <Route 
            path="/*" 
            element={
              <ErrorBoundary>
                <StudentRoutes />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/chat/*" 
            element={
              <ErrorBoundary>
                <ChatRoutes />
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
    </>
  );
};

export default App;