import React, { useState } from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Tooltip from '@/components/ui/ToolTip';
import Loader from '@/components/ui/Loader';
import FloatingLabelInput from '@/components/ui/FloatingInput';
import AuthPageButton from '@/components/ui/AuthPageButton';
import { passwordRules, validateRegistrationForm } from '@/utils/Validations';

interface SignUpProps {
  onRegister: (name: string, email: string, mobile: number, password: string) => void;
}

const StudentRegistrationForm: React.FC<SignUpProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validation = validateRegistrationForm(
      name,
      email,
      mobile,
      password,
      confirmPassword
    );

    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage);
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    
    try {
      await onRegister(name, email, Number(mobile), password);
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full">
        <Loader message="Generating OTP..." size="large" />
      </div>
    );
  }

  const inputContainerStyles = "relative w-full";
  const tooltipContainerStyles = "absolute right-3 top-1/2 transform -translate-y-1/2 z-[9999]";
  const passwordInputStyles = "pr-10";

  return (
    <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
      <img className="h-11" src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/Logo.png" alt="Logo" />
      <h1 className="font-bold my-3">Student Create Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-4">
        <div className={inputContainerStyles}>
          <FloatingLabelInput
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className={inputContainerStyles}>
          <FloatingLabelInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className={inputContainerStyles}>
          <FloatingLabelInput
            label="Mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            required
          />
        </div>
        
        <div className={inputContainerStyles}>
          <FloatingLabelInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={passwordInputStyles}
          />
          <div className={tooltipContainerStyles}>
            <Tooltip>
              <div className="bg-white shadow-lg rounded p-3 text-left">
                <h3 className="font-medium text-gray-900">Password Rules:</h3>
                <ul className="mt-2 list-disc list-inside">
                  {passwordRules.map(({ description }, index) => (
                    <li key={index}>{description}</li>
                  ))}
                </ul>
              </div>
            </Tooltip>
          </div>
        </div>
        
        <div className={inputContainerStyles}>
          <FloatingLabelInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <ErrorMessage message={errorMessage} />
        <AuthPageButton
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
        >
          Proceed
        </AuthPageButton>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;