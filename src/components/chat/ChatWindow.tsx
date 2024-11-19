import React, { useEffect } from 'react';
import { Settings, Paperclip, Smile, Send } from 'lucide-react';
import { Message, Conversation } from './ChatUI';
import { getUserMessageAPI } from '@/api/communicationAPI/chatAPI';
import socket from '@/socket';

interface ChatWindowProps {
  selectedConversation: Conversation | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  formatDate: (dateString: string) => string;
  currentUserId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedConversation,
  messages,
  setMessages,
  inputText,
  setInputText,
  sendMessage,
  formatDate,
  currentUserId,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(()=>{
    socket.on('receiveMessage',(data)=>{
        console.log("data from socket.on receive: ", data);
      
        const standardizedData = {
          ...data,
          message: data.message || data.text,
      };

      setMessages((prev) => [...prev, standardizedData]);
    })
  },[])

  useEffect(() => {
    const fetchUserConversation = async () => {
      if (selectedConversation) {
        const userConversations = await getUserMessageAPI(selectedConversation.participants[0]);
        // console.log('userConversations: ', userConversations);
        setMessages(userConversations.messages);
      }
    };
    fetchUserConversation();
  }, [selectedConversation, setMessages]);

  if (!selectedConversation) {
    return <div>selectedConversation is missing</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden">
            <img src={selectedConversation.participants[2]} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-medium">{selectedConversation.participants[1]}</h2>
            <p className="text-xs text-gray-500">Active Now</p>
          </div>
        </div>
        <div>
          <Settings className="w-6 h-6 text-gray-500" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex mb-4 ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.senderId === currentUserId ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-lg p-3 ${
                  message.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <p>{message.message}</p>
                {message.attachment && (
                  <div className="mt-2 p-2 bg-gray-50 rounded flex items-center space-x-2">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span>{message.attachment.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {formatDate(message.time)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="h-20 px-4 py-2 flex items-center space-x-3 bg-white border-t">
        <Smile className="w-6 h-6 text-gray-400 cursor-pointer" />
        <input
          type="text"
          className="flex-1 p-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Send className="w-6 h-6 text-blue-500 cursor-pointer" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;