import React, { useState } from 'react';
import { BookOpen, X, Pencil, Trash2 } from 'lucide-react';
import { addTutorEducationAPI } from '@/api/tutorAPI/tutorAxios';

interface Education {
    id?: string;
    level: string;
    board: string;
    startDate: string;
    endDate: string;
    grade: string;
    institution: string;
}

interface EducationDetailsProps {
    education?: Education[];
    tutorId: string;
    onEducationUpdate: () => void;
}

const EducationDetails: React.FC<EducationDetailsProps> = ({ 
    education,
    tutorId,
    onEducationUpdate,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState<Education | null>(null);
    const [newEducation, setNewEducation] = useState<Education>({
        id: '',
        level: '',
        board: '',
        startDate: '',
        endDate: '',
        grade: '',
        institution: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const openModal = (edu?: Education) => {
        if (edu) {
            setEditingEducation(edu);
            setNewEducation({
                ...edu,
                startDate: edu.startDate.slice(0, 10),
                endDate: edu.endDate.slice(0, 10),
            });
        } else {
            setEditingEducation(null);
            resetForm();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setNewEducation({
            id: '',
            level: '',
            board: '',
            startDate: '',
            endDate: '',
            grade: '',
            institution: '',
        });
        setEditingEducation(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await addTutorEducationAPI(
                tutorId,
                newEducation.id?? null,
                newEducation.level,
                newEducation.board,
                newEducation.startDate,
                newEducation.endDate,
                newEducation.grade,
                newEducation.institution
            );
            onEducationUpdate();
            closeModal();
        } catch (error) {
            console.error("Error updating education:", error);
            alert("Failed to update education. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewEducation(prev => ({ ...prev, [name]: value }));
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= currentYear - 50; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    };

  return (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Education</h2>
        </div>
        {education && education.length > 0 ? (
            <div>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-4 p-4 border rounded relative">
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button 
                        onClick={() => openModal(edu)} 
                        className="text-blue-500 hover:text-blue-600"
                        >
                        <Pencil size={16} />
                        </button>
                        <button
                        className="text-red-500 hover:text-red-600"
                        >
                        <Trash2 size={16} />
                        </button>
                    </div>
                    <p className='text-sm font-bold pb-2'>{edu.level} in {edu.board}</p>
                    <p className='text-xs font-medium text-gray-500 pb-2'>From {edu.institution}</p>
                    <p className='text-xs font-medium text-gray-800 pb-2'>With {edu.grade} Grade/CGPA</p>
                    <p className='text-xs font-light'>During {edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
                <button 
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => openModal()}
                >
                    Add Another Qualification
                </button>
            </div>
        ) : (
            <div className="flex flex-col items-center">
                <BookOpen className="w-12 h-12 text-green-500 mb-2" />
                <p className="text-center text-sm text-gray-600 mb-4">
                    Share your Educational Qualifications like your University and about your schooling.
                </p>
                <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => openModal()}
                >
                    Add Qualification
                </button>
            </div>
        )}

        {/* Educational Qualification Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-xl font-bold">
                            {editingEducation ? 'Edit Educational Qualification' : 'Add Educational Qualification'}
                        </h2>
                        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    name="level"
                                    value={newEducation.level}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">- Select -</option>
                                    <option>Ph.D</option>
                                    <option>Masters</option>
                                    <option>Bachelors</option>
                                    <option>Diploma</option>
                                    <option>Higher Secondary</option>
                                    <option>School</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Board/Department *</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded" 
                                    placeholder='Enter your board'
                                    name="board"
                                    value={newEducation.board}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Year *</label>
                            <select
                                className="w-full p-2 border rounded"
                                name="startDate"
                                value={newEducation.startDate}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Year</option>
                                {generateYearOptions()}
                            </select>
                            </div>
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year *</label>
                            <select
                                className="w-full p-2 border rounded"
                                name="endDate"
                                value={newEducation.endDate}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Year</option>
                                {generateYearOptions()}
                            </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade/CGPA *</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded"
                                placeholder='Enter your grade'
                                name="grade"
                                value={newEducation.grade}
                                onChange={handleInputChange}
                                required
                            />
                            </div>
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School/College/University Name *</label>
                            <input 
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder='Enter your institution'
                                name="institution"
                                value={newEducation.institution}
                                onChange={handleInputChange}
                                required
                            />
                            </div>
                        </div>
                    
                        <div className="flex justify-end">
                            <button 
                            type="submit" 
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            >
                            {editingEducation ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </div>
    );
};

export default EducationDetails;