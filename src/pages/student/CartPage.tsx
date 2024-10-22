import React from "react";
import Navbar from "../../components/student/Bars/Navbar";
import Footer from "../../components/student/Bars/Footbar";
import Cart from "@/components/student/Cart/Cart";

const CartPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <Cart />
            <Footer />
        </>
    )
}

export default CartPage