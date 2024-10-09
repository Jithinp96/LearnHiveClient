import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface SignUpProps {
  onRegister: (name: string, email: string, mobile: number, password: string) => void;
}

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

const StudentRegistrationForm: React.FC<SignUpProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(!name || !email || !mobile || !password || !confirmPassword) {
      setErrorMessage('All fields are required')
      return
    }
    if(mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setErrorMessage('Mobile number should be 10 digits');
      return;
    }
    // if(!validatePassword(password)) {
    //   setErrorMessage('Password does not meet the required criteria');
    //   return;
    // }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage('');
    onRegister(name, email, Number(mobile), password);
  };

  return (
    <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
      <img className="h-11" src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/Logo.png" alt="Logo" />
      <h1 className="font-bold">Student Create Account</h1>
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
        {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
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

export default StudentRegistrationForm;
