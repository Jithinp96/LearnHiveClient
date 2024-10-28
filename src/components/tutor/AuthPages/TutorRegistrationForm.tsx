import React, { useState } from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Tooltip from '@/components/ui/ToolTip';
import Loader from '@/components/ui/Loader';
import { passwordRules, validateRegistrationForm } from '@/utils/Validations';

interface SignUpProps {
  onRegister: (name: string, email: string, mobile: number, password: string) => void;
}

const TutorRegistrationForm: React.FC<SignUpProps> = ({ onRegister }) => {
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

  return (
    <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
      <img className="h-11" src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/Logo.png" alt="Logo" />
      <h1 className="font-bold">Tutor Create Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full"
        />
        <input
          type="tel"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
          className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full"
        />
        <div className="relative w-full">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full pr-10"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-50">
            <Tooltip>
              <h3 className="font-medium text-gray-900">Password Rules:</h3>
              <ul className="mt-2 list-disc list-inside">
                {passwordRules.map(({ description }, index) => (
                  <li key={index}>{description}</li>
                ))}
              </ul>
            </Tooltip>
          </div>
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full"
        />
        <ErrorMessage message={errorMessage} />
        <button
          type="submit"
          className="rounded-[20px] border border-solid border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-[15px] active:scale-95 focus:outline-none"
        >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default TutorRegistrationForm;