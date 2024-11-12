import React, { useState, useEffect } from 'react';
import { getTutorListAPI } from '../../api/adminAPI/adminAPI';
import { useNavigate } from 'react-router-dom';
import Table from '../ui/Table';

interface Tutor {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    isBlocked: boolean;
}

const TutorList: React.FC = () => {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await getTutorListAPI();
                setTutors(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load Tutors');
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    const handleRowClick = (id: string) => {
        navigate(`/admin/tutor/${id}`);
    };

    const columns = [
        { 
            header: 'Tutor Name',
            accessor: 'name' as keyof Tutor
        },
        { 
            header: 'Email',
            accessor: 'email' as keyof Tutor
        },
        { 
            header: 'Mobile Number',
            accessor: 'mobile' as keyof Tutor
        },
        { 
            header: 'Status',
            accessor: 'isBlocked' as keyof Tutor,
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
            <h3 className="text-xl font-semibold px-2 pb-4">Tutors List</h3>
            <Table 
                data={tutors}
                columns={columns}
                itemsPerPage={10}
                onRowClick={(tutor) => handleRowClick(tutor._id)}
            />
        </div>
    );
};

export default TutorList;