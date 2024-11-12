import React, { useState, useEffect } from 'react';
import { getStudentsListAPI } from '../../api/adminAPI/adminAPI';
import { useNavigate } from 'react-router-dom';
import Table from '../ui/Table';

interface Student {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    isBlocked: boolean;
}

const AdminStudentsList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudentsListAPI();
                setStudents(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load students');
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleRowClick = (id: string) => {
        navigate(`/admin/student/${id}`);
    };

    const columns = [
        { 
            header: 'Student Name',
            accessor: 'name' as keyof Student
        },
        { 
            header: 'Email',
            accessor: 'email' as keyof Student
        },
        { 
            header: 'Mobile Number',
            accessor: 'mobile' as keyof Student
        },
        { 
            header: 'Status',
            accessor: 'isBlocked' as keyof Student,
            render: (value: boolean) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    !value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {value ? 'Blocked' : 'Active'}
                </span>
            )
        }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-gray-50 p-4">
            <h3 className="text-xl font-semibold px-2 pb-4">Students List</h3>
            <Table 
                data={students}
                columns={columns}
                itemsPerPage={10}
                onRowClick={(student) => handleRowClick(student._id)}
            />
        </div>
    );
};

export default AdminStudentsList;