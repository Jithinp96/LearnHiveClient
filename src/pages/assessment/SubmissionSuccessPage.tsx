import React from "react";
import { useLocation } from "react-router-dom";

import SubmissionSuccess from "@/components/Assessments/SubmissionSuccess";

const SubmissionSuccessPage: React.FC = () => {
    const { state } = useLocation();
    const { assessment } = state || {};
    return (
        <>
            {assessment && <SubmissionSuccess assessment={assessment} />}
        </>
    )
}

export default SubmissionSuccessPage