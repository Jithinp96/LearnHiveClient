import React from 'react';
import { Users, Conversation } from './ChatUI';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  users: Users[];
  selectedConversation: Conversation | null;
  handleSelectConversation: (user: Users) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  users, 
  selectedConversation, 
  handleSelectConversation 
}) => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="w-80 border-r bg-white flex flex-col h-screen">
      {/* Logo Section */}
      <div className="p-4 flex justify-center items-center border-b">
        <img 
          src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/LogoLight.png" 
          alt="LearnHive Logo" 
          className="h-12 w-auto object-contain"
        />
      </div>
      
      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users.map(user => (
          <div
            key={user._id}
            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
              selectedConversation?._id === user._id ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleSelectConversation(user)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
                <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  {user.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dashboard Navigation - Fixed at Bottom */}
      <div className="border-t p-4">
        <button 
          onClick={goToDashboard} 
          className="w-full flex items-center justify-center space-x-2 
                     py-2 px-4 bg-gray-100 hover:bg-gray-200 
                     rounded-lg transition-colors"
        >
          <Home className="w-5 h-5 text-gray-600" />
          <span className="text-gray-800">Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;