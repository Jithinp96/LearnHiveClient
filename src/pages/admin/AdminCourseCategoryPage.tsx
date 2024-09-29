import React from "react";

import AdminLayout from "../../components/admin/adminBars/AdminLayout";
import AdminCourseCategoryList from "../../components/admin/AdminCourseCategoryList";

const AdminCourseCategoryPage: React.FC = () => {
    return (
        <>
            <AdminLayout>
                <AdminCourseCategoryList />
            </AdminLayout>
        </>
    )
}

export default AdminCourseCategoryPage;