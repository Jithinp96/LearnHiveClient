import React, { useState } from 'react';
import { Clock, Star, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
    id: number;
    title: string;
    category: string;
    level: string;
    duration: number;
    rating: number;
    reviews: number;
    price: number;
    image: string;
}

const courses: Course[] = [
    {
        id: 1,
        title: 'Marketing Channel Strategy & B2B2C Routes to Market',
        category: 'MARKETING',
        level: 'Beginner',
        duration: 120,
        rating: 3.5,
        reviews: 3,
        price: 19.99,
        image: '/api/placeholder/400/300'
    },
    {
        id: 2,
        title: 'Programming Foundations: JavaScript, HTML and CSS',
        category: 'PROGRAMMING',
        level: 'Beginner',
        duration: 120,
        rating: 3.5,
        reviews: 3,
        price: 14.99,
        image: '/api/placeholder/400/300'
    },
    {
        id: 3,
        title: 'Introduction to Computer Science and Programming',
        category: 'COMPUTER SCIENCE',
        level: 'Beginner',
        duration: 120,
        rating: 3.5,
        reviews: 3,
        price: 29.99,
        image: '/api/placeholder/400/300'
    },
    {
        id: 4,
        title: 'Java Programming: Principles of Software Design',
        category: 'BUSINESS',
        level: 'Beginner',
        duration: 120,
        rating: 3.5,
        reviews: 3,
        price: 29.99,
        image: '/api/placeholder/400/300'
    },
    {
        id: 5,
        title: 'Introduction to Computer Science and Programming',
        category: 'PROGRAMMING',
        level: 'Beginner',
        duration: 120,
        rating: 3.5,
        reviews: 3,
        price: 12.29,
        image: '/api/placeholder/400/300'
    },
    {
        id: 6,
        title: 'Foundations of User Experience (UX) Design',
        category: 'DESIGN',
        level: 'Beginner',
        duration: 120,
        rating: 3.5,
        reviews: 3,
        price: 15.89,
        image: '/api/placeholder/400/300'
    },
];

const categories = ['Programming', 'Marketing', 'Design', 'Development', 'Business', 'IT & Software', 'Engineering', 'Computer Science'];
const levels = ['All Course', 'Beginner', 'Intermediate', 'Expert'];
const prices = ['All', 'Free', 'Paid'];

const AllCourseList: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
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
                                    <li key={category} className="flex items-center">
                                        <input type="checkbox" id={category} className="mr-2" />
                                        <label htmlFor={category}>{category}</label>
                                    </li>
                                ))}
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-4">Level</h2>
                            <ul className="space-y-2">
                                {levels.map((level) => (
                                    <li key={level} className="flex items-center">
                                        <input type="checkbox" id={level} className="mr-2" />
                                        <label htmlFor={level}>{level}</label>
                                    </li>
                                ))}
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-4">Price</h2>
                            <ul className="space-y-2">
                                {prices.map((price) => (
                                    <li key={price} className="flex items-center">
                                        <input type="checkbox" id={price} className="mr-2" />
                                        <label htmlFor={price}>{price}</label>
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
                    <p className="text-gray-600 mb-6">
                        Egestas sed tempus urna et pharetra. Leo integer malesuada nunc vel.
                        Libero id faucibus nisl tincidunt eget nullam non nisi. Faucibus turpis in
                        eu mi bibendum neque egestas
                    </p>

                    <div className="flex mb-6">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow border border-gray-300 rounded-l-md p-2"
                        />
                        <Button className="bg-gray-800 text-white px-4 py-2 rounded-r-md">
                            Search
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course.id} className="border rounded-lg overflow-hidden flex flex-col">
                                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                                <div className="p-4 flex-grow">
                                    <span className="text-xs font-semibold text-gray-500">{course.category}</span>
                                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                        <span className="mr-4">{course.level}</span>
                                        <Clock size={16} className="mr-1" />
                                        <span>{course.duration} Hours</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Star size={16} className="text-yellow-500 mr-1" />
                                        <span>{course.rating} ({course.reviews} reviews)</span>
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-center bg-gray-100">
                                    <span className="font-bold text-xl">
                                        ${course.price.toFixed(2)}
                                    </span>
                                    <Button className="bg-yellow-500 text-white px-4 py-2 rounded">
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