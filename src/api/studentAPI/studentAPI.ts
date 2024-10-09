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
    )
}

export const updateStudentEducationAPI = async(id: string, level: string, board: string, startDate: string, endDate: string, grade: string, institution: string) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_URL}/students/profile/${id}/update-education`,
            {
                level,
                board,
                startDate,
                endDate,
                grade,
                institution
            }
        )
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

export const editStudentEducationAPI = async() => {
    try {
        
    } catch (error) {
        
    }
}