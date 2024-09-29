import React from "react";

import AdminStudentsList from "../../components/admin/AdminStudentsList";
import AdminLayout from "../../components/admin/adminBars/AdminLayout";

const AdminStudentPage: React.FC = () => {
    return(
        <> 
            <AdminLayout>
                <AdminStudentsList />
            </AdminLayout>
        </>
    )
}

export default AdminStudentPage