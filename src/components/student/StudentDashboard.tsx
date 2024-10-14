import React, { useEffect, useState } from 'react'
import { getDashboardAPI } from '@/api/studentAPI/studentAPI';

interface Skill {
    name: string;
  }
  
const courses = [
    { name: 'HTML', progress: 80, icon: '5', color: 'bg-green-600' },
    { name: 'CSS', progress: 80, icon: '3', color: 'bg-green-500' },
    { name: 'JavaScript', progress: 80, icon: 'JS', color: 'bg-blue-500' },
];

const SkillCard = ({ name }: { name: string }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      {/* <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Get Started
      </button> */}
    </div>
  );
  
const CourseCard = ({ name, progress, icon, color }: { name: string; progress: number; icon: string; color: string }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <div className={`w-12 h-12 ${color} flex items-center justify-center text-white font-bold text-xl rounded mr-4`}>
            {icon}
        </div>
        <div className="flex-grow">
            <h3 className="text-lg font-bold mb-1">{name}</h3>
            <div className="flex items-center">
                <div className="flex-grow bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-sm text-gray-600">{progress}% - Progress</span>
            </div>
        </div>
      <button className="bg-black text-white px-4 py-1 rounded text-sm">continue</button>
    </div>
);

const StudentDashboard : React.FC = () => {

    const [skills, setSkills] = useState<Skill[]>([]);
  
    // Fetch categories from the backend
    useEffect(() => {
        const fetchSkills = async () => {
        try {
            const response = await getDashboardAPI()
            setSkills(response?.data.categories);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
        };

        fetchSkills();
    }, []);

    return(
        <>
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-grow p-8">
                    <h2 className="text-2xl font-bold mb-6">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {skills.map((skill) => (
                        <SkillCard key={skill.name} {...skill} />
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mb-6">My Courses</h2>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <div className="flex space-x-4 mb-4">
                            {['In Progress', 'Explore', 'Incoming', 'Finished'].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 rounded ${
                                tab === 'In Progress' ? 'bg-purple-600 text-white' : 'text-gray-600'
                                }`}
                            >
                                {tab}
                            </button>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {courses.map((course) => (
                            <CourseCard key={course.name} {...course} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentDashboard;