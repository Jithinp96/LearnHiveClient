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
        console.log("reached getDashboadAPI in student apio");
        
        return await axiosInstance.get(`/students/dashboard`,
            {
                withCredentials:true
            }
        )
    } catch (error) {
        console.error("Error in loading dashboard:", error);
    }
}