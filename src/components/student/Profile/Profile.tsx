import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { editStudentEducationAPI, getStudentDetailsAPI, updateStudentEducationAPI } from '../../../api/studentAPI/studentAPI';
import ProfilePicture from './ProfilePicture';
import PersonalDetails from './PersonalDetails';
import EducationDetails from './EducationDetails';

interface StudentDetails {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    role: string;
    isBlocked: boolean;
    profileImage: string;
    isVerified: boolean;
    createdAt: string;
    education?: {
        level: string;
        board: string;
        startDate: string;
        endDate: string;
        grade: string;
        institution: string;
    }[];
}

const Profile: React.FC = () => {
    const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { studentInfo } = useSelector((state: RootState) => state.student);

    useEffect(() => {
        const fetchStudentDetails = async (studentId: string) => {
            try {
                const response = await getStudentDetailsAPI(studentId);
                setStudentDetails(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch student details");
                setLoading(false);
            }
        }
        if(studentInfo?._id) {
            fetchStudentDetails(studentInfo._id);
        }
    }, [studentInfo?._id]);

    const handleEducationUpdate = async (educationData: any) => {
        if (!studentInfo?._id) return;

        try {
        const updatedStudent = await updateStudentEducationAPI(studentInfo._id, ...Object.values(educationData));
        setStudentDetails(updatedStudent?.data);
        } catch (error) {
        setError("Failed to update education");
        }
    };

    const handleEducationDelete = async (id: string) => {
        try {
            
        } catch (error) {
            
        }
    }

    const handleEducationEdit = async (editedEducation: Education) => {
        if (!studentInfo?._id || !editedEducation.id) return;

        try {
            const updatedStudent = await editStudentEducationAPI(studentInfo._id, editedEducation);
            setStudentDetails(updatedStudent?.data);
        } catch (error) {
            setError("Failed to edit education");
        }
    };

    if (loading) {
        return <div>Loading student details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!studentDetails) {
        return <div>No student details found</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-1 gap-6">
                                <ProfilePicture 
                                    profileImage={studentDetails.profileImage}
                                    name={studentDetails.name}
                                    isBlocked={studentDetails.isBlocked}
                                />
                                <PersonalDetails
                                    email={studentDetails.email}
                                    mobile={studentDetails.mobile}
                                    createdAt={studentDetails.createdAt}
                                    isVerified={studentDetails.isVerified}
                                />
                            </div>
                            
                            <div className="lg:col-span-2">
                                <EducationDetails
                                    education={studentDetails.education}
                                    onEducationUpdate={handleEducationUpdate}
                                    onEducationDelete={handleEducationDelete}
                                    onEducationEdit={handleEducationEdit}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;