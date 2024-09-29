import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import StudentDashboard from "../../components/student/StudentDashboard";
import Footer from "../../components/student/Bars/Footbar";

const DashboardPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <StudentDashboard />
            <Footer />
        </>
    )
}

export default DashboardPage