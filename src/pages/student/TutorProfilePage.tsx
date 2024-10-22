import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import TutorProfile from "@/components/student/Profile/TutorProfile";

const TutorProfilePage: React.FC = () => {
    return(
        <>
            <Navbar />
            <TutorProfile />
            <Footer />
        </>
    )
}

export default TutorProfilePage