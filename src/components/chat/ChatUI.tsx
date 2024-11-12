import React, { useState, useEffect } from 'react';
import { Search, Settings, Paperclip, Smile, Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getAllConversation, sendMessageAPI } from '@/api/communicationAPI/chatAPI';

interface Message {
  _id: string;
  text: string;
  sent: boolean;
  time: string;
  attachment?: {
    type: string;
    name: string;
  };
}

interface Conversation {
  _id: string;
  participants: string[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ChatUI = () => {
  const { receiverRole, receiverId } = useParams<{ receiverRole: string; receiverId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getAllConversation();
        console.log("Response: ", response?.data.data);
        setConversations(response?.data.data);
        
        // If there are conversations, select the first one by default
        if (response?.data.data.length > 0) {
          setSelectedConversation(response?.data.data[0]);
          setMessages(response?.data.data[0].messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchConversations();
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(conversation.messages);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !receiverRole || !receiverId) return;

    try {
      const newMessage = {
        receiverId: receiverId,
        receiverRole: receiverRole,
        text: inputText,
      };
      
      const response = await sendMessageAPI(receiverRole, receiverId, newMessage);
      setMessages([...messages, response?.data]);
      setInputText('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {conversations.map(conversation => (
            <div 
              key={conversation._id} 
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                selectedConversation?._id === conversation._id ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
                    <img src="/api/placeholder/48/48" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    Participant {conversation.participants[1]}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.messages[conversation.messages.length - 1]?.text || 'No messages'}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {formatDate(conversation.updatedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b bg-white">
          {selectedConversation && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden">
                <img src="/api/placeholder/40/40" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-medium">Participant {selectedConversation.participants[1]}</h2>
                <p className="text-xs text-gray-500">Active Now</p>
              </div>
            </div>
          )}
          <div>
            <Settings className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map(message => (
            <div key={message._id} className={`flex mb-4 ${message.sent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${message.sent ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-lg p-3 ${
                  message.sent ? 'bg-blue-500 text-white' : 'bg-white'
                }`}>
                  <p>{message.text}</p>
                  {message.attachment && (
                    <div className="mt-2 p-2 bg-gray-50 rounded flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Paperclip className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-sm text-gray-600">{message.attachment.name}</span>
                    </div>
                  )}
                </div>
                <div className={`text-xs text-gray-400 mt-1 ${
                  message.sent ? 'text-right' : 'text-left'
                }`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-gray-600">
              <Paperclip className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="flex-1 p-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button className="text-gray-400 hover:text-gray-600">
              <Smile className="w-6 h-6" />
            </button>
            <button 
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;