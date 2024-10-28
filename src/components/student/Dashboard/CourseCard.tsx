import React from 'react';

interface CourseData {
    _id: string;
    title: string;
    thumbnailUrl: string;
}

export interface Course {
    _id: string;
    courseId: CourseData;
    progress: number;
    completionStatus: 'Not-Started' | 'In-Progress' | 'Completed';
}

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className={`w-20 h-12 flex items-center justify-center mr-4`}>
            <img 
                src={course.courseId.thumbnailUrl} 
                alt={`${course.courseId.title} thumbnail`} 
                className="w-20 h-12 rounded-lg object-cover" 
            />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-1">{course.courseId.title}</h3>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded text-sm">
                continue
            </button>
        </div>
    );
};

export default CourseCard;