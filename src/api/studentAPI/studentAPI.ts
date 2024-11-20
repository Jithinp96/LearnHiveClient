import axios from "axios";
import axiosInstance from "../axiosInstance";

export const registerStudentAPI=async (name: string, email: string, mobile: number, password: string )=>{
    try{
        // return await axios.post(
        //     `${import.meta.env.VITE_API_URL}/students/auth`,
        //     {
        //         name,
        //         email, 
        //         mobile,
        //         password
        //     },
        //     {
        //         withCredentials: true
        //     }
        // );
        return await axiosInstance.post('/students/auth', { name, email, mobile, password})
    }catch(error){
        throw error
    }
}

export const loginStudentAPI = async (email: string, password: string) => {
    try {
        // return await axios.post(
        //     `${import.meta.env.VITE_API_URL}/students/login`,
        //     {
        //         email, 
        //         password
        //     },
        //     {
        //         withCredentials: true
        //     }
        // )
        return await axiosInstance.post('/students/login', {email, password})
    } catch (error) {
        throw error
    }
}

export const googleLoginStudentAPI = async (credentials: string) => {
    try {
      return await axiosInstance.post('/students/google-login', { credentials });
    } catch (error) {
      throw error;
    }
  };

export const logoutStudentAPI = async (role: string) => {
    return await axios.post(
        `${import.meta.env.VITE_API_URL}/students/logout/${role}`, 
        {}, 
        {
            withCredentials: true
        });
}

export const getStudentDetailsAPI = async (id: string) => {
    return await axios.get(
        `${import.meta.env.VITE_API_URL}/students/profile/${id}`,
        {
            withCredentials: true,
        }
    )
}

export const addStudentEducationAPI = async (id: string, educationData: any) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_URL}/students/profile/${id}/add-education`,
            educationData,
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error adding education:", error);
        throw error;
    }
};

export const editStudentEducationAPI = async (id: string, educationId: string, updatedEducation: any) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_URL}/students/profile/${id}/edit-education/${educationId}`,
            updatedEducation,
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error editing education:", error);
        throw error;
    }
};

export const deleteStudentEducationAPI = async (id: string, educationId: string) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_URL}/students/profile/${id}/delete-education/${educationId}`,
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error deleting education:", error);
        throw error;
    }
};

export const fetchCategoriesAPI = async() => {
    try {
        const response = await axiosInstance.get('/students/getcategories');
        return response;
    } catch (error) {
        console.error("Error in loading course categories:", error);
        throw error;
    }
}

export const fetchAllCoursesAPI = async (params: {
    search?: string;
    categories?: string[];
    levels?: string[];
}) => {
    try {
        const queryParams = new URLSearchParams();
        if (params.search) queryParams.append('search', params.search);
        if (params.categories?.length) queryParams.append('categories', params.categories.join(','));
        if (params.levels?.length) queryParams.append('levels', params.levels.join(','));

        return await axiosInstance.get(`/students/allcourses?${queryParams.toString()}`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error in fetching courses:", error);
        throw error;
    }
}

export const fetchCoursesDetailsAPI = async (courseId: string) => {
    try {
        return await axiosInstance.get(`/students/course/${courseId}`,
        {
            withCredentials:true
        })
    } catch (error) {
        console.error("Error in fetching course details:", error);
    }
}

export const getDashboardAPI = async () => {
    try {
        return await axiosInstance.get(`/students/dashboard`,
            {
                withCredentials:true
            }
        )
    } catch (error) {
        console.error("Error in loading dashboard:", error);
    }
}

export const updateStudentNameAPI = async (id: string, newName: string) => {
    try {
        return await axiosInstance.put(`/students/profile/edit-name`,
            {
                id,
                newName
            }
        )
    } catch (error) {
        console.error("Error in updating name:", error);
    }
}

export const updateStudentProfileImageAPI = async (id: string, newImageFile: File) => {
    try {
        const formData = new FormData();
        formData.append("image", newImageFile);

        return await axiosInstance.put(`/students/profile/edit-profilePic/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

    } catch (error) {
        console.error("Error uploading profile pic:", error);
        throw error;
    }
}

export const updateStudentMobileAPI = async (id: string, newNumber: number) => {
    try {
        return await axiosInstance.put(`/students/profile/edit-mobile`,
            {
                id,
                newNumber
            }
        )
    } catch (error) {
        console.error("Error in updating name:", error);
    }
}

export const makePaymentAPI = async (cartDetails: object) => {
    try {
        const response = await axiosInstance.post('/students/create-checkout-session',
            { cartDetails },
            {
                headers: { "Content-Type": "application/json" },
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error in payment: ", error);
    }
}

export const getTutorDetailsForStudentAPI = async (id: string) => {
    try {
        return await axiosInstance.get(`/students/tutorprofile/${id}`);
    } catch (error) {
        console.error("Error in getTutorDetailsAPI:", error);
    }
};

export const getTutorSlotsAPI = async (id: string) => {
    try {
        return await axiosInstance.get(`/students/slotbooking/${id}`)
    } catch (error) {
        console.error("Error in getTutorSlotsAPI:", error);
    }
}

export const createPaymentIntentAPI = async (slotDetails: object) => {
    try {
        const response = await axiosInstance.post('/students/slotbooking/create-payment-intent', slotDetails, 
            { 
                headers : {  "Content-Type": "application/json"} 
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCoursePaymentIntentAPI = async (courseDetails: object) => {
    try {
        const response = await axiosInstance.post('/students/courseenroll/create-payment-intent', courseDetails, 
            { 
                headers : {  "Content-Type": "application/json"} 
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCourseOrderDetailsAPI = async () => {
    try {
        const response = await axiosInstance.get(`/students/course-orders`)
        return response.data
    } catch (error) {
        console.error("Error in getCourseOrderDetailsAPI:", error);
    }
}

export const getSlotOrderDetailsAPI = async () => {
    try {
        const response = await axiosInstance.get(`/students/slot-orders`)
        return response.data
    } catch (error) {
        console.error("Error in getSLotOrderDetailsAPI:", error);
    }
}

export const cancelSlotOrderAPI = async (orderId: string) => {
    try {
        console.log("Reached cancel slot api");
        
        const response = await axiosInstance.post(`/students/slot-cancel/${orderId}`);
        console.log("Response after cancelling slot: ", response);
        
        return response.data;
    } catch (error) {
        console.error("Error in cancelling slot: ", error)
    }
};

export const addReviewAPI = async (courseId: string, reviewData: { rating: number, comment: string, userId?: string }) => {
    try {
        const response = await axiosInstance.post(`/students/${courseId}/reviews`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};
  
export const updateReviewAPI = async (courseId: string, reviewId: string, reviewData: { rating?: number, comment?: string }) => {
    try {
        const response = await axiosInstance.put(`/students/${courseId}/reviews/${reviewId}`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};
  
export const deleteReviewAPI = async (courseId: string, reviewId: string) => {
    try {
        await axiosInstance.delete(`/students/${courseId}/reviews/${reviewId}`);
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};

export const addCommentAPI = async (courseId: string, commentData: { content: string, userId?: string }) => {
    try {
        const response = await axiosInstance.post(`/students/${courseId}/comments`, commentData);
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};
  
export const updateCommentAPI = async (courseId: string, commentId: string, commentData: { content: string }) => {
    try {
        const response = await axiosInstance.put(`/students/${courseId}/comments/${commentId}`, commentData);
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};
  
export const deleteCommentAPI = async (courseId: string, commentId: string) => {
    try {
        await axiosInstance.delete(`/students/${courseId}/comments/${commentId}`);
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};