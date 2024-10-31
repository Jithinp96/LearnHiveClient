import React from "react";

import AdminLayout from "../../components/admin/adminBars/AdminLayout";
import AdminCourseDetails from "@/components/admin/AdminCourseDetails";

const AdminCourseDetailsPage: React.FC = () => {
    return (
        <>
            <AdminLayout>
                <AdminCourseDetails />
            </AdminLayout>
        </>
    )
}

export default AdminCourseDetailsPage;