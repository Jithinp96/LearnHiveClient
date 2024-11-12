import axiosInstance from "../axiosInstance";

export const getAllConversation = async() => {
    try {
        return await axiosInstance.get('/chat')
    } catch (error) {
        console.error("Error in loading conversations: ", error);
    }
}

export const sendMessageAPI = async (receiverRole: string, receiverId: string, newMessage: object) => {
    try {
        return await axiosInstance.post(`/chat/${receiverRole}/${receiverId}`, newMessage);
    } catch (error) {
        console.error("Error in sending message:", error);
    }
};