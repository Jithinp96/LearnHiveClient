import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logoutStudent } from '../../../redux/slices/studentSlice';
import { logoutStudentAPI } from '../../../api/studentAPI/studentAPI';
import { Library, Home, BookOpen, Video, BookCheck, MessageCircle, User, LogOut, ShoppingBag, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

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
    const response = await logoutStudentAPI()
    if(response.status === 200) {
      toast.success(response.data.message)
      dispatch(logoutStudent());
      navigate('/auth');
    } else {
      toast.error("Logout failed. Please try again!")
    }
  };

  const ProfileDropdownItems = () => (
    <div className="bg-white md:border rounded shadow-lg">
      <ul>
        <li
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
          onClick={() => navigate('/profile')}
        >
          <User className="h-4 w-4" /> <span>Profile</span>
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
          onClick={() => navigate('/course-orders')}
        >
          <ShoppingBag className="h-4 w-4" /> <span>Your Orders</span>
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
          onClick={() => navigate('/slot-orders')}
        >
          <Calendar className="h-4 w-4" /> <span>Your Appointments</span>
        </li>
        <li 
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" /> <span>Logout</span>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="bg-black p-3 w-full h-16">
      <div className="container mx-auto flex items-center justify-between">
        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none mr-2">
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

          {/* Mobile Profile Dropdown for Authenticated Users */}
          {isStudentAuthenticated && studentInfo && (
            <div className="relative md:hidden">
              <img
                onClick={handleDropdownToggle}
                className="h-8 w-8 rounded-full cursor-pointer"
                src={studentInfo.profileImage}
                alt="Profile Picture"
              />

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 z-50">
                  <ProfileDropdownItems />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Logo */}
        <img className="h-11" src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/LogoDark.png" alt="Logo" />

        {/* Menu Links */}
        <div
          className={`md:flex items-center md:space-x-4 space-y-2 md:space-y-0 absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 z-20 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {/* Home/Dashboard Link */}
          {isStudentAuthenticated ? (
            <Link to="/dashboard" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          )}

          <Link to="/allcourses" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </Link>
          <Link to="/room" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
            <Video className="h-5 w-5" />
            <span>Video Call</span>
          </Link>
          <Link to="/chat" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          {isStudentAuthenticated && studentInfo && (
            <>
              <Link to="/mycourses" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
                <Library className="h-5 w-5" />
                <span>Your Courses</span>
              </Link>
              <Link to="/assessment-list" className="flex items-center text-white px-4 py-2 hover:text-gray-300 transition-colors space-x-2">
                <BookCheck className="h-5 w-5" />
                <span>Assessments</span>
              </Link>
            </>
          )}

          {/* Mobile Dropdown Items for Authenticated Users */}
          {isStudentAuthenticated && studentInfo && (
            <div className="md:hidden">
              <ProfileDropdownItems />
            </div>
          )}
        </div>

        {/* Desktop Profile Icon with Dropdown */}
        <div className="flex items-center space-x-4">
          {isStudentAuthenticated && studentInfo && (
            <div className="relative hidden md:block">
              <img
                onClick={handleDropdownToggle}
                className="h-8 w-8 rounded-full cursor-pointer"
                src={studentInfo.profileImage}
                alt="Profile Picture"
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 z-50">
                  <ProfileDropdownItems />
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