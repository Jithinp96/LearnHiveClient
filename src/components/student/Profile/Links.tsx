import React from 'react';
import { UserPen } from 'lucide-react';

interface LinksProps {
  email: string;
  mobile: number;
  role: string;
  isVerified: boolean;
}

const Links: React.FC<LinksProps> = ({ email, mobile, role, isVerified }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Links</h2>
        <div className="flex space-x-2">
          <UserPen className="w-5 h-5 text-gray-400" />
          <span className="text-blue-500">Edit</span>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Email:</span> {email}</p>
        <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Mobile Number:</span> {mobile}</p>
        <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Role:</span> {role}</p>
        <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Verified:</span> {isVerified ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default Links;