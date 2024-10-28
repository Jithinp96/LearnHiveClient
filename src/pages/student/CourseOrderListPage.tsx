import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import CourseOrderList from "@/components/student/Order/CourseOrderList";

const CourseOrderListPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <CourseOrderList />
            <Footer />
        </>
    )
}

export default CourseOrderListPage