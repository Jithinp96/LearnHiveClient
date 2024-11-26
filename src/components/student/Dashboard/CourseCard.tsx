// import React from 'react';

// interface CourseData {
//     _id: string;
//     title: string;
//     thumbnailUrl: string;
// }

// export interface Course {
//     _id: string;
//     courseId: CourseData;
//     progressPercentage: number;
//     isCompleted: boolean;
//     totalVideos: number;
//     completedVideos: string[];
//     lastAccessedDate?: string;
// }

// interface CourseCardProps {
//     course: Course;
// }

// const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
//     const getCompletionStatus = (): 'Not-Started' | 'In-Progress' | 'Completed' => {
//         if (course.isCompleted) return 'Completed';
//         if (course.progressPercentage > 0) return 'In-Progress';
//         return 'Not-Started';
//     };

//     return (
//         <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4 hover:bg-gray-50 transition-colors">
//             <img 
//                 src={course.courseId.thumbnailUrl} 
//                 alt={`${course.courseId.title} thumbnail`} 
//                 className="w-24 h-16 rounded-lg object-cover" 
//             />
//             <div className="flex-grow">
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">
//                     {course.courseId.title}
//                 </h3>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//                     <div 
//                         className="bg-emerald-400 h-2.5 rounded-full" 
//                         style={{ width: `${course.progressPercentage}%` }}
//                     ></div>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-500">
//                     <span>{course.progressPercentage}% Complete</span>
//                     <span>
//                         {course.completedVideos.length} / {course.totalVideos} Videos
//                     </span>
//                 </div>
//             </div>
//             <button 
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
//             >
//                 Continue
//             </button>
//         </div>
//     );
// };

// export default CourseCard;