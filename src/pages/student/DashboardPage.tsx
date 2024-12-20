import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import StudentDashboard from "@/components/student/Dashboard/StudentDahsboard";

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