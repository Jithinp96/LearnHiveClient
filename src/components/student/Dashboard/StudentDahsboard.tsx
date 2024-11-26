import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardAPI, getStudentCourseProgressAPI } from '@/api/studentAPI/studentAPI';
import { Button } from '@/components/ui/button';
import { ChevronRight, Compass, Rocket, Zap, Star, BookOpen } from 'lucide-react';

interface Course {
    _id: string;
    title: string;
    thumbnailUrl: string;
    price?: number;
    rating?: number;
    description?: string;
    shortDescription?: string;
}

interface CourseProgress {
    _id: string;
    studentId: string;
    courseId: Course;
    completedVideos: string[];
    totalVideos: number;
    progressPercentage: number;
    isCompleted: boolean;
    lastAccessedDate?: string;
    completionStatus: string
}

interface DashboardData {
    newCourses: Course[];
    mostlyPurchased: { count: number, course: Course }[];
    suggestedCourses: Course[];
    topRated: Course[];
}

// Reusable Section Header Component
const SectionHeader: React.FC<{ title: string, icon: React.ComponentType }> = ({ title, icon: Icon }) => (
    <div className="flex items-center justify-center my-12">
        <div className="flex-grow h-0.5 bg-gray-300 mr-6"></div>
        <div className="flex items-center space-x-3">
            <Icon />
            <h2 className="text-2xl font-bold text-gray-800 text-center">{title}</h2>
        </div>
        <div className="flex-grow h-0.5 bg-gray-300 ml-6"></div>
    </div>
);

const StudentDashboard: React.FC = () => {
    const [courses, setCourses] = useState<CourseProgress[]>([]);
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        newCourses: [],
        mostlyPurchased: [],
        suggestedCourses: [],
        topRated: []
    });
    const [activeTab, setActiveTab] = useState<'Not-Started' | 'In-Progress' | 'Completed'>('In-Progress');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dashboardResponse = await getDashboardAPI();
                const courseResponse = await getStudentCourseProgressAPI();
                console.log("courseResponse: ", courseResponse.data);
                
                if(courseResponse.data) {
                    const mappedCourses = courseResponse.data.map((course: any) => ({
                        ...course,
                        completionStatus: course.isCompleted 
                            ? 'Completed' 
                            : (course.progressPercentage > 0 ? 'In-Progress' : 'Not-Started'),
                    }));
                    setCourses(mappedCourses);
                }

                setDashboardData({
                    newCourses: dashboardResponse?.data.newCourses || [],
                    mostlyPurchased: dashboardResponse?.data.topPurchasedCourses || [],
                    suggestedCourses: dashboardResponse?.data.suggestedCourses || [],
                    topRated: dashboardResponse?.data.topRatedCourses || []
                })
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    const filteredCourses = courses.filter(course => course.completionStatus === activeTab);
    console.log("filteredCourses: ", filteredCourses);
    
    const renderCourseSection = (
        title: string, 
        courses: Course[] | { course: Course, count?: number }[], 
        icon: React.ComponentType, 
        // navigateTo: string
    ) => {
        const coursesToRender = courses.map((item: any) => 
            item.course ? item.course : item
        );

        if (coursesToRender.length === 0) {
            return null;
        }

        return (
            <section className="mb-16 animate-fade-in">
                <SectionHeader title={title} icon={icon} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coursesToRender.slice(0, 4).map((course: Course) => (
                        <div 
                            key={course._id} 
                            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all 
                                       hover:scale-105 hover:shadow-xl group relative border border-gray-100"
                        >
                            <div className="relative">
                                <img 
                                    src={course.thumbnailUrl} 
                                    alt={course.title} 
                                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                                />
                                {course.rating && (
                                    <div className="absolute top-3 right-3 bg-yellow-400/90 text-white 
                                                    px-2 py-1 rounded-full flex items-center gap-1 text-sm">
                                        <Star className="w-4 h-4 fill-current" />
                                        {course.rating.toFixed(1)}
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                                    {course.title}
                                </h3>
                                <div className="flex justify-between items-center">
                                    {course.price ? (
                                        <p className="text-emerald-600 font-semibold">
                                            ₹{course.price.toFixed(2)}
                                        </p>
                                    ) : (
                                        <p className="text-blue-600 font-semibold">Free Course</p>
                                    )}
                                    <BookOpen className="w-5 h-5 text-gray-400" />
                                </div>
                                <Button 
                                    onClick={() => navigate(`/course/${course._id}`)}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Explore Course
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* My Courses Section */}
                <section className="mb-16">
                    <SectionHeader title="My Learning Journey" icon={BookOpen} />

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex flex-wrap space-x-2 sm:space-x-4 mb-6 justify-center">
                            {[
                                { id: 'Not-Started', label: 'Not Started' },
                                { id: 'In-Progress', label: 'In Progress' },
                                { id: 'Completed', label: 'Completed' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeTab === tab.id 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    
                        <div className="space-y-4">
                            {filteredCourses.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No courses found in this category
                                </div>
                            ) : (
                                filteredCourses.map(course => (
                                    <div 
                                        key={course._id} 
                                        className="bg-gray-50 rounded-xl shadow-md p-5 flex items-center space-x-4 
                                                    hover:bg-white hover:shadow-lg transition-all group"
                                    >
                                        <img 
                                            src={course.courseId.thumbnailUrl} 
                                            alt={`${course.courseId.title} thumbnail`} 
                                            className="w-28 h-20 rounded-lg object-cover shadow-md" 
                                        />
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                                {course.courseId.title}
                                            </h3>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                                <div 
                                                    className="bg-emerald-500 h-2.5 rounded-full" 
                                                    style={{ width: `${course.progressPercentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-600 font-medium">
                                                    {course.progressPercentage}% Complete
                                                </p>
                                                {course.lastAccessedDate && (
                                                    <p className="text-xs text-gray-400">
                                                        Last accessed: {new Date(course.lastAccessedDate).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => navigate(`/course-view/${course.courseId._id}`)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md 
                                                       hover:bg-blue-700
                                                       flex items-center group-hover:translate-x-1 
                                                       transform transition-transform"
                                        >
                                            Continue <ChevronRight className="ml-2 w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* Course Sections */}
                {renderCourseSection(
                    'New Courses', 
                    dashboardData.newCourses, 
                    Rocket, 
                    // '/new-courses'
                )}

                {renderCourseSection(
                    'Trending Purchased', 
                    dashboardData.mostlyPurchased, 
                    Zap, 
                    // '/trending-purchased'
                )}

                {renderCourseSection(
                    'Suggested Courses', 
                    dashboardData.suggestedCourses, 
                    Compass, 
                    // '/suggested-courses'
                )}

                {renderCourseSection(
                    'Top Rated Courses', 
                    dashboardData.topRated, 
                    Star, 
                    // '/top-rated-courses'
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;