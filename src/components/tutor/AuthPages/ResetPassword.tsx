import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordInput: React.FC<{ 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  placeholder: string 
}> = ({ value, onChange, placeholder }) => (
  <input
    type="password"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-2 mb-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    required
  />
);

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tutor/reset-password?token=${token}`, {
        newPassword: newPassword,
      });

      if (response.status >= 200 && response.status < 300) {
        setMessage('Password reset successful. You will be redirected to login in 3 seconds!');
        setTimeout(() => navigate('/tutor/auth'), 3000);
      } else {
        setIsError(true);
        setMessage(response.data.message || 'An unexpected error occurred');
      }
    } catch (error) {
      setIsError(true);
      setMessage('An error occurred while resetting the password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-['Montserrat',sans-serif] min-h-screen py-10">
      <div className="bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[800px] max-w-full min-h-[600px]">
        {/* Left side - Password Reset Form */}
        <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center">
          <div className="w-full max-w-md p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Reset Password</h2>
            <p className="text-center mb-8">Enter your new password below.</p>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <PasswordInput 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="New Password" 
              />
              <PasswordInput 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm New Password" 
              />
              {message && (
                <p className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
              )}
              <button 
                type="submit"
                className="w-full bg-[#FF4B2B] text-white rounded-[20px] border-0 py-3 px-[45px] text-xs font-bold uppercase tracking-[1px] transition-all duration-80 ease-in hover:bg-[#FF416C] active:scale-95 focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Gradient background with text */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
          <div className="bg-gradient-to-r from-[#1c8b5d] to-[#48ffb3] text-white absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="px-10 text-center">
              <h1 className="text-3xl font-bold mb-4">Almost there!</h1>
              <p className="text-lg font-[100] leading-5 tracking-[0.5px] mb-5">
                Enter your new password to regain access to your account.
              </p>
              <button 
                onClick={() => navigate('/tutor/auth')}
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

export default ResetPassword;