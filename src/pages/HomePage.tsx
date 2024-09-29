import React from "react";
import Navbar from "../components/student/Bars/Navbar";
import Home from "../components/Home";
import Footer from "../components/student/Bars/Footbar";

const HomePage: React.FC = () => {
    return (
        <>
            <Navbar />
            <Home />
            <Footer />
        </>
    )
}

export default HomePage