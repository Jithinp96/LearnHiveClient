import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { getCourseOrderDetailsAPI } from '@/api/studentAPI/studentAPI';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';

interface Course {
    _id: string;
    title: string;
    category: {
        _id: string;
        name: string;
    };
    level: string;
    duration: number;
    rating: number;
    reviews: { rating: number }[];
    thumbnailUrl: string;
}

interface PurchasedCourse {
    _id: string;
    courseId: Course;
    orderId?: string;
    progress?: number;
    paymentId?: string;
    purchaseAmount?: number;
}

const PurchasedCourses: React.FC = () => {
    const [courses, setCourses] = useState<PurchasedCourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCourses: 0
    });
    const navigate = useNavigate();

    const { studentInfo } = useSelector((state: RootState) => state.student);

    const fetchPurchasedCourses = async (page = 1) => {
        try {
            if (studentInfo?._id) {
                setIsLoading(true);
                const response = await getCourseOrderDetailsAPI(page);
                setCourses(response.courseOrders);
                setPagination({
                    currentPage: response.currentPage,
                    totalPages: response.totalPages,
                    totalCourses: response.totalOrders
                });
            }
        } catch (error) {
            toast.error("Error fetching purchased courses. Please try again!")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchasedCourses();
    }, [studentInfo]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            fetchPurchasedCourses(newPage);
        }
    };

    const handleContinueLearning = (courseId: string) => {
        navigate(`/course-view/${courseId}`);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
                <div className="text-xl">Loading your courses...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-6">My Courses</h1>

                {courses.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-600">No courses purchased yet</h2>
                        <p className="text-gray-500 mt-2">Browse our course catalog to start learning</p>
                        <Button 
                            onClick={() => navigate('/courses')}
                            className="mt-4"
                        >
                            Browse Courses
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {courses.map((course) => (
                                <div key={course._id} className="border rounded-lg overflow-hidden flex flex-col">
                                    <img 
                                        src={course.courseId.thumbnailUrl} 
                                        alt={course.courseId.title} 
                                        className="w-full h-48 object-cover" 
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/placeholder-course-image.jpg';
                                        }}
                                    />
                                    <div className="p-4 flex-grow">
                                        <span className="text-xs font-semibold text-gray-500">{course.courseId.category.name}</span>
                                        <h2 className="text-xl font-semibold mb-2">{course.courseId.title}</h2>
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <span className="mr-4">{course.courseId.level}</span>
                                            <Clock size={16} className="mr-1" />
                                            <span>{course.courseId.duration} Hours</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Star size={16} className="text-yellow-500 mr-1" />
                                            <span>{course.courseId.rating || 'No rating yet'} ({course.courseId.reviews.length} reviews)</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-100">
                                        <Button
                                            className="w-full bg-blue-600 text-white"
                                            onClick={() => handleContinueLearning(course.courseId._id)}
                                        >
                                            Continue Learning
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center mt-4 space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm text-gray-500">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PurchasedCourses;