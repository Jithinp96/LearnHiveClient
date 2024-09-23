import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/studentComponents/Bars/Navbar";
import OTPForm from "../../components/studentComponents/AuthPages/OTPForm";

const OTPPage: React.FC = () => {
    const location = useLocation();
    const registrationType = location.state?.registrationType || 'student';
    
    return (
        <>
            <Navbar />
            <OTPForm registrationType = {registrationType} />
        </>
    )
}

export default OTPPage