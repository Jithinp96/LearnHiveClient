import React from "react";
import TutorDashboard from "../../components/tutorComponents/TutorDashboard";
import TutorNavbar from "../../components/tutorComponents/Bars/TutorNavBar";

const TutorDashboardPage: React.FC = () => {
    return (
        <>
            <TutorNavbar />
            <TutorDashboard />
        </>
    )
}

export default TutorDashboardPage;