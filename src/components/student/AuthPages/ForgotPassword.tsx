import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/students/forgot-password`, {
                email
            }, {
                withCredentials: true
            });

            if (response.status >= 200 && response.status < 300) {
                setMessage('Password reset link sent to your email.');
            } else {
                setIsError(true);
                setMessage(response.data.message || 'An unexpected error occurred');
            }
        } catch (error) {
            setIsError(true);
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Network error');
            } else {
                setMessage('An unknown error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-['Montserrat',sans-serif] min-h-screen py-10">
            <div className="bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[800px] max-w-full min-h-[600px]">
                {/* Left side - Email Input */}
                <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center">
                    <div className="w-full max-w-md p-8">
                        <h2 className="text-3xl font-bold text-center mb-8">Forgot Password</h2>
                        <p className="text-center mb-8">Enter your email to receive a password reset link.</p>
                        
                        <form onSubmit={handleSubmit} className="w-full">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 mb-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                                disabled={isSubmitting}
                            />
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#FF4B2B] text-white rounded-[20px] border-0 py-3 px-[45px] text-xs font-bold uppercase tracking-[1px] transition-all duration-80 ease-in hover:bg-[#FF416C] active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Reset Password'}
                            </button>
                        </form>

                        {isSubmitting && (
                            <p className="text-center mt-4 text-blue-600">Processing your request...</p>
                        )}

                        {!isError && message && (
                            <p className="text-center mt-4 text-green-600">{message}</p>
                        )}
                    </div>
                </div>

                {/* Right side - Gradient background with text */}
                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="px-10 text-center">
                            <h1 className="text-3xl font-bold mb-4">Hello, Student!</h1>
                            <p className="text-lg font-[100] leading-5 tracking-[0.5px] mb-5">
                                Enter your email to reset your password and regain access to your account.
                            </p>
                            <button 
                                onClick={() => navigate('/auth')}
                                className="rounded-[20px] border border-solid border-white bg-transparent text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;