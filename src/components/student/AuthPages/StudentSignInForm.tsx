import React, { useState } from "react";
import ErrorMessage from '@/components/ui/ErrorMessage';
import { validateSignInForm } from "@/utils/Validations";
import AuthPageButton from "@/components/ui/AuthPageButton";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginStudentAPI } from "@/api/studentAPI/studentAPI";
import { studentLoginSuccess } from "@/redux/slices/studentSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  errorMessage: string | null;
  loading: boolean;
}

const StudentSignInForm: React.FC<SignInProps> = ({
  onSignIn,
  errorMessage: serverErrorMessage,
  loading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setValidationError("");

    const validation = validateSignInForm(email, password);
    if (!validation.isValid) {
      setValidationError(validation.errorMessage);
      return;
    }

    onSignIn(email, password);
  };

  return (
    <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
      <img
        className="h-16"
        src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/Logo.png"
        alt="Logo"
      />
      <h1 className="text-2xl font-bold m-4">Student Sign In</h1>
      
      {/* <ErrorMessage message={serverErrorMessage || undefined} />
      
      <ErrorMessage message={validationError} /> */}
      {serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      {validationError && <ErrorMessage message={validationError} />}

      <div className="my-5">
          {/* <Link to={'#'}
            className="border border-solid border-[#DDDDDD] rounded-full inline-flex justify-center items-center m-0 h-10 w-10"
          >
            <FontAwesomeIcon icon={faGooglePlusG} />
          </Link> */}

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const credential = credentialResponse?.credential;

          if (!credential) {
            console.error('Google credential is missing.');
            return; // Exit early if credential is undefined
          }

          try {
            const response = await googleLoginStudentAPI(credential);
            console.log('Login Success:', response.data);
            if (response && response.status === 200) {
              dispatch(studentLoginSuccess(response.data.student));
              navigate("/dashboard");
            } else {
              setErrorMessage("Invalid credentials or server error. Please try again!");
            }
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              setErrorMessage(error.response.data?.message || "An error occurred. Please try again!");
            } else {
              setErrorMessage("An unexpected error occurred. Please try again!");
            }
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
        </div>
        <span className="text-sm">or use your account</span>
      
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" />

        <Link to={'/forgot-password'}
          className="text-[#333] text-sm no-underline block"
        >
          Forgot your password?
        </Link>
        
        <AuthPageButton
          disabled={loading}
          type="submit"
        >
          {loading ? "Signing In..." : "Sign In"}
        </AuthPageButton>
      </form>
    </div>
  );
};

export default StudentSignInForm;