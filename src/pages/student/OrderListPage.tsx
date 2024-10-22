import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import OrderList from "@/components/student/Order/OrderList";

const OrderListPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <OrderList />
            <Footer />
        </>
    )
}

export default OrderListPage