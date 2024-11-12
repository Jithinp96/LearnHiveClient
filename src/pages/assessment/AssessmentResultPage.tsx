import React from "react";

import AssessmentResult from "@/components/Assessments/AssessmentResult";
import Navbar from "@/components/student/Bars/Navbar";

const AssessmentResultPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <AssessmentResult />
        </>
    )
}

export default AssessmentResultPage