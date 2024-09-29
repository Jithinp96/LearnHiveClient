import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Book, Users, SquareUserRound, BookOpenText } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, text: 'Students', path: '/admin/students' },
    { icon: SquareUserRound, text: 'Teachers', path: '/admin/tutors' },
    { icon: Book, text: 'Courses Category', path: '/admin/course-categories' },
    { icon: BookOpenText, text: 'Courses', path: '/admin/courses' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex items-center mb-8">
        <img src="../../src/assets/logo/LogoLight.png" alt="Logo" />
      </div>
      <nav>
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center p-2 rounded-md mb-2 ${
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} className="mr-3" />
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;