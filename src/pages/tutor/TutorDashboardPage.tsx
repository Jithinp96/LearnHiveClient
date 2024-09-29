import React from "react";
import TutorDashboard from "../../components/tutor/TutorDashboard";
import TutorNavbar from "../../components/tutor/Bars/TutorNavBar";

const TutorDashboardPage: React.FC = () => {
    return (
        <>
            <TutorNavbar />
            <TutorDashboard />
        </>
    )
}

export default TutorDashboardPage;