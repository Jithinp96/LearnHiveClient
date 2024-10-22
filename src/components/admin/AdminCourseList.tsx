import React, { useState, useEffect} from 'react';
import { getCourseList } from '../../api/adminAPI/adminAPI';
import { useNavigate } from 'react-router-dom';

interface Category {
    name: string;
}

interface Course {
    _id: string;
    title: string;
    category: Category;
    price: number;
    isBlocked: boolean;
}

const AdminCourseList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
            const fetchCourses = async () => {
                try {
                    const response = await getCourseList();
                    console.log("Response from api: ", response.data);
                    
                    setCourses(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to load courses');
                    setLoading(false);
                }
            };

            fetchCourses();
        }, []);

        const handleRowClick = (id: string) => {
            navigate(`/admin/course/${id}`)
        }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-gray-50 p-4">
            <h3 className="text-xl font-semibold px-2 pb-4">Course List</h3>
            <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Course Name</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Category</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Price</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {courses.map((course, index) => (
                            <tr key={index} 
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                onClick={() => handleRowClick(course._id)}
                            >
                            <td className="px-4 py-2">{course.title}</td>
                            <td className="px-4 py-2">{course.category.name}</td>
                            <td className="px-4 py-2">{course.price}</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                    ${ 
                                        course.isBlocked === false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                                        {course.isBlocked ? 'Blocked' : 'Active'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCourseList;