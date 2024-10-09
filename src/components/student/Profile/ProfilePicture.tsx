import React from 'react';

interface ProfilePictureProps {
  profileImage: string;
  name: string;
  isBlocked: boolean;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ profileImage, name, isBlocked }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-1">
      <h2 className="text-xl font-bold mb-4">My profile</h2>
      <div className="mb-4 flex justify-center items-center">
        <img src={profileImage} alt="Profile" className="w-44 h-44 rounded-lg" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className='font-bold text-3xl'>{name}</span>
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