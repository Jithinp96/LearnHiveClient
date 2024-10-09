import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getTutorDetailsAPI } from "@/api/tutorAPI/tutorAxios";
import { RootState } from "@/redux/store";
import ProfilePicture from "./ProfilePicture";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";

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
    subjects:[]
    education?: {
        level: string;
        board: string;
        startDate: string;
        endDate: string;
        grade: string;
        institution: string;
    }[];
    workExperience?: {
        institution: string;
        designation: string;
        startDate: string;
        endDate: string;
    }[];
}

const Profile: React.FC = () => {
    const [tutorDetails, setTutorDetails] = useState<TutorDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { tutorInfo } = useSelector((state: RootState) => state.tutor);

    const fetchTutorDetails = async (tutorId: string) => {
        try {
            const response = await getTutorDetailsAPI(tutorId);
            setTutorDetails(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch tutor details");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tutorInfo?._id) {
            fetchTutorDetails(tutorInfo._id);
        }
    }, [tutorInfo?._id]);

    const handleEducationUpdate = () => {
        if (tutorInfo?._id) {
            fetchTutorDetails(tutorInfo._id);
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

    return(
        <>
            <div className="flex h-screen bg-gray-100">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="container mx-auto px-4 py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-1 gap-6">
                                    <ProfilePicture 
                                        profileImage={tutorDetails.profileImage}
                                        name={tutorDetails.name}
                                        isBlocked={tutorDetails.isBlocked}
                                    />
                                    <PersonalDetails
                                        email={tutorDetails.email}
                                        mobile={tutorDetails.mobile}
                                        createdAt={tutorDetails.createdAt}
                                        isVerified={tutorDetails.isVerified}
                                    />
                                </div>
                                <div className="lg:col-span-2">
                                    <EducationDetails
                                        education={tutorDetails.education}
                                        tutorId={tutorInfo?._id || ''}
                                        onEducationUpdate={handleEducationUpdate}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Profile