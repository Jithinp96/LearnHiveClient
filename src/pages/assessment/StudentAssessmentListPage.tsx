import React from "react";

import StudentAssessmentList from "@/components/Assessments/StudentAssessmentList";
import Navbar from "@/components/student/Bars/Navbar";

const StudentAssessmentListPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <StudentAssessmentList />
        </>
    )
}

export default StudentAssessmentListPage