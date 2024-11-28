import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, BadgeCheck, BadgeX } from 'lucide-react';
import axios from 'axios';
import { getTutorDetailsAPI } from '@/api/adminAPI/adminAPI';

interface Stat {
  label: string;
  value: number;
}

interface TutorDetails {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    role: string;
    isBlocked: boolean;
    isVerified: boolean;
}

const TutorDetails: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [tutorDetails, setTutorDetails] = useState<TutorDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchTutorDetails = async (tutorId: string) => {
            try {
                const response = await getTutorDetailsAPI(tutorId)
                setTutorDetails(response.data);
                setIsBlocked(response.data.isBlocked);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch tutor details");
                setLoading(false);
            }
        };

        if (id) {
            fetchTutorDetails(id);
        }
    }, [id]);

    const toggleBlockStatus = async () => {
        if (!tutorDetails) return;
        try {
          const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/admin/tutor/${tutorDetails._id}/block`,
            { isBlocked: !isBlocked }
          );
    
          if (response.status === 200) {
            setIsBlocked((prev) => !prev);
          }
        } catch (error) {
          console.error('Error updating block status:', error);
        }
      };
    

    if (loading) {
        return <div>Loading tutor details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!tutorDetails) {
        return <div>No tutor details found</div>;
    }

    const stats: Stat[] = [
        { label: "Course Purchased", value: 500 },
        { label: "Course Completed", value: 150 },
        { label: "Total Spend", value: 850 },
        { label: "Telephonic Talk", value: 190 }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-indigo-800 mb-2">
                {tutorDetails.name}
                {tutorDetails.isVerified ? (
                    <BadgeCheck className="inline ml-2 text-green-500" size={24} />
                ) : (
                    <BadgeX className="inline ml-2 text-red-500" size={24}/>
                )}
            </h1>
            <p className="text-red-500 mb-4">{tutorDetails.role.toUpperCase()}</p>
          
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <User size={120} className="mx-auto text-gray-700" />
                    </div>
                </div>
            
                <div className="md:w-2/3">
              
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex">
                            <span className="font-semibold text-indigo-800 mr-2">Name:</span>
                            <span className="text-gray-600">{tutorDetails.name}</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold text-indigo-800 mr-2">Email:</span>
                            <span className="text-gray-600">{tutorDetails.email}</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold text-indigo-800 mr-2">Mobile:</span>
                            <span className="text-gray-600">{tutorDetails.mobile}</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold text-indigo-800 mr-2">Status:</span>
                            <button
                                onClick={toggleBlockStatus}
                                className={`px-2 rounded ${isBlocked ? 'bg-red-500' : 'bg-green-500'} text-white`}
                            >
                                {isBlocked ? 'Unblock' : 'Active'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <p className="text-3xl font-bold text-indigo-800">{stat.value}</p>
                        <p className="text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorDetails;