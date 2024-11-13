import React from 'react';
import { Search } from 'lucide-react';
import { Users, Conversation } from './ChatUI';

interface SidebarProps {
  users: Users[];
  selectedConversation: Conversation | null;
  handleSelectConversation: (user: Users) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, selectedConversation, handleSelectConversation }) => {
  return (
    <div className="w-80 border-r bg-white">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-80px)]">
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
                <p className="text-sm text-gray-500 truncate">
                  {/* {conversation.messages[conversation.messages.length - 1]?.text || 'No messages'} */}
                </p>
              </div>
              <span className="text-xs text-gray-400">
                {/* {formatDate(conversation.updatedAt)} */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;