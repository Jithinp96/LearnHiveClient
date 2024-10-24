import axios from "axios";
import axiosInstance from "../axiosInstance";

export const registerStudentAPI=async (name: string, email: string, mobile: number, password: string )=>{
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_URL}/students/auth`,
            {
                name,
                email, 
                mobile,
                password
            },
            {
                withCredentials: true
            }
        );
         
    }catch(err){
        console.log(err)
    }
}

export const loginStudentAPI = async (email: string, password: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_URL}/students/login`,
            {
                email, 
                password
            },
            {
                withCredentials: true
            }
        )
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

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

export const fetchAllCoursesAPI = async() => {
    try {
        return await axiosInstance.get('/students/allcourses', 
            {
                withCredentials: true,
            }
        )
    } catch (error) {
        console.error("Error in fetching courses:", error);
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

export const addToCartAPI = async (userId: string, courseId: string) => {
    try {        
        return await axiosInstance.post('/students/add-to-cart',
            {
                userId,
                courseId
            }
        )
    } catch (error) {
        console.error("Error in adding course to cart: ", error);
    }
}

export const deleteFromCartAPI = async(id: string) => {
    try {
        return await axiosInstance.delete(`/students/cart/delete/${id}`)
    } catch (error) {
        console.error("Error in deleting from cart: ", error);
    }
}

export const fetchCartAPI = async () => {
    try {
        return await axiosInstance.get('/students/cart')
    } catch (error) {
        console.error("Error in loading cart: ", error);
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
        // console.log("course response: ", response.data);
        
        return response.data
    } catch (error) {
        console.error("Error in getCourseOrderDetailsAPI:", error);
    }
}

export const getSlotOrderDetailsAPI = async () => {
    try {
        const response = await axiosInstance.get(`/students/slot-orders`)
        // console.log("slot response: ", response.data);
        return response.data
    } catch (error) {
        console.error("Error in getSLotOrderDetailsAPI:", error);
    }
}