import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500 cursor-help" />
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 px-4 py-2 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg -top-2 left-full ml-2">
          {children}
        </div>
      )}
    </div>
  );
};

const PasswordInput: React.FC<{ 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  placeholder: string,
  showTooltip?: boolean
}> = ({ value, onChange, placeholder, showTooltip = false }) => (
  <div className="relative w-full mb-4">
    <input
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      required
    />
    {showTooltip && (
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Tooltip>
          <h3 className="font-medium text-gray-900">Password Rules:</h3>
          <ul className="mt-2 list-disc list-inside">
            <li>At least 8 characters long</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>At least one special character (!@#$%^&*)</li>
          </ul>
        </Tooltip>
      </div>
    )}
  </div>
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

  const passwordRules = [
    { rule: /.{8,}/, description: "At least 8 characters long" },
    { rule: /[A-Z]/, description: "At least one uppercase letter" },
    { rule: /[a-z]/, description: "At least one lowercase letter" },
    { rule: /[0-9]/, description: "At least one number" },
    { rule: /[!@#$%^&*]/, description: "At least one special character (!@#$%^&*)" }
  ];

  const validatePassword = (password: string) => {
    return passwordRules.every(({ rule }) => rule.test(password));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    if (!validatePassword(newPassword)) {
      setIsError(true);
      setMessage('Password does not meet the required criteria');
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/students/reset-password?token=${token}`, {
        newPassword: newPassword,
      });

      if (response.status >= 200 && response.status < 300) {
        setMessage('Password reset successful. You will be redirected to login in 2 seconds!');
        setTimeout(() => navigate('/auth'), 2000);
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
                showTooltip={true}
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
          <div className="bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="px-10 text-center">
              <h1 className="text-3xl font-bold mb-4">Almost there!</h1>
              <p className="text-lg font-[100] leading-5 tracking-[0.5px] mb-5">
                Enter your new password to regain access to your account.
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

export default ResetPassword;