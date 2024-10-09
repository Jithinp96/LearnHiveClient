import React from "react";

interface TaskRowProps {
    subject: string;
    task: string;
    submitted: string;
    status: 'Completed' | 'In process' | 'Not started';
}
  
const TaskRow: React.FC<TaskRowProps> = ({ subject, task, submitted, status }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-blue-100 text-blue-800';
            case 'In process': return 'bg-green-100 text-green-800';
            case 'Not started': return 'bg-red-100 text-red-800';
            default: return '';
        }
    };
  
    return (
        <tr className="border-b border-gray-200">
            <td className="py-2 text-blue-600">{subject}</td>
            <td>{task}</td>
            <td>{submitted}</td>
            <td>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
};

const Course: React.FC = () => {
    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
                            <a href="/tutor/add-course">
                                <button>Add New Course</button>
                            </a>
                    </header>

                    <div className="mt-8 bg-white p-6 rounded-lg shadow">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="py-2">Course Name</th>
                                    <th>Category</th>
                                    <th>Created On</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TaskRow 
                                    subject="Textile Coloration" 
                                    task="Report < Dyeing of textile substrate...>" 
                                    submitted="27 Feb 2023 10:00 AM"
                                    status="Completed"
                                />
                                <TaskRow 
                                    subject="Textile Finishing" 
                                    task="Read < Shearing and cropping... >" 
                                    submitted="28 Feb 2023 09:00 AM"
                                    status="Completed"
                                />
                                <TaskRow 
                                    subject="Textile Physics" 
                                    task="Report < Application of different... >" 
                                    submitted="04 Mar 2023 12:00 PM"
                                    status="In process"
                                />
                                <TaskRow 
                                    subject="Special Wet" 
                                    task="Read < Properties and structure... >" 
                                    submitted="07 Mar 2023 10:00 AM"
                                    status="In process"
                                />
                                <TaskRow 
                                    subject="Textile Coloration" 
                                    task="Read < Azo dye, sulphur dye,dis... >" 
                                    submitted="11 Mar 2023 12:00 PM"
                                    status="Not started"
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Course