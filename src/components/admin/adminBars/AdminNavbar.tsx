import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { logoutAdminAPI } from '../../../api/adminAPI/adminAPI';
import { clearAdminToken } from '../../../redux/slices/adminSlice';

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await logoutAdminAPI('admin');
      console.log(response);
      
      dispatch(clearAdminToken());
      navigate('/admin/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }; 

  return (
    <header className="flex justify-between items-center p-4 bg-gray-50">
      <h2 className="text-2xl font-semibold">Hello, Admin</h2>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-full" onClick={handleLogout}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;