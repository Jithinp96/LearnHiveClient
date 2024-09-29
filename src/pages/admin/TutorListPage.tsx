import React from "react";

import TutorList from "../../components/admin/TutorList";
import AdminLayout from "../../components/admin/adminBars/AdminLayout";

const TutorListPage: React.FC = () => {
    return(
        <>
            <AdminLayout>
                <TutorList />
            </AdminLayout>
        </>
    )
}

export default TutorListPage