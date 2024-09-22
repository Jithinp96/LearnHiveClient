import React from 'react';
import { LogOut  } from 'lucide-react';

const AdminNavbar: React.FC = () => (
    <header className="flex justify-between items-center p-4 bg-gray-50">
      <h2 className="text-2xl font-semibold">Hello, Admin</h2>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-full">
          <LogOut  size={20} />
        </button>
        <a>Logout</a>
      </div>
    </header>
);

export default AdminNavbar