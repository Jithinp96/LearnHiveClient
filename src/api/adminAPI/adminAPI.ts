import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/admin/course-category`;

export const adminLoginAPI = async (email: string, password: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_URL}/admin/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        )
    } catch (error) {
        console.error('Error in adminLoginAPI: ', error);
        throw error;
    }
}

export const logoutAdminAPI = async (role: string) => {
    return await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/logout/${role}`, 
        {}, 
        { withCredentials: true });
}

export const getStudentsListAPI = async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_URL}/admin/students`, 
        {
            withCredentials: true, 
        });
    } catch (error) {
        console.error('Error fetching students list:', error);
        throw error;
    }
};

export const getTutorListAPI = async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_URL}/admin/tutors`, 
        {
            withCredentials: true, 
        });
    } catch (error) {
        console.error('Error fetching students list:', error);
        throw error;
    }
}

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Add a new course category
export const addCategory = async (name: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/add`,
            { name },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

// Edit an existing course category
export const editCategory = async (_id: string, name: string) => {
    try {
        const response = await axios.put(
            `${API_URL}/edit/${_id}`,
            { name },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error editing category:', error);
        throw error;
    }
};

// Toggle category status
export const toggleCategoryStatus = async (_id: string, status: boolean) => {
    try {
        const response = await axios.patch(
            `${API_URL}/toggle-status/${_id}`,
            { status },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error toggling category status:', error);
        throw error;
    }
};

export const getCourseList = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/courses`,
            {
                withCredentials: true
            }
        )
    } catch (error) {
        throw error;
    }
}

export const refreshTokenAPI = async () => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_URL}/admin/refresh`,
            {},
            {
                withCredentials: true
            }
        )
    } catch (error) {
        console.error('Error in refreshTokenAPI: ', error);
        throw error;
    }
}