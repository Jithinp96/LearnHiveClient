import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BadgeCheck, BadgeX, GraduationCap, BookOpenCheck } from 'lucide-react';
import { getStudentDetailsAPI, toggleStudentStatusAPI } from '@/api/adminAPI/adminAPI';
import toast from 'react-hot-toast';

interface EducationDetail {
    level: string;
    board: string;
    startDate: string;
    endDate: string;
    grade: string;
}

interface StudentDetails {
    _id: string;
    studentId: string;
    name: string;
    email: string;
    mobile: number;
    profileImage: string;
    role: string;
    isBlocked: boolean;
    isVerified: boolean;
    education: EducationDetail[];
    createdAt: string;
    updatedAt: string;
}

const AdminStudentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchStudentDetails = async (studentId: string) => {
            try {
                const response = await getStudentDetailsAPI(studentId);
                setStudentDetails(response.data);
                setIsBlocked(response.data.isBlocked);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch student details");
                setLoading(false);
            }
        };

        if (id) {
            fetchStudentDetails(id);
        }
    }, [id]);

    const toggleBlockStatus = async () => {
        if (!studentDetails) return;
        try {
            const response = await toggleStudentStatusAPI(studentDetails._id, !isBlocked);
    
            if (response.status === 200) {
                setIsBlocked((prev) => !prev);
                toast.success("Student status updated successfully!")
            } else {
                toast.error("Failed to update status. Please try again!")
            }
        } catch (error) {
            toast.error("Failed to update status. Please try again!")
            console.error('Error updating block status:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            // month: 'long',
            // day: 'numeric'
        });
    };

    if (loading) return <div className="text-center text-gray-500 p-6">Loading profile...</div>;
    if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
    if (!studentDetails) return <div className="text-center text-gray-500 p-6">No details found</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-white shadow-lg rounded-lg">
            <div className="flex items-center mb-6">
                <h1 className="text-4xl font-bold text-indigo-800 mr-4">
                    {studentDetails.name}
                </h1>
                {studentDetails.isVerified ? (
                    <BadgeCheck className="text-green-500" size={28} />
                ) : (
                    <BadgeX className="text-red-500" size={28} />
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <img 
                            src={studentDetails.profileImage} 
                            alt={`${studentDetails.name}'s profile`} 
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <GraduationCap className="mr-2 text-indigo-600" />
                            <span className="font-semibold text-indigo-800">Student ID</span>
                        </div>
                        <p className="text-gray-600">{studentDetails.studentId}</p>
                    </div>
                </div>
            
                <div className="md:w-2/3 space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 gap-4">
                        <div>
                            <span className="block text-indigo-800 font-semibold mb-1">Email</span>
                            <p className="text-gray-700">{studentDetails.email}</p>
                        </div>
                        <div>
                            <span className="block text-indigo-800 font-semibold mb-1">Mobile</span>
                            <p className="text-gray-700">{studentDetails.mobile}</p>
                        </div>
                        <div>
                            <span className="block text-indigo-800 font-semibold mb-1">Role</span>
                            <p className="text-gray-700 uppercase">{studentDetails.role}</p>
                        </div>
                        <div>
                            <span className="block text-indigo-800 font-semibold mb-1">Status</span>
                            <button
                                onClick={toggleBlockStatus}
                                className={`px-3 py-1 rounded ${isBlocked ? 'bg-red-500' : 'bg-green-500'} text-white`}
                            >
                                {isBlocked ? 'Blocked' : 'Active'}
                            </button>
                        </div>
                        <div>
                            <span className="block text-indigo-800 font-semibold mb-1">Account Created</span>
                            <p className="text-gray-700">{formatDate(studentDetails.createdAt)}</p>
                        </div>
                        <div>
                            <span className="block text-indigo-800 font-semibold mb-1">Last Updated</span>
                            <p className="text-gray-700">{formatDate(studentDetails.updatedAt)}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
                            <BookOpenCheck className="mr-2" /> Education History
                        </h2>
                        {studentDetails.education.map((edu, index) => (
                            <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-indigo-700">{edu.level}</h3>
                                    <span className="text-gray-500 text-sm">
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </span>
                                </div>
                                <p className="text-gray-600">{edu.board}</p>
                                <p className="text-gray-600">Grade: {edu.grade}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStudentDetails;