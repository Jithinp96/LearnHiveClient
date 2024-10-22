import axiosInstance from "../axiosInstance";

// Register tutor
export const registerTutorAPI = async (name: string, email: string, mobile: number, password: string) => {
    try {
        return await axiosInstance.post("/tutor/auth", {
            name,
            email,
            mobile,
            password,
        });
    } catch (error) {
        console.error("Error in registerTutorAPI:", error);
    }
};

// Tutor OTP verification
export const tutorOTPVerifyAPI = async (otp: string) => {
    try {
        return await axiosInstance.post("/tutor/otp-verify", { otp });
    } catch (error) {
        console.error("Error in tutorOTPVerifyAPI:", error);
    }
};

// Tutor login
export const loginTutorAPI = async (email: string, password: string) => {
    try {
        return await axiosInstance.post("/tutor/login", { email, password });
    } catch (error) {
        console.error("Error in loginTutorAPI:", error);
    }
};

// Tutor logout
export const logoutTutorAPI = async (role: string) => {
    try {
        return await axiosInstance.post(`/tutor/logout/${role}`);
    } catch (error) {
        console.error("Error in logoutTutorAPI:", error);
    }
};

// Forgot password
export const tutorForgotPasswordAPI = async (email: string) => {
    try {
        return await axiosInstance.post("/tutor/forgot-password", { email });
    } catch (error) {
        console.error("Error in tutorForgotPasswordAPI:", error);
    }
};

// Reset password
export const tutorResetPasswordAPI = async (newPassword: string, token: string | null) => {
    try {
        return await axiosInstance.post(`/tutor/reset-password?token=${token}`, { newPassword });
    } catch (error) {
        console.error("Error in tutorResetPasswordAPI:", error);
    }
};

// Get tutor details
export const getTutorDetailsAPI = async (id: string) => {
    try {
        return await axiosInstance.get(`/tutor/profile/${id}`);
    } catch (error) {
        console.error("Error in getTutorDetailsAPI:", error);
    }
};

// Add tutor education
export const addTutorEducationAPI = async (id: string, educationData: any) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/${id}/add-education`, 
            educationData
        );
    } catch (error) {
        console.error("Error adding education:", error);
    }
};

export const editTutorEducationAPI = async (id: string, educationId: string, updatedEducation: any) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/${id}/edit-education/${educationId}`,
            updatedEducation
        )
    } catch (error) {
        console.error("Error editing education:", error);
        throw error;
    }
}

export const deleteTutorEducationAPI = async(id: string, educationId: string) => {
    try {
        return await axiosInstance.delete(
            `/tutor/profile/${id}/delete-education/${educationId}`
        )
    } catch (error) {
        console.error("Error deleting education:", error);
        throw error;
    }
}

export const updateTutorNameAPI = async (id: string, newName: string) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/edit-name`,
            {
                id,
                newName
            }
        )
    } catch (error) {
        console.error("Error in updating name:", error);
    }
}

export const updateTutorProfileImageAPI = async (id: string, newImageFile: File) => {
    try {
        const formData = new FormData();
        formData.append("image", newImageFile);

        return await axiosInstance.put(
            `/tutor/profile/edit-profilePic/${id}`, 
            formData, 
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    } catch (error) {
        console.error("Error uploading profile pic:", error);
        throw error;
    }
}

export const updateTutorMobileAPI = async (id: string, newNumber: number) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/edit-mobile`,
            {
                id,
                newNumber
            }
        )
    } catch (error) {
        console.error("Error in updating name:", error);
    }
}

export const addTutorSubjectAPI = async (tutorId: string, subjectData: object) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/add-subject`,
            {
                tutorId,
                subjectData
            }
        )
    } catch (error) {
        console.error("Error in updating name:", error);
    }
}

export const editTutorSubjectAPI = async (tutorId: string, subjectId: string, editedSubject: object) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/edit-subject`,
            {
                tutorId,
                subjectId,
                editedSubject
            }
        )
    } catch (error) {
        console.error("Error in updating name:", error);
    }
}

export const deleteTutorSubjectAPI = async (tutorId: string, subjectId: string) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/delete-subject`,
            {
                tutorId,
                subjectId
            }
        )
    } catch (error) {
        console.error("Error in updating name:", error);
    }
}

export const fetchSubjectsAPI = async() => {
    try {
        const response = await axiosInstance.get('/tutor/getSubjects');
        return response;
    } catch (error) {
        console.error("Error in loading course categories:", error);
        throw error;
    }
}

export const addCourseAPI = async (
    tutorId: string,
    title: string,
    description: string,
    shortDescription: string,
    tags: string[],
    category: string,
    price: number,
    level: string,
    thumbnailUrl: string,
    duration: number,
    videos: object[],
) => {
    try {
        return await axiosInstance.post(`/tutor/${tutorId}/add-course`, {
            tutorId,
            title,
            description,
            shortDescription,
            tags,
            category,
            price,
            level,
            thumbnailUrl,
            duration,
            videos,
        });
    } catch (error) {
        console.error("Error adding course:", error);
        throw error;
    }
};

export const uploadVideoAPI = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("video", file);

        const response = await axiosInstance.post("/tutor/upload-video", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

    return response.data;
    } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
    }
};

export const uploadThumbnailAPI = async(file: File) => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axiosInstance.post("/tutor/upload-thumbnail", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Response: ", response);
        
        return response.data;
    } catch (error) {
        console.error("Error uploading thumbnail:", error);
        throw error;
    }
}

export const fetchCategoriesAPI = async() => {
    try {
        const response = await axiosInstance.get('/tutor/getcategories');
        return response;
    } catch (error) {
        console.error("Error in loading course categories:", error);
        throw error;
    }
}

export const fetchTutorCoursesAPI = async(id: string) => {
    try {
        const response = await axiosInstance.get('/tutor/course-list', {
            params: { id }
        });
        return response
    } catch (error) {
        console.error("Error in loading course list:", error);
        throw error;
    }
}

export const fetchSlotsAPI = async() => {
    try {
        return await axiosInstance.get('/tutor/appointment')
    } catch (error) {
        console.error("Error in loading slots list:", error);
        throw error;
    }
}

export const createSlotAPI = async(slotData: object) => {
    try {
        return await axiosInstance.post('/tutor/addslot', slotData)
    } catch (error) {
        console.error("Error in creating slot:", error);
        throw error;
    }
}

export const editSlotAPI = async(slotId: string, slotData: object) => {
    try {
        return await axiosInstance.put('/tutor/editslot', { slotData, slotId })
    } catch (error) {
        console.error("Error in creating slot:", error);
        throw error;
    }
}