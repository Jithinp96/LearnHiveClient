import React, { useState } from 'react';
import { UserPen, Check, X } from 'lucide-react';

interface PersonalDetailsProps {
  email: string;
  mobile: number;
  isVerified: boolean;
  createdAt: string;
  onMobileUpdate: (newMobile: number) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ 
  email, 
  mobile, 
  createdAt, 
  isVerified, 
  onMobileUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMobile, setEditedMobile] = useState(mobile);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMobile(mobile);
  };

  const handleSave = () => {
    onMobileUpdate(editedMobile);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Personal Details</h2>
        {!isEditing && (
          <div className="flex space-x-2 cursor-pointer" onClick={handleEdit}>
            <UserPen className="w-5 h-5 text-gray-400" />
            <span className="text-blue-500">Edit</span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <p className="text-gray-600">
          <span className='text-gray-800 font-semibold'>Email:</span> {email}
        </p>
        <div className="flex items-center">
          <span className='text-gray-800 font-semibold mr-2'>Mobile Number:</span>
          {isEditing ? (
            <input
              type="number"
              value={editedMobile}
              onChange={(e) => setEditedMobile(Number(e.target.value))}
              className="border rounded px-2 py-1 flex-grow"
            />
          ) : (
            <span className="text-gray-600">{mobile}</span>
          )}
          {isEditing && (
            <div className="ml-2 flex space-x-2">
              <Check 
                className="w-5 h-5 text-green-500 cursor-pointer" 
                onClick={handleSave}
              />
              <X 
                className="w-5 h-5 text-red-500 cursor-pointer" 
                onClick={handleCancel}
              />
            </div>
          )}
        </div>
        <p className="text-gray-600">
          <span className='text-gray-800 font-semibold'>Created On:</span> {createdAt}
        </p>
        <p className="text-gray-600">
          {isVerified ? (
            <span className='text-green-600 font-bold'>Verified Account</span>
          ) : (
            <span className='text-red-600 font-bold'>Non Verified Account</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PersonalDetails;