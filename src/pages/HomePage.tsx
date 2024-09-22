import React from "react";
import Navbar from "../components/studentComponents/Bars/Navbar";
import Home from "../components/Home";
import Footer from "../components/studentComponents/Bars/Footbar";

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