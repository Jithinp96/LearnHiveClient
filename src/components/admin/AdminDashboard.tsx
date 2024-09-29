import React from 'react'
import { Users, TrendingUp, SquareUserRound } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  chart?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, chart }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-4">
    <div className="flex-grow">
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    {icon && <div className="flex-shrink-0">{icon}</div>}
    {chart && <div className="flex-shrink-0 w-16">{chart}</div>}
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Students Count"
            value="234"
            icon={
              <div className="bg-indigo-100 p-2 rounded-full">
                <Users size={24} className="text-indigo-600" />
              </div>
            }
          />
          <MetricCard
            title="Teachers Count"
            value="321"
            icon={
              <div className="bg-indigo-100 p-2 rounded-full">
                <SquareUserRound size={24} className="text-indigo-600" />
              </div>
            }
          />
          <MetricCard
            title="Course Count"
            value="123"
          />
          <MetricCard
            title="Sales"
            value="$574.34"
            icon={
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;