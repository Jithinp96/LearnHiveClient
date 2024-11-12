import React from "react";

import Navbar from "@/components/student/Bars/Navbar";
import AssessmentGuidelines from "@/components/Assessments/AssessmentGuidelines";

const AssessmentGuidelinesPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <AssessmentGuidelines />
        </>
    )
}

export default AssessmentGuidelinesPage