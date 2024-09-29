import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

interface SignUpProps {
  onRegister: (name: string, email: string, mobile: number, password: string) => void;
}

const StudentRegistrationForm: React.FC<SignUpProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState<number | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(!name || !email || !mobile || !password || !confirmPassword) {
      setErrorMessage('All fields are required')
      return
    }
    if(mobile.toString().length !== 10) {
      setErrorMessage('Mobile number should be 10 digits')
      return
    }
    if(password.length <6) {
      setErrorMessage('Password length should be more than 6')
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage('');

    onRegister(name, email, mobile, password);
  };

  return (
    <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
      <img className="h-11" src="../../src/assets/logo/Logo.png" alt="Logo" />
      <h1 className="font-bold">Student Create Account</h1>
      <div className="my-2">
        <a href="#" className="border border-solid border-[#DDDDDD] rounded-full inline-flex justify-center items-center h-10 w-10">
          <FontAwesomeIcon icon={faGooglePlusG} />
        </a>
      </div>
      <span className="text-lg">or use your account</span>
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
          onChange={(e) => setMobile(e.target.value)}
          className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full"
        />
        {errorMessage && <span className="text-red-500 text-lg">{errorMessage}</span>}
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
