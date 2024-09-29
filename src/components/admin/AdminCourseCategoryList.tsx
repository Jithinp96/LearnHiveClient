import React, { useState, useEffect } from "react";
import { Edit, Plus } from "lucide-react";
import { fetchCategories, addCategory, editCategory, toggleCategoryStatus } from "../../api/adminAPI/adminAPI";

interface Category {
    _id: string;
    name: string;
    status: boolean;
    coursesCount: number | 0;
}

const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md mr-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatusToggle: React.FC<{
    status: boolean;
    onChange: () => void;
}> = ({ status, onChange }) => (
    <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            status === true ? "bg-green-500" : "bg-gray-300"
        }`}
        onClick={onChange}
    >
        <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                status === false ? "translate-x-6" : ""
            }`}
        ></div>
    </div>
);

const AdminCourseCategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [currentCategory, setCurrentCategory] = useState<Category | null>(
        null
    );
    const [newCategoryName, setNewCategoryName] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error loading categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddCategory = () => {
        setModalMode("add");
        setCurrentCategory(null);
        setNewCategoryName("");
        setIsModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setModalMode("edit");
        setCurrentCategory(category);
        setNewCategoryName(category.name);
        setIsModalOpen(true);
    };

    const handleStatusToggle = async (_id: string) => {
        const category = categories.find((cat) => cat._id === _id);
        console.log("category: ", category);
        
        if (category) {
            const newStatus = category.status === false ? true : false;
            try {
                await toggleCategoryStatus(_id, newStatus);
                setCategories(
                    categories.map((cat) =>
                        cat._id === _id ? { ...cat, status: newStatus } : cat
                    )
                );
            } catch (error) {
                console.error("Error toggling category status:", error);
            }
        }
    };

    const handleSaveCategory = async () => {
        if (!newCategoryName.trim()) {
            alert("Category name cannot be empty");
            return;
        }

        if (modalMode === "add") {
            try {
                const newCategory = await addCategory(newCategoryName);
                console.log("newCategory: ", newCategory);
                
                setCategories([...categories, newCategory]);
            } catch (error) {
                console.log("Add category catch");
                
                console.error("Error adding category:", error);
            }
        } else {
            try {
                if (currentCategory) {
                    await editCategory(currentCategory._id, newCategoryName);
                    setCategories(
                        categories.map((cat) =>
                            cat._id === currentCategory._id
                                ? { ...cat, name: newCategoryName }
                                : cat
                        )
                    );
                }
            } catch (error) {
                console.error("Error editing category:", error);
            }
        }
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Course Categories</h1>
                <button
                    onClick={handleAddCategory}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <Plus size={20} className="mr-2" />
                    Add Category
                </button>
            </div>
            {loading ? (
                <p>Loading categories...</p>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500">
                            <th className="py-3 pl-4">Name</th>
                            <th className="py-3">No of Courses</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id} className="border-b border-gray-200">
                                <td className="py-4 pl-4">{category.name}</td>
                                <td className="py-4">{category.coursesCount}</td>
                                <td className="py-4">
                                    
                                    <StatusToggle
                                        status={category.status}
                                        onChange={() => handleStatusToggle(category._id)}
                                    />
                                </td>
                                <td className="py-4">
                                    <button
                                        onClick={() => handleEditCategory(category)}
                                        className="text-blue-600 font-medium flex items-center"
                                    >
                                        <Edit size={18} className="mr-1" />
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "add" ? "Add Category" : "Edit Category"}
            >
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category Name"
                    className="w-full px-3 py-2 border rounded-md"
                />
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSaveCategory}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Save
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AdminCourseCategoryList;
