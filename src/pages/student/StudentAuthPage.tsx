import React from 'react';

import AuthenticationForm from '../../components/student/AuthPages/StudentAuthenticationForm';
import Navbar from '../../components/student/Bars/Navbar';

const StudentAuthPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <AuthenticationForm />
        </>
    );
};

export default StudentAuthPage;