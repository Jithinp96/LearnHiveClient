import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import CourseViewer from "@/components/student/Course/CourseVeiwer";

const CourseViewerPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <CourseViewer />
            <Footer />
        </>
    )
}

export default CourseViewerPage