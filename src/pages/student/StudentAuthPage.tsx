import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AuthenticationForm from '../../components/student/AuthPages/StudentAuthenticationForm';
import Navbar from '@/components/student/Bars/Navbar';

const StudentAuthPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <GoogleOAuthProvider clientId="183915678498-43rbg6rbib4ji69q2ok2oftm8eqk6a7g.apps.googleusercontent.com">
                <AuthenticationForm />
            </GoogleOAuthProvider>
        </>
    );
};

export default StudentAuthPage;