import React from "react";

import AdminStudentsList from "../../components/adminComponents/AdminStudentsList";
import AdminLayout from "../../components/adminComponents/adminBars/AdminLayout";

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