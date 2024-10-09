// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { UserPen, BookOpen, X } from 'lucide-react';

// import { RootState } from '../../redux/store';
// import { getStudentDetailsAPI, updateStudentEducationAPI } from '../../api/studentAPI/studentAPI';

// interface StudentDetails {
//   _id: string;
//   name: string;
//   email: string;
//   mobile: number;
//   role: string;
//   isBlocked: boolean;
//   profileImage: string;
//   isVerified: boolean;
//   education?: {
//     level: string;
//     board: string;
//     startDate: string;
//     endDate: string;
//     grade: string;
//     institution: string;
//   }[];
// }

// const Profile: React.FC = () => {
//   const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [level, setLevel] = useState('');
//   const [board, setBoard] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [grade, setGrade] = useState('');
//   const [institution, setInstitution] = useState('');

//   const { studentInfo } = useSelector((state: RootState) => state.student);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setLevel('');
//     setBoard('');
//     setStartDate('');
//     setEndDate('');
//     setGrade('');
//     setInstitution('');
//   };

//   useEffect(() => {
//     const fetchStudentDetails = async (studentId: string) => {
//       try {
//         const response = await getStudentDetailsAPI(studentId);
//         setStudentDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch student details");
//         setLoading(false);
//       }
//     }
//     if(studentInfo?._id) {
//       fetchStudentDetails(studentInfo._id);
//     }
//   }, [studentInfo?._id]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!studentInfo?._id) return;

//     try {
//       const updatedStudent = await updateStudentEducationAPI(studentInfo._id, level, board, startDate, endDate, grade, institution);
//       setStudentDetails(updatedStudent?.data);
//       closeModal();
//     } catch (error) {
//       setError("Failed to update education");
//     }
//   };

//   if (loading) {
//     return <div>Loading student details...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!studentDetails) {
//     return <div>No student details found</div>;
//   }

//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 50; i--) {
//       years.push(<option key={i} value={i}>{i}</option>);
//     }
//     return years;
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
//           <div className="container mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Profile Section */}
//               <div className="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-1">
//                 <h2 className="text-xl font-bold mb-4">My profile</h2>
//                 <div className="mb-4 flex justify-center items-center">
//                   <img src={studentDetails.profileImage} alt="Profile" className="w-44 h-44 rounded-lg" />
//                 </div>
//                 <div className="flex items-center justify-between mt-4">
//                   <span className='font-bold text-3xl'>{studentDetails.name}</span>
//                   <div 
//                     className={`w-auto h-6 rounded-full text-white px-2 ${
//                       studentDetails.isBlocked ? 'bg-red-500' : 'bg-green-500'
//                     }`}
//                   >
//                     {studentDetails.isBlocked ? 'Blocked' : 'Active'}
//                   </div>
//                 </div>
//               </div>

//               {/* Personal Details Section */}
//               <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold">Personal Details</h2>
//                   <div className="flex space-x-2">
//                     <UserPen className="w-5 h-5 text-gray-400" />
//                     <span className="text-blue-500">Edit</span>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Email:</span> {studentDetails.email}</p>
//                   <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Mobile Number:</span> {studentDetails.mobile}</p>
//                   <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Role:</span> {studentDetails.role}</p>
//                   <p className="text-gray-600"><span className='text-gray-800 font-semibold'>Verified:</span> {studentDetails.isVerified ? 'Yes' : 'No'}</p>
//                 </div>
//               </div>

//               {/* Educational Qualifications */}
//               <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold">Education</h2>
//                 </div>
//                 {studentDetails.education && studentDetails.education.length > 0 ? (
//                   <div>
//                     {studentDetails.education.map((edu, index) => (
//                       <div key={index} className="mb-4 p-4 border rounded">
//                         <p className='text-sm font-bold pb-2'>{edu.level} in {edu.board}</p>
//                         <p className='text-xs font-medium text-gray-500 pb-2'>From {edu.institution}</p>
//                         <p className='text-xs font-medium  text-gray-800 pb-2'>With {edu.grade} Grade/CGPA</p>
//                         <p className='text-xs font-light'>During {edu.startDate} - {edu.endDate}</p>
//                       </div>
//                     ))}
//                     <button 
//                       className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                       onClick={openModal}
//                     >
//                       Add Another Qualification
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center">
//                     <BookOpen className="w-12 h-12 text-green-500 mb-2" />
//                     <p className="text-center text-sm text-gray-600 mb-4">
//                       Share your Educational Qualifications like your University and about your schooling.
//                     </p>
//                     <button 
//                       className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                       onClick={openModal}
//                     >
//                       Add Qualification
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Educational Qualification Modal */}
//             {isModalOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
//                   <div className="flex justify-between items-center p-6 border-b">
//                     <h2 className="text-xl font-bold">Educational Qualification</h2>
//                     <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                       <X className="w-6 h-6" />
//                     </button>
//                   </div>
//                   <form onSubmit={handleSubmit} className="p-6">
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
//                         <select
//                           className="w-full p-2 border rounded"
//                           value={level}
//                           onChange={(e) => setLevel(e.target.value)}
//                           required
//                         >
//                           <option value="">- Select -</option>
//                           <option>Ph.D</option>
//                           <option>Masters</option>
//                           <option>Bachelors</option>
//                           <option>Diploma</option>
//                           <option>Higher Secondary</option>
//                           <option>School</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Board/Department *</label>
//                         <input 
//                           type="text" 
//                           className="w-full p-2 border rounded" 
//                           placeholder='Enter your board'
//                           value={board}
//                           onChange={(e) => setBoard(e.target.value)}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Start Year *</label>
//                         <select
//                           className="w-full p-2 border rounded"
//                           value={startDate}
//                           onChange={(e) => setStartDate(e.target.value)}
//                           required
//                         >
//                           <option value="">Select Year</option>
//                           {generateYearOptions()}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year *</label>
//                         <select
//                           className="w-full p-2 border rounded"
//                           value={endDate}
//                           onChange={(e) => setEndDate(e.target.value)}
//                           required
//                         >
//                           <option value="">Select Year</option>
//                           {generateYearOptions()}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Grade/CGPA *</label>
//                         <input 
//                           type="text" 
//                           className="w-full p-2 border rounded"
//                           placeholder='Enter your grade'
//                           value={grade}
//                           onChange={(e) => setGrade(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">School/College/University Name *</label>
//                         <input 
//                           type="text"
//                           className="w-full p-2 border rounded"
//                           placeholder='Enter your institution'
//                           value={institution}
//                           onChange={(e) => setInstitution(e.target.value)}
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="flex justify-end">
//                       <button 
//                         type="submit" 
//                         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Profile;