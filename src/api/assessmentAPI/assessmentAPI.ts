import axiosInstance from "../axiosInstance";

export const createAssessmentAPI = async (assessmentData: object) => {
    try {
        return await axiosInstance.post("/assessment/create", assessmentData);
    } catch (error) {
        throw error;
    }
};

export const fetchAssessmentByTutorAPI = async () => {
    try {
        return await axiosInstance.get("/assessment")
    } catch (error) {
        throw error;
    }
}

export const fetchAssessmentForStudentAPI = async () => {
    try {
        return await axiosInstance.get("/assessment/assessment-list")
    } catch (error) {
        throw error;
    }
}

export const fetchAssessmentByIdAPI = async (assessmentId: string) => {
    try {
        return await axiosInstance.get(`/assessment/${assessmentId}`)
    } catch (error) {
        throw error;
    }
}

export const submitAssessmentAPI = async (assessmentId: string, responses: Record<string, number>) => {
    try {
        const response = await axiosInstance.post(`/assessment/${assessmentId}/submit`, { responses })
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchAssessmentResultAPI = async(assessmentId: string) => {
    try {
        const response = await axiosInstance.get(`/assessment/assessment-result/${assessmentId}`)
        return response
    } catch (error) {
        throw error;
    }
}

export const fetchCertificateAPI = async(assessmentId: string) => {
    try {
        const response = await axiosInstance.get(`/assessment/certificate/${assessmentId}`);
        return response.data
    } catch (error) {
        throw error
    }
}