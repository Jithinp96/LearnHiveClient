// import React, { useState, useEffect } from 'react';
// import { Search, Settings, Paperclip, Smile, Send } from 'lucide-react';
// import { useParams } from 'react-router-dom';
// import { getAllConversation, getUserConversation, sendMessageAPI } from '@/api/communicationAPI/chatAPI';
// import socket from '@/socket';

// interface Message {
//   _id: string;
//   text: string;
//   sent: boolean;
//   time: string;
//   senderId?: string;
//   receiverId?: string;
//   status?: 'sent' | 'delivered' | 'read';
//   attachment?: {
//     type: string;
//     name: string;
//   };
// }

// interface Users {
//   _id: string,
//   name: string,
//   profileImage: string
// }

// interface Conversation {
//   _id: string;
//   participants: string[];
//   messages: Message[];
//   createdAt: string;
//   updatedAt: string;
// }

// const ChatUI = () => {
//   const { receiverRole, receiverId } = useParams<{ receiverRole: string; receiverId: string }>();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState('');
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [users, setUsers] = useState<Users[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

//   // Replace with actual values from context or auth
//   const userId = "currentUserId";
//   const userRole = "student";

//   useEffect(() => {
//     const fetchUserConversation = async () => {
//       const includedConversation = await getUserConversation()
//       console.log("includedConversation: ", includedConversation);
//       setUsers(includedConversation?.data.conversations)
//     }
//     fetchUserConversation()
//    },[])

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation);
//     setMessages(conversation.messages);

//     socket.emit("joinRoom", {
//       roomId: conversation._id,
//       userId
//     });
//   };

//   const sendMessage = async () => {
//     console.log("Reached sendMessage function");
//     console.log("!inputText.trim(): ", !inputText.trim());
//     console.log("!selectedConversation: ", !selectedConversation);
    
//     if (!inputText.trim()){
//       console.log("Here");
//       return
//     } ;

//     const newMessage = {
//       senderId: userId,
//       senderRole: userRole,
//       receiverId: receiverId || selectedConversation?.participants.find(p => p !== userId),
//       receiverRole: receiverRole || 'tutor',
//       text: inputText
//     };

//     const optimisticMessage: Message = {
//       _id: Date.now().toString(),
//       text: inputText,
//       sent: true,
//       time: new Date().toISOString(),
//       status: 'sent'
//     };

//     setMessages(prev => [...prev, optimisticMessage]);
//     setInputText('');

//     try {
//       socket.emit("sendMessage", newMessage);

//       console.log("receiverRole: ", receiverRole);
//       console.log("receiverId: ", receiverId);
//       console.log("newMessage: ", newMessage);
      
//       const { data } = await sendMessageAPI(receiverRole!, receiverId!, newMessage);
//       setMessages(prev =>
//         prev.map(msg => msg._id === optimisticMessage._id ? { ...msg, _id: data.messageId, status: 'delivered' } : msg)
//       );
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages(prev => prev.filter(msg => msg._id !== optimisticMessage._id));
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-80 border-r bg-white">
//         <div className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search conversations..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
//             />
//           </div>
//         </div>
//         <div className="overflow-y-auto h-[calc(100vh-80px)]">
//           {users.map(user => (
//             <div
//               key={user._id}
//               className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
//                 selectedConversation?._id === user._id ? 'bg-gray-100' : ''
//               }`}
//               // onClick={() => handleSelectConversation(conversation)}
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
//                   <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-medium text-gray-800">
//                     {user.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 truncate">
//                     {/* {conversation.messages[conversation.messages.length - 1]?.text || 'No messages'} */}
//                   </p>
//                 </div>
//                 <span className="text-xs text-gray-400">
//                   {/* {formatDate(conversation.updatedAt)} */}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="h-16 flex items-center justify-between px-4 border-b bg-white">
//           {selectedConversation && (
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden">
//                 <img src="/api/placeholder/40/40" alt="avatar" className="w-full h-full object-cover" />
//               </div>
//               <div>
//                 <h2 className="font-medium">Participant {selectedConversation.participants[1]}</h2>
//                 <p className="text-xs text-gray-500">Active Now</p>
//               </div>
//             </div>
//           )}
//           <div>
//             <Settings className="w-6 h-6 text-gray-500" />
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//           {messages.map(message => (
//             <div key={message._id} className={`flex mb-4 ${message.sent ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-[70%] ${message.sent ? 'order-2' : 'order-1'}`}>
//                 <div className={`rounded-lg p-3 ${
//                   message.sent ? 'bg-blue-500 text-white' : 'bg-white'
//                 }`}>
//                   <p>{message.text}</p>
//                   {message.attachment && (
//                     <div className="mt-2 p-2 bg-gray-50 rounded flex items-center space-x-2">
//                       <Paperclip className="w-4 h-4 text-gray-400" />
//                       <span>{message.attachment.name}</span>
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-400 mt-1 text-right">
//                   {formatDate(message.time)} - {message.status}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="h-20 px-4 py-2 flex items-center space-x-3 bg-white border-t">
//           <Smile className="w-6 h-6 text-gray-400 cursor-pointer" />
//           <input
//             type="text"
//             className="flex-1 p-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
//             placeholder="Type your message..."
//             value={inputText}
//             onChange={e => setInputText(e.target.value)}
//             onKeyDown={handleKeyPress}
//           />
//           <Send className="w-6 h-6 text-blue-500 cursor-pointer" onClick={sendMessage} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatUI;

