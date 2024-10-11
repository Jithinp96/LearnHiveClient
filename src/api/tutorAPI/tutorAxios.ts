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
export const addTutorEducationAPI = async (
    id: string,
    educationId: string | null,
    level: string,
    board: string,
    startDate: string,
    endDate: string,
    grade: string,
    institution: string
) => {
    try {
        return await axiosInstance.put(`/tutor/profile/${id}/update-education`, {
        educationId,
        level,
        board,
        startDate,
        endDate,
        grade,
        institution,
        });
    } catch (error) {
        console.error("Error adding education:", error);
    }
};

// Add course
export const addCourseAPI = async (
    tutorId: string,
    title: string,
    description: string,
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

// Upload video
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
        console.log("Reached uploadThumbnailAPI");
        console.log("Starting thumbnail upload for file: ", file.name);
        const formData = new FormData();
        formData.append("image", file);
        console.log("formData: ", formData);
        console.log("formData keys: ", Array.from(formData.keys()));

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