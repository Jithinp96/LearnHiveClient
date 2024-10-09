import React from 'react';
import { UserPen } from 'lucide-react';

interface PersonalDetailsProps {
  email: string;
  mobile: number;
  isVerified: boolean;
  createdAt: string
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ email, mobile, createdAt,isVerified }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Personal Details</h2>
        <div className="flex space-x-2">
          <UserPen className="w-5 h-5 text-gray-400" />
          <span className="text-blue-500">Edit</span>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Email:</span> {email}</p>
        <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Mobile Number:</span> {mobile}</p>
        <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Created On:</span> {createdAt}</p>
        <p className="text-gray-600">{isVerified ? <span className='text-green-600 font-bold'>Verified Account</span> : <span className='text-red-600 font-bold'>Non Verified Account</span>}</p>
      </div>
    </div>
  );
};

export default PersonalDetails;