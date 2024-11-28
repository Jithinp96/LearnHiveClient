import axiosInstance from "../axiosInstance";

export const getUserConversationAPI = async() => {
    try {
        const conversations = await axiosInstance.get('/chat')
        return conversations
    } catch (error) {
        throw error;
    }
}

export const getUserMessageAPI = async(receiverId: string) => {
    try {
        const conversations = await axiosInstance.get('/chat/messages', {
            params: { receiverId }
        });
        return conversations.data;
    } catch (error) {
        throw error;
    }
}

export const sendMessageAPI = async (newMessage: object) => {
    try {
        const response = await axiosInstance.post(`/chat/send`, newMessage);;
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const validateVideoCallAPI = async (roomId: string, userId: string, userType: string) => {
    try {
        const response = await axiosInstance.post('/video-call/validate', { roomId, userId, userType });
        return response;
    } catch (error) {
        throw error;
    }
}