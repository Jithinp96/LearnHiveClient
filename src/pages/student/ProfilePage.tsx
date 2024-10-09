import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Profile from "../../components/student/Profile/Profile";
import Footer from "../../components/student/Bars/Footbar";

const ProfilePage: React.FC = () => {
    return (
        <>
            <Navbar />
            <Profile />
            <Footer />
        </>
    )
}

export default ProfilePage