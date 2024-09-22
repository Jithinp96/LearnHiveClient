import React from "react";

import AdminLayout from "../../components/adminComponents/adminBars/AdminLayout";
import AdminStudentDetails from "../../components/adminComponents/AdminStudentDetails";

const AdminStudentDetailsPage: React.FC = () => {
    return(
        <>
            <AdminLayout>
                <AdminStudentDetails />
            </AdminLayout>
        </>
    )
}

export default AdminStudentDetailsPage;