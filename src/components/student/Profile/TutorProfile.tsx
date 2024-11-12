import React, { useEffect, useState } from 'react';
import { BookOpen, CalendarClock, MessageCircle } from 'lucide-react'; // Import the chat icon
import { useParams, Link } from 'react-router-dom';
import { getTutorDetailsForStudentAPI } from '@/api/studentAPI/studentAPI';
import { Button } from '@/components/ui/button';

interface TutorSubject {
    name: string;
    level: string;
    _id?: string;
}

interface TutorEducation {
    level: string;
    board: string;
    startDate: string;
    endDate: string;
    grade: string;
    institution: string;
    _id?: string;
}

interface TutorDetails {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    role: string;
    isBlocked: boolean;
    profileImage: string;
    isVerified: boolean;
    createdAt: string;
    subjects?: TutorSubject[];
    education?: TutorEducation[];
}

const TutorProfileView: React.FC = () => {
    const [tutorDetails, setTutorDetails] = useState<TutorDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { tutorId } = useParams();

    useEffect(() => {
        const fetchTutorDetails = async () => {
            if (!tutorId) return;
            
            try {
                setLoading(true);
                const response = await getTutorDetailsForStudentAPI(tutorId);
                setTutorDetails(response?.data);
            } catch (error) {
                setError("Failed to fetch tutor details");
            } finally {
                setLoading(false);
            }
        };

        fetchTutorDetails();
    }, [tutorId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl">Loading tutor details...</div>
            </div>
        );
    }

    if (error || !tutorDetails) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl text-red-500">{error || 'No tutor details found'}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6 lg:px-6">
            <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
                {/* Left Column - Profile Information */}
                <div className="w-full lg:w-1/3 space-y-4">
                    {/* Profile Picture Section */}
                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Tutor Profile</h2>
                        <div className="mb-4 flex justify-center">
                            <img 
                                src={tutorDetails.profileImage} 
                                alt="Profile" 
                                className="w-32 h-32 sm:w-44 sm:h-44 rounded-lg object-cover"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
                            <span className='font-bold text-2xl sm:text-3xl text-center sm:text-left'>{tutorDetails.name}</span>
                            <div className={`px-3 py-1 rounded-full text-white text-sm ${
                                tutorDetails.isBlocked ? 'bg-red-500' : 'bg-green-500'
                            }`}>
                                {tutorDetails.isBlocked ? 'Blocked' : 'Active'}
                            </div>
                        </div>
                    </div>

                    {/* Chat and Book Slot Buttons */}
                    <div className="flex gap-2">
                        <Link to={`/slotbooking/${tutorId}`} className="block w-1/2">
                            <Button className="w-full flex items-center justify-center">
                                <CalendarClock className="w-4 h-4 mr-2" /> Book My Slot
                            </Button>
                        </Link>
                        <Link to={`/chat/Tutor/${tutorId}`} className="block w-1/2">
                            <Button className="w-full flex items-center justify-center">
                                <MessageCircle className="w-4 h-4 mr-2" /> Chat with Me
                            </Button>
                        </Link>
                    </div>

                    {/* Personal Details Section */}
                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Personal Details</h2>
                        <div className="space-y-4">
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className='text-gray-800 font-semibold'>Email:</span> {tutorDetails.email}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className='text-gray-800 font-semibold'>Mobile Number:</span> {tutorDetails.mobile}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className='text-gray-800 font-semibold'>Member Since:</span> {tutorDetails.createdAt}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                                {tutorDetails.isVerified ? (
                                    <span className='text-green-600 font-bold'>Verified Tutor</span>
                                ) : (
                                    <span className='text-red-600 font-bold'>Non Verified Tutor</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Education and Subjects */}
                <div className="w-full lg:w-2/3 space-y-6">
                    {/* Education Section */}
                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Education</h2>
                        {tutorDetails.education && tutorDetails.education.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {tutorDetails.education.map((edu) => (
                                    <div key={edu._id} className="p-4 border rounded">
                                        <p className='text-sm font-bold pb-2'>
                                            {edu.level} in {edu.board}
                                        </p>
                                        <p className='text-xs font-medium text-gray-500 pb-2'>
                                            From {edu.institution}
                                        </p>
                                        <p className='text-xs font-medium text-gray-800 pb-2'>
                                            With {edu.grade} Grade/CGPA
                                        </p>
                                        <p className='text-xs font-light'>
                                            During {edu.startDate} - {edu.endDate}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-8">
                                <BookOpen className="w-12 h-12 text-gray-400 mb-2" />
                                <p className="text-center text-sm text-gray-600">
                                    No educational information available
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Subjects Section */}
                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Subjects</h2>
                        {tutorDetails.subjects && tutorDetails.subjects.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {tutorDetails.subjects.map((subject) => (
                                    <div key={subject._id} className="p-4 border rounded">
                                        <p className="text-sm font-bold">{subject.name}</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Level: {subject.level}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-8">
                                <BookOpen className="w-12 h-12 text-gray-400 mb-2" />
                                <p className="text-center text-sm text-gray-600">
                                    No subjects available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfileView;