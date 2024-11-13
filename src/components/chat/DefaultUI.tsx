import React from 'react';

const DefaultUI: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to the Chat</h2>
        <p className="text-gray-500 mt-2">
          Select a user from the sidebar to start a conversation.
        </p>
      </div>
    </div>
  );
};

export default DefaultUI;