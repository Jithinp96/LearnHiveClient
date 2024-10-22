import React from "react";

import AdminLayout from "../../components/admin/adminBars/AdminLayout";
import AdminCourseList from "@/components/admin/AdminCourseList";

const AdminCourseCategoryListPage: React.FC = () => {
    return(
        <> 
            <AdminLayout>
                <AdminCourseList />
            </AdminLayout>
        </>
    )
}

export default AdminCourseCategoryListPage