import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import SlotOrderList from "@/components/student/Order/SlotOrderDetails";

const SlotOrderListPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <SlotOrderList />
            <Footer />
        </>
    )
}

export default SlotOrderListPage