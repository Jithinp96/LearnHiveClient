import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logoutStudent } from '../../../redux/slices/studentSlice';
import { logoutStudentAPI } from '../../../api/studentAPI/studentAPI';
import { ShoppingCart, Library, Home, BookOpen, Video, BookCheck, MessageCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isStudentAuthenticated, studentInfo } = useSelector((state: RootState) => state.student);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const response = await logoutStudentAPI('student')
    console.log(response);
    
    dispatch(logoutStudent());
    navigate('/auth');
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
          className={`md:flex items-center md:space-x-4 space-y-2 md:space-y-0 absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 z-20 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="/" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a href="/allcourses" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </a>
          <a href="/room" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
            <Video className="h-5 w-5" />
            <span>Video Call</span>
          </a>
          <a href="/chat" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Messages</span>
          </a>
          {isStudentAuthenticated && studentInfo && (
            <>
              <a href="/mycourses" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
                <Library className="h-5 w-5" />
                <span>Your Courses</span>
              </a>
              <a href="/assessment-list" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
                <BookCheck className="h-5 w-5" />
                <span>Assessments</span>
              </a>
            </>
          )}
        </div>

        {/* Icons and Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Cart and Library Icons (Only shown when authenticated) */}
          {isStudentAuthenticated && studentInfo && (
            <>
              <button 
                onClick={() => navigate('/cart')} 
                className="text-white hover:text-gray-300 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Profile Icon with Dropdown */}
          {isStudentAuthenticated && studentInfo && (
            <div className="relative hidden md:block">
              <img
                onClick={handleDropdownToggle}
                className="h-8 w-8 rounded-full cursor-pointer"
                src={studentInfo.profileImage}
                alt="Profile Picture"
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
                      onClick={() => navigate('/course-orders')}
                    >
                      Your Orders
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
                      onClick={() => navigate('/slot-orders')}
                    >
                      Your Appointments
                    </li>
                    <li 
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2" 
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;