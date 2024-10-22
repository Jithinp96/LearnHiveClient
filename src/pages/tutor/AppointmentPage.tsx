import React from "react";

import TutorNavbar from "@/components/tutor/Bars/TutorNavBar";
import TutorAppointmentDetails from "@/components/tutor/Slots/AppointmentDetails";

const TutorAppointmentPage: React.FC = () => {
    return (
        <>
            <TutorNavbar />
            <TutorAppointmentDetails />
        </>
    )
}

export default TutorAppointmentPage