import React, { useState, useEffect } from 'react';
import { getUserConversationAPI, sendMessageAPI } from '@/api/communicationAPI/chatAPI';
import socket from '@/socket';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import DefaultUI from './DefaultUI';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface Message {
  _id: string;
  message: string;
  sent: boolean;
  time: string;
  senderId?: string;
  receiverId?: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: string;
    name: string;
  };
}

export interface Users {
  _id: string;
  name: string;
  profileImage: string;
  role: string
}

export interface Conversation {
  _id: string;
  participants: string[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const ChatUI: React.FC = () => {
  // const { receiverRole, receiverId } = useParams<{ receiverRole: string; receiverId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [users, setUsers] = useState<Users[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const studentInfo = useSelector((state: RootState) => state.student.studentInfo);
  const tutorInfo = useSelector((state: RootState) => state.tutor.tutorInfo);

  // Determine current user ID and role based on selected conversation's participant type
  let currentUserId: string = '';
  let userRole: string = '';
  // console.log("selectedConversation?.participants[3]: ", selectedConversation?.participants[3]);

  if (selectedConversation?.participants[3] === 'Tutor') {
    currentUserId = studentInfo?._id ?? '';
    userRole = studentInfo?.role ?? '';
  } else if (selectedConversation?.participants[3] === 'Student') {
    currentUserId = tutorInfo?._id ?? '';
    userRole = tutorInfo?.role ?? '';
  }
  // console.log("currentUserId: ", currentUserId);
  // console.log("userRole: ", userRole);

  useEffect(() => {
    const fetchUserConversation = async () => {
      const includedConversation = await getUserConversationAPI()
      // console.log("includedConversation: ", includedConversation);
      setUsers(includedConversation?.data.conversations)
    }
    fetchUserConversation()
   },[])
   
  const handleSelectConversation = (user: Users) => {
    const conversation: Conversation = {
      _id: user._id,
      participants: [user._id, user.name, user.profileImage, user.role],
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedConversation(conversation);
    setMessages(conversation.messages);
    
    // Set currentUserId and userRole based on selected conversation
    let selectedUserId = '';
    // let selectedUserRole = '';

    if (conversation.participants[3] === 'Tutor') {
      selectedUserId = studentInfo?._id ?? '';
      // selectedUserRole = studentInfo?.role ?? '';
    } else if (conversation.participants[3] === 'Student') {
      selectedUserId = tutorInfo?._id ?? '';
      // selectedUserRole = tutorInfo?.role ?? '';
    }

    // console.log("currentUserId:", selectedUserId);
    
    // Emit socket event with the current user ID
    socket.emit("joinRoom", {
      userId: selectedUserId
    });
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      senderId: currentUserId,
      senderRole: userRole,
      receiverId: selectedConversation?.participants[0],
      receiverRole: selectedConversation?.participants[3],
      text: inputText
    };

    const optimisticMessage: Message = {
      _id: Date.now().toString(),
      message: inputText,
      sent: true,
      time: new Date().toISOString(),
      status: 'sent',
      senderId: currentUserId
    };

    setMessages(prev => [...prev, optimisticMessage]);
    setInputText('');

    try {
      socket.emit("sendMessage", newMessage);
      const response  = await sendMessageAPI(newMessage);
      // console.log("data: ", response);
      
      setMessages(prev =>
        prev.map(msg => msg._id === optimisticMessage._id ? { ...msg, _id: response._id, status: 'delivered' } : msg)
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.filter(msg => msg._id !== optimisticMessage._id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        users={users}
        selectedConversation={selectedConversation}
        handleSelectConversation={handleSelectConversation}
      />
      {selectedConversation ? (
        <ChatWindow
          selectedConversation={selectedConversation}
          messages={messages}
          setMessages={setMessages}
          inputText={inputText}
          setInputText={setInputText}
          sendMessage={sendMessage}
          formatDate={formatDate}
          currentUserId={currentUserId}
        />
      ) : (
        <DefaultUI />
      )}
    </div>
  );
};

export default ChatUI;