import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, Menu, X, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchAllCoursesAPI, fetchCategoriesAPI, getCourseOrderDetailsAPI } from '@/api/studentAPI/studentAPI';
import { RootState } from '@/redux/store';

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

const levels = ['Beginner', 'Intermediate', 'Expert'];

const AllCourseList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const navigate = useNavigate();

    const { studentInfo } = useSelector((state: RootState) => state.student);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesResponse, categoriesResponse] = await Promise.all([
                    fetchAllCoursesAPI(),
                    fetchCategoriesAPI()
                ]);
                setCourses(coursesResponse?.data);
                setFilteredCourses(coursesResponse?.data);
                setCategories(categoriesResponse?.data);

                if (studentInfo?._id) {
                    const purchasedResponse = await getCourseOrderDetailsAPI();
                    console.log("purchasedResponse: ", purchasedResponse);
                    
                    setPurchasedCourses(purchasedResponse?.map((order: any) => order.courseId));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category._id);
            const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
            return matchesSearch && matchesCategory && matchesLevel;
        });
        setFilteredCourses(filtered);
    }, [searchTerm, selectedCategories, selectedLevels, courses]);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleViewCourse = (courseId: string) => {
        if (purchasedCourses.includes(courseId)) {
            navigate(`/course-view/${courseId}`);
        } else {
            navigate(`/course/${courseId}`);
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId) 
                ? prev.filter(id => id !== categoryId) 
                : [...prev, categoryId]
        );
    };

    const handleLevelChange = (level: string) => {
        setSelectedLevels(prev => 
            prev.includes(level) 
                ? prev.filter(l => l !== level) 
                : [...prev, level]
        );
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
                                {categories.map((category) => (
                                    <li key={category._id} className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            id={category._id} 
                                            className="mr-2"
                                            checked={selectedCategories.includes(category._id)}
                                            onChange={() => handleCategoryChange(category._id)}
                                        />
                                        <label htmlFor={category._id}>{category.name}</label>
                                    </li>
                                ))}
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-4">Level</h2>
                            <ul className="space-y-2">
                                {levels.map((level) => (
                                    <li key={level} className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            id={level} 
                                            className="mr-2"
                                            checked={selectedLevels.includes(level)}
                                            onChange={() => handleLevelChange(level)}
                                        />
                                        <label htmlFor={level}>{level}</label>
                                    </li>
                                ))}
                            </ul>
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

                    {/* Search Bar */}
                    <div className="mb-6 relative">
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
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
                                        {purchasedCourses.includes(course._id) ? 'Go to Course' : 'View Course'}
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