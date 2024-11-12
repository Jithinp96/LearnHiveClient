import axiosInstance from "../axiosInstance";

export const createAssessmentAPI = async (assessmentData: object) => {
    try {
        return await axiosInstance.post("/assessment/create", assessmentData);
    } catch (error) {
        console.error("Error in creating assessment:", error);
    }
};

export const fetchAssessmentByTutorAPI = async () => {
    try {
        return await axiosInstance.get("/assessment")
    } catch (error) {
        console.error("Error in fetching assessment by tutor:", error);
    }
}

export const fetchAssessmentForStudentAPI = async () => {
    try {
        return await axiosInstance.get("/assessment/assessment-list")
    } catch (error) {
        console.error("Error in fetching assessment for students:", error);
    }
}

export const fetchAssessmentByIdAPI = async (assessmentId: string) => {
    try {
        return await axiosInstance.get(`/assessment/${assessmentId}`)
    } catch (error) {
        console.error("Error in fetching assessment by id:", error);
    }
}

export const submitAssessmentAPI = async (assessmentId: string, responses: Record<string, number>) => {
    try {
        console.log("responses sending: ", responses);
        
        const response = await axiosInstance.post(`/assessment/${assessmentId}/submit`, { responses })
        console.log("Response.data from submit assessmentAPI: ", response);
        return response;
    } catch (error) {
        console.error("Error in submitting the assessment:", error);
    }
}

export const fetchAssessmentResultAPI = async(asseessmentId: string) => {
    try {
        const response = await axiosInstance.get(`/assessment/assessment-result/${asseessmentId}`)
        return response
    } catch (error) {
        console.error("Error in fetching assessment result:", error);
    }
}