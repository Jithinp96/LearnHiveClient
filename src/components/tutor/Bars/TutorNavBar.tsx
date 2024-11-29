import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../redux/store';
import { logoutTutor } from '../../../redux/slices/tutorSlice';
import { logoutTutorAPI } from '../../../api/tutorAPI/tutorAxios';

const TutorNavbar : React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isTutorAuthenticated, tutorInfo } = useSelector((state: RootState) => state.tutor);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    
    const response = await logoutTutorAPI()
    console.log(response);
    
    dispatch(logoutTutor());
    navigate('/tutor/auth');
  };

  return (
    <nav className="bg-black p-3 w-full h-16">
      <div className="container mx-auto flex items-center justify-between">
        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Logo */}
        <img className="h-11" src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/LogoDark.png" alt="Logo" />

        {/* Menu Links */}
        <div
          className={`md:flex items-center md:space-x-4 space-y-2 md:space-y-0 absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 z-10 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="/tutor/dashboard" className="block text-white px-4 py-2 md:inline">
            Home
          </a>
          <a href="/tutor/course-list" className="block text-white px-4 py-2 md:inline">
            Courses
          </a>
          <a href="/tutor/appointment" className="block text-white px-4 py-2 md:inline">
            Appointments
          </a>
          <a href="/tutor/assessment" className="block text-white px-4 py-2 md:inline">
            Assessments
          </a>
          <a href="/chat" className="block text-white px-4 py-2 md:inline">
            Messages
          </a>
        </div>

        {/* Profile Icon with Dropdown */}
        {isTutorAuthenticated && tutorInfo && (
          <div className="relative hidden md:block">
            <img
              onClick={handleDropdownToggle}
              className="h-8 w-8 rounded-full cursor-pointer"
              src="https://via.placeholder.com/40"
              alt="Profile"
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => navigate('/tutor/profile')}
                  >
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TutorNavbar;