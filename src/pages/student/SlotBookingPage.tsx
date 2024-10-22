import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import SlotBooking from "@/components/student/Course/SlotBooking";

const SlotBookingPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <SlotBooking />
            <Footer />
        </>
    )
}

export default SlotBookingPage