import React from 'react';

import AuthenticationForm from '../../components/studentComponents/AuthPages/StudentAuthenticationForm';
import Navbar from '../../components/studentComponents/Bars/Navbar';

const StudentAuthPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <AuthenticationForm />
        </>
    );
};

export default StudentAuthPage;