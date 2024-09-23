import axios from "axios";

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

export const getStudentsListAPI = async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_URL}/admin/students`, {
            withCredentials: true, 
        });
    } catch (error) {
        console.error('Error fetching students list:', error);
        throw error;
    }
};