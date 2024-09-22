import axios from "axios";

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