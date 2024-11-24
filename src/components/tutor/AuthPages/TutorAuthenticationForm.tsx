import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { tutorLoginSuccess } from "../../../redux/slices/tutorSlice";
import { googleLoginTutorAPI, loginTutorAPI, registerTutorAPI } from "../../../api/tutorAPI/tutorAxios";

import TutorRegistrationForm from "./TutorRegistrationForm";
import TutorSignInForm from "./TutorSignInForm";

const TutorAuthenticationForm: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const registrationType = 'tutor';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleForm = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSignUp(!isSignUp);
        setErrorMessage(null);
    };

    const handleGoogleSignIn = async (credential: string) => {
        if (!credential) {
          toast.error("Google credential is missing.");
          return;
        }
    
        try {
          const response = await googleLoginTutorAPI(credential);
          if (response && response.status === 200) {
            dispatch(tutorLoginSuccess(response.data.tutor));
            navigate("/tutor/dashboard");
          } else {
            setErrorMessage("Invalid credentials or server error. Please try again!");
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            setErrorMessage(
              error.response.data?.message || "An error occurred. Please try again!"
            );
          } else {
            setErrorMessage("An unexpected error occurred. Please try again!");
          }
        }
      };

    const handleRegister = async (
        name: string,
        email: string,
        mobile: number,
        password: string
    ) => {
       try {
        const response = await registerTutorAPI(name, email, mobile, password);
            if (response?.status === 201) {
                navigate("/otp-verify", { state: { registrationType } });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data?.message || "An error occurred. Please try again!");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again!");
            }
        }
    };

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        setErrorMessage(null);

        
        try {
            const response = await loginTutorAPI(email, password);
            setLoading(false);
            if(response && response.status === 200) {
                dispatch(tutorLoginSuccess(response.data.tutor));
                navigate("/tutor/dashboard");
            } else {
                setErrorMessage("Invalid credentials or server error. Please try again!");
            }
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data?.message || "An error occurred. Please try again!");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again!");
            }
        }
    };

    return (
        <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-['Montserrat',sans-serif] min-h-screen py-5 px-4">
            <div className="bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-full md:w-[800px] max-w-full min-h-[600px]">
                {/* Mobile View Forms */}
                <div className="md:hidden w-full">
                    {isSignUp ? (
                        <div className="flex flex-col mt-10">
                            <TutorRegistrationForm onRegister={handleRegister} errorMessage={errorMessage}/>
                            <div className="text-center pb-6">
                                <p className="text-sm text-gray-600 mt-8">Already have an account?</p>
                                <a 
                                    href="#" 
                                    onClick={toggleForm}
                                    className="text-[#1c8b5d] hover:text-[#48ffb3] text-sm font-medium transition-colors duration-300"
                                >
                                    Sign in here
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col mt-24">
                            <TutorSignInForm 
                                onSignIn={handleSignIn} 
                                onGoogleSignIn={handleGoogleSignIn}
                                errorMessage={errorMessage} 
                                loading={loading} />
                            <div className="text-center pb-6">
                                <p className="text-sm text-gray-600 mt-8">Don't have an account?</p>
                                <a 
                                    href="#" 
                                    onClick={toggleForm}
                                    className="text-[#1c8b5d] hover:text-[#48ffb3] text-sm font-medium transition-colors duration-300"
                                >
                                    Sign up here
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop View Forms */}
                <div className="hidden md:block">
                    <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out w-1/2 
                        ${!isSignUp ? "transform translate-x-full opacity-0 z-1" : "opacity-100 z-5"}`}>
                        <TutorRegistrationForm onRegister={handleRegister} errorMessage={errorMessage}/>
                    </div>

                    <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out w-1/2 
                        ${isSignUp ? "transform translate-x-full opacity-0 z-1" : "opacity-100 z-5"}`}>
                        <TutorSignInForm 
                            onSignIn={handleSignIn} 
                            onGoogleSignIn={handleGoogleSignIn}
                            errorMessage={errorMessage} 
                            loading={loading}
                        />
                    </div>
                </div>

                {/* Overlay Panel - Desktop Only */}
                <div className="hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100">
                    <div className={`bg-gradient-to-r from-[#1c8b5d] to-[#48ffb3] bg-no-repeat bg-cover bg-center text-white relative -left-full h-full w-[200%] transform ${
                        isSignUp ? "translate-x-1/2" : "translate-x-0"
                    } transition-transform duration-600 ease-in-out`}>
                        {/* Left Panel */}
                        <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform ${
                            isSignUp ? "translate-x-0" : "-translate-x-[20%]"
                        } transition-transform duration-600 ease-in-out`}>
                            <h1 className="text-2xl font-bold m-0">
                                Back to Building Your Future!
                            </h1>
                            <p className="text-sm font-[100] leading-5 tracking-[0.5px] my-5 mx-0">
                                Login and unlock the next phase of your future.
                            </p>
                            <button
                                className="rounded-[20px] border border-solid border-white bg-transparent text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
                                onClick={toggleForm}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Right Panel */}
                        <div className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform ${
                            isSignUp ? "translate-x-[20%]" : "translate-x-0"
                        } transition-transform duration-600 ease-in-out`}>
                            <h1 className="text-2xl font-bold m-0">Hello, Future Mind!</h1>
                            <p className="text-sm font-[100] leading-5 tracking-[0.5px] my-5 mx-0">
                                Step into the future! Share your details and begin your journey as a Future Mind with us!
                            </p>
                            <button
                                className="rounded-[20px] border border-solid border-white bg-transparent text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
                                onClick={toggleForm}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutorAuthenticationForm;