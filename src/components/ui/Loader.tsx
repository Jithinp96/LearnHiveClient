import React from 'react';

interface LoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loader: React.FC<LoaderProps> = ({
  message = 'Loading...',
  size = 'medium',
}) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-[#FF4B2B]`}
        />
        {message && (
          <p className="mt-3 text-sm text-gray-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Loader;