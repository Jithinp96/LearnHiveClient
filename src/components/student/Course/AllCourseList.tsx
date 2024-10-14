import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fetchAllCoursesAPI } from '@/api/studentAPI/studentAPI';

interface Category {
    _id: string;
    name: string;
}

interface Course {
    _id: string;
    title: string;
    category: Category;
    level: string;
    duration: number;
    rating: number;
    reviews: { rating: number }[];
    price: number;
    thumbnailUrl: string;
}

const AllCourseList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetchAllCoursesAPI();
                console.log(response?.data);
                
                setCourses(response?.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleViewCourse = (courseId: string) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Section */}
                <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block fixed lg:static inset-0 bg-white lg:bg-transparent z-50 overflow-y-auto`}>
                    <div className="p-4 lg:p-0">
                        <Button onClick={toggleFilter} className="lg:hidden absolute top-4 right-4">
                            <X size={24} />
                        </Button>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Category</h2>
                            <ul className="space-y-2">
                                {courses.map((course) => (
                                    <li key={course.category._id} className="flex items-center">
                                        <input type="checkbox" id={course.category._id} className="mr-2" />
                                        <label htmlFor={course.category.name}>{course.category.name}</label>
                                    </li>
                                ))}
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-4">Level</h2>
                            <ul className="space-y-2">
                                {courses.map((course) => (
                                    <li key={course.level} className="flex items-center">
                                        <input type="checkbox" id={course.level} className="mr-2" />
                                        <label htmlFor={course.level}>{course.level}</label>
                                    </li>
                                ))}
                            </ul>

                            {/* <h2 className="text-xl font-semibold mt-6 mb-4">Price</h2>
                            <ul className="space-y-2">
                                {courses.map((course) => (
                                    <li key={course.price} className="flex items-center">
                                        <input type="checkbox" id={course.price} className="mr-2" />
                                        <label htmlFor={course.price}>{course.price}</label>
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold">Courses</h1>
                        <Button onClick={toggleFilter} className="lg:hidden">
                            <Menu size={24} />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course._id} className="border rounded-lg overflow-hidden flex flex-col">
                                <img src={course.thumbnailUrl} alt={course.title} className="w-full h-48 object-cover" />
                                <div className="p-4 flex-grow">
                                    <span className="text-xs font-semibold text-gray-500">{course.category.name}</span>
                                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                        <span className="mr-4">{course.level}</span>
                                        <Clock size={16} className="mr-1" />
                                        <span>{course.duration} Hours</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Star size={16} className="text-yellow-500 mr-1" />
                                        <span>{course.rating || 'No rating yet'} ({course.reviews.length} reviews)</span>
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-center bg-gray-100">
                                    <span className="font-bold text-xl">
                                        ₹{course.price.toFixed(2)}
                                    </span>
                                    <Button 
                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleViewCourse(course._id)}
                                    >
                                        View Course
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCourseList;