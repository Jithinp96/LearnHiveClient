import axiosInstance from "../axiosInstance";

// export const getAllConversation = async() => {
//     try {
//         const conversations = await axiosInstance.get('/chat/hello')
//         console.log("conversations from getAllConversation: ", conversations);
        
//         return conversations
//     } catch (error) {
//         console.error("Error in loading conversations: ", error);
//     }
// }

export const getUserConversationAPI = async() => {
    try {
        const conversations = await axiosInstance.get('/chat')
        return conversations
    } catch (error) {
        console.error("Error in loading conversations: ", error);
    }
}

export const getUserMessageAPI = async(receiverId: string) => {
    try {
        const conversations = await axiosInstance.get('/chat/messages', {
            params: { receiverId }
        });

        // console.log("conversations from chatAPI: ", conversations);
        return conversations.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
}

export const sendMessageAPI = async (newMessage: object) => {
    try {
      const response = await axiosInstance.post(`/chat/send`, newMessage);
        // console.log("response: ", response);
        return response.data;
    } catch (error) {
      console.error("Error in sending message:", error);
      return { error: "Failed to send message. Please try again later." };
    }
  };

// export const sendMessageAPI = async (receiverRole: string, receiverId: string, newMessage: object) => {
//     try {
//         return await axiosInstance.post(`/chat/${receiverRole}/${receiverId}`, newMessage);
//     } catch (error) {
//         console.error("Error in sending message:", error);
//     }
// };