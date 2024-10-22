import React, { useState } from 'react';
import { BookOpen, X, Pencil } from 'lucide-react';
import ConfirmActionDialog from '@/components/ui/ConfirmationBox';

interface Subject {
    _id?: string
    name: string;
    level: string;
}

interface SubjectDetailsProps {
    subjects?: Subject[];
    onSubjectAdd: (subjectData: Subject) => void;
    onSubjectDelete: (id: string) => void;
    onSubjectEdit: (editedSubject: Subject) => void;
}

const SubjectDetails: React.FC<SubjectDetailsProps> = ({
    subjects,
    onSubjectAdd,
    onSubjectDelete,
    onSubjectEdit
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [formData, setFormData] = useState<Subject>({
        name: '',
        level: '',
    });

    const openModal = (subject?: Subject) => {
        if (subject) {
            setEditingSubject(subject);
            setFormData(subject);
        } else {
            setEditingSubject(null);
            resetForm();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            level: '',
        });
        setEditingSubject(null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!formData.name || !formData.level) {
            alert('Please fill in all required fields');
            return;
        }

        if (editingSubject) {
            onSubjectEdit(formData);
        } else {
            onSubjectAdd(formData);
        }

        closeModal();
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDelete = (id: string) => {
        onSubjectDelete(id);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Subjects I Can Teach</h2>
            </div>

            {subjects && subjects.length > 0 ? (
                <div>
                    {subjects.map((subject) => (
                        <div key={subject._id} className="mb-4 p-4 border rounded relative">
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button 
                                    onClick={() => openModal(subject)} 
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    <Pencil size={16} />
                                </button>
                                <ConfirmActionDialog
                                    onConfirm={() => handleDelete(subject._id!)}
                                    triggerElement={{
                                        type: 'icon',
                                        content: '',
                                        iconName: 'Trash2'
                                    }}
                                    title="Delete Subject"
                                    description="Are you sure you want to delete this subject? This action cannot be undone."
                                    confirmText="Delete"
                                    cancelText="Cancel"
                                    variant="destructive"
                                />
                            </div>
                            <p className="text-sm font-bold pb-2">{subject.name}</p>
                        </div>
                    ))}
                    <button 
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        onClick={() => openModal()}
                    >
                        Add Another Subject
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <BookOpen className="w-12 h-12 text-green-500 mb-2" />
                    <p className="text-center text-sm text-gray-600 mb-4">
                        Add subjects you can teach along with your expertise level and pricing.
                    </p>
                    <button 
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        onClick={() => openModal()}
                    >
                        Add Subject
                    </button>
                </div>
            )}

            {/* Subject Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold">
                                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject Name *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Mathematics"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Level *
                                    </label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        name="level"
                                        value={formData.level}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Level</option>
                                        <option value="School">Upto School</option>
                                        <option value="Higher Secondary">Upto Higher Secondary</option>
                                        <option value="Graduation">Upto Graduation</option>
                                        <option value="Post Graduation">Upto Post Graduation</option>
                                        <option value="Any Level">Any Level</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    {editingSubject ? 'Save Changes' : 'Add Subject'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectDetails;