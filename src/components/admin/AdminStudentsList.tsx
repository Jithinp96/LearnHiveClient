import React, { useState, useEffect} from 'react';
import { getStudentsListAPI } from '../../api/adminAPI/adminAPI';
import { useNavigate } from 'react-router-dom';

interface Student {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    isBlocked: boolean;
}

const AdminStudentsList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
            const fetchStudents = async () => {
                try {
                    const response = await getStudentsListAPI();
                    setStudents(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to load students');
                    setLoading(false);
                }
            };

            fetchStudents();
        }, []);

        const handleRowClick = (id: string) => {
            navigate(`/admin/student/${id}`)
        }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-gray-50 p-4">
            <h3 className="text-xl font-semibold px-2 pb-4">Students List</h3>
            <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Student Name</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Mobile Number</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {students.map((student, index) => (
                            <tr key={index} 
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                onClick={() => handleRowClick(student._id)}
                            >
                            <td className="px-4 py-2">{student.name}</td>
                            <td className="px-4 py-2">{student.email}</td>
                            <td className="px-4 py-2">{student.mobile}</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                    ${ 
                                        student.isBlocked === false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                                        {student.isBlocked ? 'Blocked' : 'Active'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminStudentsList;