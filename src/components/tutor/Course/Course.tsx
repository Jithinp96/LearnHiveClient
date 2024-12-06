import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

import { RootState } from '@/redux/store';
import { fetchTutorCoursesAPI } from '@/api/tutorAPI/tutorAxios';
import Loader from "@/components/ui/Loader";

interface Category {
    name: string
}

interface Course {
    _id: string;
    title: string;
    category: Category;
    createdAt: string;
    isBlocked: boolean;
}

const Course: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { tutorInfo } = useSelector((state: RootState) => state.tutor);
    // const navigate = useNavigate();

    if(!tutorInfo) {
        toast.error("Tutor info missing!")
        return
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const fetchedCourses = await fetchTutorCoursesAPI(tutorInfo?._id);
                setCourses(fetchedCourses.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch courses. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [tutorInfo?._id]);

    // const handleEdit = (courseId: string) => {
    //     navigate(`/tutor/edit-course/${courseId}`);
    // };

    const getStatusColor = (status: boolean) => {
        switch (status) {
            case false: return 'bg-green-100 px-2 py-1 rounded-full text-xs font-semibold';
            case true: return 'bg-yellow-100 text-yellow-800';
            default: return '';
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
                    <a href="/tutor/add-course">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Add New Course
                        </button>
                    </a>
                </header>

                <div className="mt-8 bg-white p-6 rounded-lg shadow">
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : courses.length === 0 ? (
                        <p>No courses found. Start by adding a new course!</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="py-2">Course Name</th>
                                    <th>Category</th>
                                    <th>Created On</th>
                                    <th>Status</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course._id} className="border-b border-gray-200">
                                        <td className="py-2 text-blue-600">{course.title}</td>
                                        <td>{course.category.name}</td>
                                        <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                                        <td className={getStatusColor(course.isBlocked)}>
                                            {course.isBlocked ? 'Blocked' : 'Active'}
                                        </td>
                                        {/* <td>
                                            <button 
                                                onClick={() => handleEdit(course._id)}
                                                className="text-blue-600 hover:text-blue-800"
                                                disabled={course.isBlocked}
                                            >Edit</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Course;