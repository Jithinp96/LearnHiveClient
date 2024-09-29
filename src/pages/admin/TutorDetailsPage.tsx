import React from "react";

import AdminLayout from "../../components/admin/adminBars/AdminLayout";
import TutorDetails from "../../components/admin/TutorDetails";

const TutorDetailsPage: React.FC = () => {
    return (
        <>
            <AdminLayout>
                <TutorDetails />
            </AdminLayout>
        </>
    )
}

export default TutorDetailsPage;