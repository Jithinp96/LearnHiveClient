import React from "react";

import TutorNavbar from "@/components/tutor/Bars/TutorNavBar";
import EditCourse from "@/components/tutor/Course/EditCourse";

const EditCoursePage: React.FC = () => {
    return (
        <>
            <TutorNavbar />
            <EditCourse />
        </>
    )
}

export default EditCoursePage