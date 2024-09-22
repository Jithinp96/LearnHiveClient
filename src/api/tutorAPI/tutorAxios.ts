import axios from "axios";

export const registerTutorAPI = async (name: string, email: string, mobile: number, password: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_URL}/tutors/auth`,{
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