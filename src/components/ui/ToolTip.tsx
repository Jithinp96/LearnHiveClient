import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    return (
      <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
            <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500 cursor-help" />
            </div>
            {isVisible && (
                <div className="absolute z-10 w-64 px-4 py-2 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg -top-2 left-full ml-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Tooltip