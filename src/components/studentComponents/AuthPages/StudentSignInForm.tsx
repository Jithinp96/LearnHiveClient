import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  errorMessage: string | null;
  loading: boolean;
}

const StudentSignInForm: React.FC<SignInProps> = ({ onSignIn, errorMessage, loading  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSignIn(email, password)
  }
    return (
      <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
        <img  className='h-16' src="../../src/assets/logo/Logo.png" alt="Logo" />
        <h1 className="text-2xl font-bold m-4">Student Sign In</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="my-5">
          <a href="#" className="border border-solid border-[#DDDDDD] rounded-full inline-flex justify-center items-center m-0 h-10 w-10"><FontAwesomeIcon icon={faGooglePlusG} /></a>
        </div>
        <span className="text-lg">or use your account</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" />
          <a href="#" className="text-[#333] text-sm no-underline mt-[15px]">Forgot your password?</a><br/>
          {/* <button className="rounded-[20px] border border-solid border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-[15px] active:scale-95 focus:outline-none">Sign In</button> */}
          <button
            className="rounded-[20px] border border-solid border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-[15px] active:scale-95 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        
        </form>
      </div>
    );
};

export default StudentSignInForm