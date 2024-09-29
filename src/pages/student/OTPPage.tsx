import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/student/Bars/Navbar";
import OTPForm from "../../components/student/AuthPages/OTPForm";

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