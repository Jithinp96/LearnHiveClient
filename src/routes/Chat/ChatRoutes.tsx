import React from "react";
import { Route, Routes } from "react-router-dom";

import ChatUIPage from "@/pages/chat/ChatUIPage";

const ChatRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/:receiverRole/:receiverId" element={ <ChatUIPage /> }/>
        </Routes>
    );
};

export default ChatRoutes;