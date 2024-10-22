import React, { useState, useRef } from 'react';
import { Edit2, Camera, Check, X } from 'lucide-react';

interface ProfilePictureProps {
  profileImage: string;
  name: string;
  isBlocked: boolean;
  onNameUpdate: (newName: string) => void;
  onImageUpdate: (newImage: File) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  profileImage, 
  name, 
  isBlocked, 
  onNameUpdate,
  onImageUpdate
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    onNameUpdate(editedName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditedName(name);
    setIsEditingName(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpdate(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-1">
      <h2 className="text-xl font-bold mb-4">My profile</h2>
      <div className="mb-4 flex justify-center items-center relative">
        <img src={profileImage} alt="Profile" className="w-44 h-44 rounded-lg" />
        <div 
          className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer"
          onClick={handleImageClick}
        >
          <Camera className="w-5 h-5 text-white" />
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        {isEditingName ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="font-bold text-3xl border-b-2 border-blue-500 focus:outline-none"
            />
            <div className="ml-2 flex space-x-2">
              <Check 
                className="w-6 h-6 text-green-500 cursor-pointer" 
                onClick={handleNameSave}
              />
              <X 
                className="w-6 h-6 text-red-500 cursor-pointer" 
                onClick={handleNameCancel}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <span className='font-bold text-3xl'>{name}</span>
            <Edit2 
              className="w-5 h-5 ml-2 text-gray-400 cursor-pointer" 
              onClick={handleNameEdit}
            />
          </div>
        )}
        <div 
          className={`w-auto h-6 rounded-full text-white px-2 ${
            isBlocked ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {isBlocked ? 'Blocked' : 'Active'}
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;