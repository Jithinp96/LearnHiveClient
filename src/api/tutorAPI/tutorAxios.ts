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
        throw error
    }
};

// Tutor OTP verification
export const tutorOTPVerifyAPI = async (otp: string) => {
    try {
        return await axiosInstance.post("/tutor/otp-verify", { otp });
    } catch (error) {
        throw error
    }
};

// Tutor login
export const loginTutorAPI = async (email: string, password: string) => {
    try {
        return await axiosInstance.post("/tutor/login", { email, password });
    } catch (error) {
        throw error
    }
};

export const googleLoginTutorAPI = async (credentials: string) => {
    try {
      return await axiosInstance.post('/tutor/google-login', { credentials });
    } catch (error) {
      throw error;
    }
};

// Tutor logout
export const logoutTutorAPI = async () => {
    try {
        return await axiosInstance.post(`/tutor/logout`);
    } catch (error) {
        // console.error("Error in logoutTutorAPI:", error);
        throw error;
    }
};

// Forgot password
export const tutorForgotPasswordAPI = async (email: string) => {
    try {
        return await axiosInstance.post("/tutor/forgot-password", { email });
    } catch (error) {
        // console.error("Error in tutorForgotPasswordAPI:", error);
        throw error;
    }
};

// Reset password
export const tutorResetPasswordAPI = async (newPassword: string, token: string | null) => {
    try {
        return await axiosInstance.post(`/tutor/reset-password?token=${token}`, { newPassword });
    } catch (error) {
        // console.error("Error in tutorResetPasswordAPI:", error);
        throw error;
    }
};

export const getTutorDashboardAPI = async() => {
    try {
        const response = await axiosInstance.get('/tutor/dashboard');
        console.log("response of getDashboard: ", response);
        return response
    } catch (error) {
        // console.error("Error in fetching tutor dashboard from api file:", error);
        throw error;
    }
}

// Get tutor details
export const getTutorDetailsAPI = async (id: string) => {
    try {
        return await axiosInstance.get(`/tutor/profile/${id}`);
    } catch (error) {
        // console.error("Error in getTutorDetailsAPI:", error);
        throw error;
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
        // console.error("Error adding education:", error);
        throw error;
    }
};

export const editTutorEducationAPI = async (id: string, educationId: string, updatedEducation: any) => {
    try {
        return await axiosInstance.put(
            `/tutor/profile/${id}/edit-education/${educationId}`,
            updatedEducation
        )
    } catch (error) {
        // console.error("Error editing education:", error);
        throw error;
    }
}

export const deleteTutorEducationAPI = async(id: string, educationId: string) => {
    try {
        return await axiosInstance.delete(
            `/tutor/profile/${id}/delete-education/${educationId}`
        )
    } catch (error) {
        // console.error("Error deleting education:", error);
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
        // console.error("Error in updating name:", error);
        throw error;
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
        throw error;
    }
}

export const updateTutorMobileAPI = async (id: string, newNumber: number) => {
    try {
        return await axiosInstance.put( `/tutor/profile/edit-mobile`, { id, newNumber })
    } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
    }
}

export const fetchSubjectsAPI = async() => {
    try {
        const response = await axiosInstance.get('/tutor/getSubjects');
        return response;
    } catch (error) {
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
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editCourseAPI = async(
    courseId: string,
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
        console.log("Inside edit courseApi");
        console.log(courseId,
            title,
            description,
            shortDescription,
            tags,
            category,
            price,
            level,
            thumbnailUrl,
            duration,
            videos,);
        
        
        return await axiosInstance.put(`/tutor/edit-course/${courseId}`, {
            courseId,
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
        throw error;
    }
}

export const fetchCourseByIdAPI = async(courseId: string) => {
    try {
        return await axiosInstance.get(`/tutor/edit-course/${courseId}`)
    } catch (error) {
        throw error;
    }
}

export const fetchCategoriesAPI = async() => {
    try {
        const response = await axiosInstance.get('/tutor/getcategories');
        return response;
    } catch (error) {
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
        throw error;
    }
}

export const fetchSlotsAPI = async() => {
    try {
        return await axiosInstance.get('/tutor/appointment')
    } catch (error) {
        throw error;
    }
}

export const createSlotAPI = async(slotData: object) => {
    try {
        return await axiosInstance.post('/tutor/addslot', slotData)
    } catch (error) {
        throw error;
    }
}

export const generateSlotsAPI = async(data: { tutorId: string; subject: string; level: string; startTime: string; endTime: string; price: number, date: Date}) => {
    try {
        return await axiosInstance.post('/tutor/generate-slots', data);
    } catch (error) {
        throw error;
    }
};

export const generateSlotsPreferenceAPI = async(data: { tutorId: string; subject: string; level: string; startTime: string; endTime: string; price: number, date: Date, requiresDailySlotCreation: boolean}) => {
    try {
        console.log("data from the generate slot preference api: ", data);
        
        return await axiosInstance.post('/tutor/generate-slots-preference', data);
    } catch (error) {
        throw error;
    }
};

export const editSlotAPI = async(slotId: string, slotData: object) => {
    try {
        return await axiosInstance.put('/tutor/editslot', { slotData, slotId })
    } catch (error) {
        throw error;
    }
}