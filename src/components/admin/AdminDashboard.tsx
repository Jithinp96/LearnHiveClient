import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, SquareUserRound, BookOpen, Trophy, IndianRupee, BookOpenCheck, Group } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboardAPI } from '@/api/adminAPI/adminAPI';

interface DashboardStats {
  totalStudents: number;
  totalTutors: number;
  totalCourseRevenue: number;
  totalSlotRevenue: number;
  topCourses: Array<{
    _id: string;
    title: string;
    count: number;
    revenue: number;
  }>;
  topCategories: Array<{
    _id: string;
    name: string;
    count: number;
    revenue: number;
  }>;
  topTutors: Array<{
    _id: string;
    name: string;
    earnings: number;
    studentsCount: number;
  }>;
}

const MetricCard = ({ title, value, icon, trend, color }: { 
  title: string; 
  value: string | number; 
  icon?: React.ReactNode;
  trend?: number;
  color: string;
}) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className={`p-6 ${color}`}>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight mt-2">{value}</h3>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-sm">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const TopItemsList = ({ title, items, icon, emptyMessage }: { 
  title: string; 
  items: Array<{ name: string; value: number }>; 
  icon: React.ReactNode;
  emptyMessage: string;
}) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-bold">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      {items.length > 0 ? (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <span className="text-sm font-bold text-blue-700">#{index + 1}</span>
              </div>
              <div className="ml-4 space-y-1 flex-1">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'INR'
                  })}
                </p>
              </div>
              <Trophy className={`h-5 w-5 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-600'}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">{emptyMessage}</div>
      )}
    </CardContent>
  </Card>
);

const RevenueChart = ({ courseData, slotData }: { courseData: number; slotData: number }) => {
  const chartData = [
    { name: 'Course Revenue', value: courseData },
    { name: 'Slot Revenue', value: slotData }
  ];

  return (
    <Card className="col-span-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Bar dataKey="value" fill="#93c5fd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await getDashboardAPI();
        if (response?.data) {
          setStats(response.data);
        } else {
          setError('No data received from server');
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">{error || 'Error loading dashboard data'}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <MetricCard
          title="Total Tutors"
          value={stats.totalTutors}
          icon={<SquareUserRound className="h-6 w-6 text-green-600" />}
          color="bg-green-50"
        />
        <MetricCard
          title="Course Revenue"
          value={stats.totalCourseRevenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR'
          })}
          icon={<BookOpen className="h-6 w-6 text-purple-600" />}
          color="bg-purple-50"
        />
        <MetricCard
          title="Slot Revenue"
          value={stats.totalSlotRevenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR'
          })}
          icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      <RevenueChart 
        courseData={stats.totalCourseRevenue}
        slotData={stats.totalSlotRevenue}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TopItemsList
          title="Top Selling Courses"
          items={stats.topCourses.map(course => ({
            name: course.title,
            value: course.revenue
          }))}
          icon={<BookOpenCheck className="h-6 w-6 text-blue-600" />}
          emptyMessage="No courses data available"
        />
        <TopItemsList
          title="Top Categories"
          items={stats.topCategories.map(category => ({
            name: category.name,
            value: category.revenue
          }))}
          icon={<Group className="h-6 w-6 text-purple-600" />}
          emptyMessage="No categories data available"
        />
        <TopItemsList
          title="Top Tutors by Earnings"
          items={stats.topTutors.map(tutor => ({
            name: tutor.name,
            value: tutor.earnings
          }))}
          icon={<IndianRupee className="h-6 w-6 text-green-600" />}
          emptyMessage="No tutors data available"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;