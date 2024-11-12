import React from "react";

import TutorNavbar from "@/components/tutor/Bars/TutorNavBar";
import TutorAssessmentList from "@/components/Assessments/TutorAssessmentList";

const TutorAssessmentListPage: React.FC = () => {
    return (
        <>
            <TutorNavbar />
            <TutorAssessmentList />
        </>
    )
}

export default TutorAssessmentListPage