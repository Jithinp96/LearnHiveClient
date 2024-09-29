import React, { ReactNode } from 'react';
import AdminSidebar from './AdminSideBar';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;