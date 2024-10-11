import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import AllCourseList from "@/components/student/Course/AllCourseList";
import Footer from "../../components/student/Bars/Footbar";

const AllCourseListPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <AllCourseList />
            <Footer />
        </>
    )
}

export default AllCourseListPage