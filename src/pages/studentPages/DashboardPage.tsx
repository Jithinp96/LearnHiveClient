import React from "react";
import Navbar from "../../components/studentComponents/Bars/Navbar";
import StudentDashboard from "../../components/studentComponents/StudentDashboard";
import Footer from "../../components/studentComponents/Bars/Footbar";

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