import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourseOrderDetailsAPI, getDashboardAPI } from '@/api/studentAPI/studentAPI';
import { Button } from '@/components/ui/button';
import SkillCard from './SkillCard';
import CourseCard, { Course } from './CourseCard';

interface Skill {
    name: string;
}

const StudentDashboard: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [activeTab, setActiveTab] = useState<'Not-Started' | 'In-Progress' | 'Completed'>('In-Progress');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch skills
                const dashboardResponse = await getDashboardAPI();
                setSkills(dashboardResponse?.data.categories || []);

                // Fetch courses
                const courseResponse = await getCourseOrderDetailsAPI();
                setCourses(courseResponse || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    const filteredCourses = courses.filter(course => course.completionStatus === activeTab);
    const displayedSkills = skills.slice(0, 4);
    const displayedCourses = filteredCourses.slice(0, 5);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-grow p-8">
                {/* Skills Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Skills</h2>
                    {skills.length > 4 && (
                        <Button 
                            onClick={() => navigate('/skills')} 
                            variant="outline"
                            className="text-sm"
                        >
                            View All Skills
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {displayedSkills.map((skill) => (
                        <SkillCard key={skill.name} {...skill} />
                    ))}
                </div>

                {/* Courses Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Courses</h2>
                    {filteredCourses.length > 5 && (
                        <Button 
                            onClick={() => navigate('/courses')} 
                            variant="outline"
                            className="text-sm"
                        >
                            View All Courses
                        </Button>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex space-x-4 mb-4">
                        {[
                            { id: 'Not-Started', label: 'Not Started' },
                            { id: 'In-Progress', label: 'In Progress' },
                            { id: 'Completed', label: 'Completed' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`px-4 py-2 rounded ${
                                    activeTab === tab.id 
                                        ? 'bg-purple-600 text-white' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="space-y-4">
                        {displayedCourses.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No courses found in this category
                            </div>
                        ) : (
                            displayedCourses.map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;