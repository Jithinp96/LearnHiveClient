import React from "react";
import AdminDashboard from "../../components/adminComponents/AdminDashboard";
import AdminLayout from "../../components/adminComponents/adminBars/AdminLayout";

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

export default AdminDashboardPage;