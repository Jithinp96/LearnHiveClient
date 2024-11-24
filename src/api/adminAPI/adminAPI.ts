import axiosInstance from "../axiosInstance";

export const adminLoginAPI = async (email: string, password: string) => {
    try {
        // return await axios.post(
        //     `${import.meta.env.VITE_API_URL}/admin/login`,
        //     {
        //         email,
        //         password
        //     },
        //     {
        //         withCredentials: true
        //     }
        // )
        return axiosInstance.post('/admin/login', { email, password })
    } catch (error) {
        throw error;
    }
}

export const logoutAdminAPI = async (role: string) => {
    // return await axios.post(
    //     `${import.meta.env.VITE_API_URL}/admin/logout/${role}`, 
    //     {}, 
    //     { withCredentials: true });
    try {
        return axiosInstance.post(`/admin/logout/${role}`)
    } catch (error) {
        throw error
    }
}

export const getDashboardAPI = async () => {
    try {
        return await axiosInstance.get('/admin/dashboard')
    } catch (error) {
        throw error;
    }
}

export const getStudentsListAPI = async () => {
    try {
        // return await axios.get(`${import.meta.env.VITE_API_URL}/admin/students`, 
        // {
        //     withCredentials: true, 
        // });
        return axiosInstance.get('/admin/students')
    } catch (error) {
        throw error;
    }
};

export const getTutorListAPI = async () => {
    try {
        // return await axios.get(`${import.meta.env.VITE_API_URL}/admin/tutors`, 
        // {
        //     withCredentials: true, 
        // });
        return axiosInstance.get('/admin/tutors')
    } catch (error) {
        throw error;
    }
}

export const fetchCategories = async () => {
    try {
        // const response = await axios.get(`${API_URL}`, {
        //     withCredentials: true,
        // });
        const response = await axiosInstance.get('/admin/course-category')
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a new course category
export const addCategory = async (name: string) => {
    try {
        // const response = await axios.post(
        //     `${API_URL}/add`,
        //     { name },
        //     {
        //         withCredentials: true,
        //     }
        // );
        const response = await axiosInstance.post('/admin/course-category/add', { name })
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edit an existing course category
export const editCategory = async (_id: string, name: string) => {
    try {
        // const response = await axios.put(
        //     `${API_URL}`,
        //     { name },
        //     {
        //         withCredentials: true,
        //     }
        // );
        const response = await axiosInstance.put(`/admin/course-category/edit/${_id}`, { name })
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Toggle category status
export const toggleCategoryStatus = async (_id: string, status: boolean) => {
    try {
        // const response = await axios.patch(
        //     `${API_URL}/`,
        //     { status },
        //     {
        //         withCredentials: true,
        //     }
        // );
        const response = await axiosInstance.patch(`/admin/course-category/toggle-status/${_id}`, { status })
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCourseList = async () => {
    try {
        // return await axios.get(
        //     `${import.meta.env.VITE_API_URL}/admin/courses`,
        //     {
        //         withCredentials: true
        //     }
        // )
        return await axiosInstance.get(`/admin/courses`)
    } catch (error) {
        throw error;
    }
}

export const getCourseDetails = async (courseId: string) => {
    try {
        return await axiosInstance.get(`/admin/course/${courseId}`)
    } catch (error) {
        throw error;
    }
}

export const approveCourseAPI = async(courseId: string) => {
    try {
        return await axiosInstance.put(`/admin/course/${courseId}/approval`)
    } catch (error) {
        throw error;
    }
}

export const toggleBlockCourseAPI = async(courseId: string, isBlocked: boolean) => {
    try {
        return await axiosInstance.put(`/admin/course/${courseId}/toggle-status`, { isBlocked });
    } catch (error) {
        throw error;
    }
}