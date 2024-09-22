import React, { useState } from 'react';

const Navbar : React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-3 w-full h-16">
      <div className="container mx-auto flex items-center justify-between">
        {/* Hamburger Menu (Mobile) */}
        <div className='md:hidden'>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        
        {/* Logo */}
        <img
            className='h-11'
            src='../../src/assets/logo/LogoDark.png'
            alt='Logo'
        />

        

        {/* Menu Links */}
        <div
          className={`md:flex items-center md:space-x-4 space-y-2 md:space-y-0 absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 z-10 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="/" className="block text-white px-4 py-2 md:inline">
            Home
          </a>
          <a href="#" className="block text-white px-4 py-2 md:inline">
            Courses
          </a>
          <a href="#" className="block text-white px-4 py-2 md:inline">
            Services
          </a>
          <a href="#" className="block text-white px-4 py-2 md:inline">
            Contact
          </a>
        </div>

        {/* Profile Icon */}
        <div className="hidden md:block ">
          <img
            className="h-8 w-8 rounded-full"
            src="https://via.placeholder.com/40"
            alt="Profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;