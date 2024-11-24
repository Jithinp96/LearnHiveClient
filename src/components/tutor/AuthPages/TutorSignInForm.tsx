import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { validateSignInForm } from "@/utils/Validations";

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  onGoogleSignIn: (credential: string) => void;
  errorMessage: string | null;
  loading: boolean;
}

const TutorSignInForm: React.FC<SignInProps> = ({ 
  onSignIn, 
  onGoogleSignIn,
  errorMessage: serverErrorMessage, 
  loading 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    setValidationError("");

    const validation = validateSignInForm(email, password);
    if (!validation.isValid) {
      setValidationError(validation.errorMessage);
      return;
    }

    onSignIn(email, password)
  }
    return (
      <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
        <img  
          className='h-16' 
          src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/Logo.png" 
          alt="Logo" 
        />
        <h1 className="text-2xl font-bold m-4">Tutor Sign In</h1>

        {serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
        {validationError && <ErrorMessage message={validationError} />}

        <div className="my-5">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse?.credential) {
                onGoogleSignIn(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <span className="text-sm">or use your account</span>

        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" 
          />

          <Link
            to={"/tutor/forgot-password"}
            className="text-[#333] text-sm no-underline block"
          >
            Forgot your password?
          </Link>
          <button
            className="rounded-[20px] bg-gradient-to-r from-[#62af8f] to-[#48ffb3] text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-[15px] active:scale-95 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
};

export default TutorSignInForm