import axios from "axios";

export const registerTutorAPI = async (name: string, email: string, mobile: number, password: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_URL}/tutor/auth`,{
                name,
                email,
                mobile,
                password,
            },
            {
                withCredentials: true
            }
        )
    } catch (error) {
        console.error(error);
    }
}

export const loginTutorAPI = async (email: string, password: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_URL}/tutor/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        )
    } catch (error) {
        console.error("Error in tutor login: ", error);
        
    }
}

export const logoutTutorAPI = async (role: string) => {
    return await axios.post(
        `${import.meta.env.VITE_API_URL}/tutor/logout/${role}`, 
        {}, 
        { withCredentials: true });
}