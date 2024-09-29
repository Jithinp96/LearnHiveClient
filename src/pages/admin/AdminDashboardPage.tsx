import React from "react";
import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminLayout from "../../components/admin/adminBars/AdminLayout";

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

export default AdminDashboardPage;