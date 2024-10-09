import React from "react";

import TutorNavbar from "@/components/tutor/Bars/TutorNavBar";
import AddNewCourse from "@/components/tutor/Course/AddNewCourse";

const AddNewCoursePage: React.FC = () => {
    return (
        <>
            <TutorNavbar />
            <AddNewCourse />
        </>
    )
}

export default AddNewCoursePage