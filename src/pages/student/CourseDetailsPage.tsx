import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import CourseDetail from "@/components/student/Course/CourseDetails";

const CourseDetailPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <CourseDetail />
            <Footer />
        </>
    )
}

export default CourseDetailPage