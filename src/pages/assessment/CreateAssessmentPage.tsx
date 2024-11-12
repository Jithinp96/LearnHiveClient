import React from "react";

import TutorNavbar from "@/components/tutor/Bars/TutorNavBar";
import CreateAssessment from "@/components/Assessments/CreateAssessment";

const CreateAssessmentPage: React.FC = () => {
    return (
        <>
            <TutorNavbar />
            <CreateAssessment />
        </>
    )
}

export default CreateAssessmentPage