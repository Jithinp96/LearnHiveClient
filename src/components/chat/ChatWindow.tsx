import React, { useEffect, useRef } from 'react';
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
  currentUserId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Improved date formatting function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Get hours and minutes, format in 12-hour clock
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${hours}:${minutes} ${ampm}`;
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(()=>{
    socket.on('receiveMessage',(data)=>{
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
                {formatDate(message.createdAt ?? "")}
              </p>
            </div>
          </div>
        ))}
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
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