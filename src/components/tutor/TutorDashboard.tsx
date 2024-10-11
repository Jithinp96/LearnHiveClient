import React from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { PlayCircle, DollarSign, BarChart2 } from 'lucide-react';

interface Course {
  name: string;
  videos: number;
  price: number;
  sales: number;
  earning: number;
}

const courses: Course[] = [
  { name: "App Design Course", videos: 15, price: 120, sales: 48, earning: 960 },
  { name: "Graphic Design", videos: 10, price: 80, sales: 34, earning: 800 },
  { name: "Design Thinking", videos: 10, price: 110, sales: 25, earning: 850 },
  { name: "Digital Painting", videos: 8, price: 45, sales: 32, earning: 526 },
  { name: "Logo Design", videos: 12, price: 100, sales: 30, earning: 820 },
];

const sellingActivityData = [
  { day: 'Sat', value: 10 },
  { day: 'Sun', value: 5 },
  { day: 'Mon', value: 8 },
  { day: 'Tue', value: 15 },
  { day: 'Wed', value: 20 },
  { day: 'Thu', value: 12 },
  { day: 'Fri', value: 7 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 bg-pink-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
              <div className="flex items-center text-blue-600 mb-2">
                <PlayCircle className="mr-2" />
                <span className="text-sm">Total Courses</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">150</div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-sm">
              <div className="flex items-center text-green-600 mb-2">
                <PlayCircle className="mr-2" />
                <span className="text-sm">Total Video</span>
              </div>
              <div className="text-2xl font-bold text-green-800">972</div>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
              <div className="flex items-center text-yellow-600 mb-2">
                <DollarSign className="mr-2" />
                <span className="text-sm">Total Earning</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800">$45,000</div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow-sm">
              <div className="flex items-center text-red-600 mb-2">
                <BarChart2 className="mr-2" />
                <span className="text-sm">Engagement Rate</span>
              </div>
              <div className="text-2xl font-bold text-red-800">85.2%</div>
            </div>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-purple-800">Selling Activity</h3>
              <select className="bg-purple-200 rounded px-2 py-1 text-purple-800">
                <option>Last Week</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sellingActivityData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg p-2 sm:p-4 shadow-sm">
          <h1 className='text-lg font-bold text-emerald-600 text-center pb-4'>Trending Courses</h1>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-4">Course Name</th>
                  <th className="pb-4">Video</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Sales</th>
                  <th className="pb-4">Earning</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-200 mr-3"></div>
                      <span className="text-sm sm:text-base">{course.name}</span>
                    </td>
                    <td className="py-4 text-sm sm:text-base">{course.videos}</td>
                    <td className="py-4 text-sm sm:text-base">${course.price}</td>
                    <td className="py-4 text-sm sm:text-base">{course.sales}</td>
                    <td className="py-4 text-green-500 text-sm sm:text-base">${course.earning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center">
            <a href='/tutor/course-list'>
                <button className="px-4 py-2 rounded bg-emerald-200 text-emerald-700 hover:bg-emerald-300 transition-colors">
                    View All Courses
                </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;