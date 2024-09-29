import React from "react";

import AdminLayout from "../../components/admin/adminBars/AdminLayout";
import AdminStudentDetails from "../../components/admin/AdminStudentDetails";

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