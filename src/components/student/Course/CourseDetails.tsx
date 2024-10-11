import React from 'react';
import { Star, User, Clock, Video, Users } from 'lucide-react';

const CourseDetail: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-gray-600">HOME</a>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <a href="#" className="text-gray-600">COURSES</a>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500">COURSE DETAIL</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Java Programming and Software Engineering</h1>
            <p className="text-gray-600 mb-4">Fermentum iaculis eu non diam phasellus vestibulum. Porta non pulvinar neque laoreet suspendisse. Justo nec ultrices dui sapien proin sed libero</p>
            <p className="text-gray-600 mb-8">At consectetur lorem donec massa sapien. Pulvinar sapien et ligula ullamcorper malesuada proin</p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Content</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section 1. Programming Foundations with JavaScript, HTML and CSS</h3>

            <div className="bg-white rounded-lg shadow-sm mb-8">
              {['Course Overview', 'Using CodePen. Formatting Text and Nesting Tags', 'Adding Images and Links. Images and Storage', 'CSS Basics. Colors and Names in CSS'].map((lesson, index) => (
                <div key={index} className="border-b last:border-b-0 p-4 flex justify-between items-center">
                  <span className="text-gray-800">Lesson {index + 1}. {lesson}</span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section 2. Algorithms and Programming Concepts</h3>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <img src="/api/placeholder/600/400" alt="Course thumbnail" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1 text-yellow-400">4.9 (2 reviews)</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-4">FREE</div>
                <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300">
                  Get Courses
                </button>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">Created</span>
                    <span className="ml-auto font-medium">Wendy Chandler</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">Level</span>
                    <span className="ml-auto font-medium">Beginner</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">Duration</span>
                    <span className="ml-auto font-medium">120 Hours</span>
                  </div>
                  <div className="flex items-center">
                    <Video className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">Lessons</span>
                    <span className="ml-auto font-medium">3 Video</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">Webinar</span>
                    <span className="ml-auto font-medium">4 Hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get More Benefits with Our Plans</h3>
              <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-300 mb-4">
                Our Plans
              </button>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300">
                See Whole Course
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Courses</h3>
              {/* Add other courses here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;