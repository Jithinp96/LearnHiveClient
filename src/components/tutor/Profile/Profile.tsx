import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { 
    getTutorDetailsAPI,
    addTutorEducationAPI,
    editTutorEducationAPI,
    deleteTutorEducationAPI,
    updateTutorMobileAPI,
    updateTutorNameAPI,
    updateTutorProfileImageAPI,
    addTutorSubjectAPI,
    editTutorSubjectAPI,
    deleteTutorSubjectAPI
} from "@/api/tutorAPI/tutorAxios";

import ProfilePicture from "./ProfilePicture";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import SubjectDetails from "./SubjectDetails";

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

interface TutorWorkExperience {
    institution: string;
    designation: string;
    startDate: string;
    endDate: string;
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
    workExperience?: TutorWorkExperience[];
}

const Profile: React.FC = () => {
    const [tutorDetails, setTutorDetails] = useState<TutorDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { tutorInfo } = useSelector((state: RootState) => state.tutor);

    useEffect(() => {
        const fetchTutorDetails = async (tutorId: string) => {
            try {
                const response = await getTutorDetailsAPI(tutorId);
                setTutorDetails(response?.data);
            } catch (error) {
                setError("Failed to fetch tutor details");
            } finally {
                setLoading(false);
            }
        };

        if (tutorInfo?._id) {
            fetchTutorDetails(tutorInfo._id);
        }
    }, [tutorInfo?._id]);

    // Education Handlers
    const handleEducationAdd = async (educationData: TutorEducation) => {
        if (!tutorInfo?._id) return;
        try {
            const updatedTutor = await addTutorEducationAPI(tutorInfo._id, educationData);
            setTutorDetails(updatedTutor?.data);
        } catch (error) {
            setError("Failed to update education");
        }
    };

    const handleEducationDelete = async (educationId: string) => {
        if (!tutorInfo?._id || !educationId) return;
        try {
            const updatedTutor = await deleteTutorEducationAPI(tutorInfo._id, educationId);
            setTutorDetails(updatedTutor?.data);
        } catch (error) {
            setError("Failed to delete education");
        }
    };

    const handleEducationEdit = async (editedEducation: TutorEducation) => {
        if (!tutorInfo?._id || !editedEducation._id) return;
        try {
            const updatedTutor = await editTutorEducationAPI(tutorInfo._id, editedEducation._id, editedEducation);
            setTutorDetails(updatedTutor?.data);
        } catch (error) {
            setError("Failed to edit education");
        }
    };

    // Subject Handlers
    const handleSubjectAdd = async (subjectData: TutorSubject) => {
        if (!tutorInfo?._id) return;
        
        try {
            const updatedTutor = await addTutorSubjectAPI(tutorInfo._id, subjectData);
            setTutorDetails(updatedTutor?.data);
        } catch (error) {
            setError("Failed to add subject");
        }
    };

    const handleSubjectDelete = async (subjectId: string) => {
        if (!tutorInfo?._id || !subjectId) return;
        try {
            const updatedTutor = await deleteTutorSubjectAPI(tutorInfo._id, subjectId);
            setTutorDetails(updatedTutor?.data);
        } catch (error) {
            setError("Failed to delete subject");
        }
    };

    const handleSubjectEdit = async (editedSubject: TutorSubject) => {
        if (!tutorInfo?._id || !editedSubject._id) return;
        try {
            const updatedTutor = await editTutorSubjectAPI(tutorInfo._id, editedSubject._id, editedSubject);
            setTutorDetails(updatedTutor?.data);
        } catch (error) {
            setError("Failed to edit subject");
        }
    };

    // Profile Update Handlers
    const handleNameUpdate = async (newName: string) => {
        if (!tutorInfo?._id) return;
        try {
            const updatedTutor = await updateTutorNameAPI(tutorInfo._id, newName);
            setTutorDetails(prev => prev ? { ...prev, name: updatedTutor?.data.name } : null);
        } catch (error) {
            setError("Failed to update name");
        }
    };

    const handleImageUpdate = async (newImageFile: File) => {
        if (!tutorInfo?._id) return;
        try {
            const updatedTutor = await updateTutorProfileImageAPI(tutorInfo._id, newImageFile);
            setTutorDetails(prev => prev ? { ...prev, profileImage: updatedTutor.data.profileImage } : null);
        } catch (error) {
            setError("Failed to update profile image");
        }
    };

    const handleMobileUpdate = async (newMobile: number) => {
        if (!tutorInfo?._id) return;
        try {
            const updatedTutor = await updateTutorMobileAPI(tutorInfo._id, newMobile);
            setTutorDetails(prev => prev ? { ...prev, mobile: updatedTutor?.data.mobile } : null);
        } catch (error) {
            setError("Failed to update mobile number");
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

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex">
                {/* Left Column - Fixed */}
                <div className="w-1/3 p-6">
                    <div className="sticky top-6">
                        <ProfilePicture
                            profileImage={tutorDetails.profileImage}
                            name={tutorDetails.name}
                            isBlocked={tutorDetails.isBlocked}
                            onNameUpdate={handleNameUpdate}
                            onImageUpdate={handleImageUpdate}
                        />
                        <div className="mt-6">
                            <PersonalDetails
                                email={tutorDetails.email}
                                mobile={tutorDetails.mobile}
                                createdAt={tutorDetails.createdAt}
                                isVerified={tutorDetails.isVerified}
                                onMobileUpdate={handleMobileUpdate}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Scrollable but hidden scrollbar */}
                <div className="w-2/3 p-6 overflow-y-auto hide-scrollbar">
                    <div className="space-y-6">
                        <EducationDetails
                            education={tutorDetails.education}
                            onEducationAdd={handleEducationAdd}
                            onEducationDelete={handleEducationDelete}
                            onEducationEdit={handleEducationEdit}
                        />
                        <SubjectDetails
                            subjects={tutorDetails.subjects}
                            onSubjectAdd={handleSubjectAdd}
                            onSubjectDelete={handleSubjectDelete}
                            onSubjectEdit={handleSubjectEdit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;