import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import PurchasedCourseList from "@/components/student/Course/PurchasedCourseList";

const PurchasedCourseListPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <PurchasedCourseList />
            <Footer />
        </>
    )
}

export default PurchasedCourseListPage