import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { registerStudent } from '../redux/slices/studentSlice';
import StudentRegisterForm from '../components/StudentRegistrationForm';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleRegister = (name: string, email: string, mobile: number, password: string) => {
        dispatch(registerStudent({ name, email, mobile, password }));
    };

    return (
        <div>
            <h1>Register as a Student</h1>
            <StudentRegisterForm onRegister={handleRegister} />
        </div>
    );
};

export default RegisterPage;
