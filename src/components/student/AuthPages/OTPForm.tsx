import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPInput: React.FC<{ onComplete: (otp: string) => void }> = ({ onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);
    
    if (element.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (index > 0 && otp[index] === '') {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl border border-red-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      ))}
    </div>
  );
};

interface OTPFormProps {
  registrationType: 'student' | 'tutor';
}

const OTPForm: React.FC<OTPFormProps> = ({ registrationType }) => {
  const [otp, setOtp] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const navigate = useNavigate()
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setIsResendDisabled(true);
    setTimer(60);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current!);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOTPComplete = (completedOtp: string) => {
    setOtp(completedOtp);
    setErrorMessage('');
  };

  const handleVerifyClick = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      console.log('Verifying OTP:', otp);
      
      try {
        const endpoint = registrationType === 'student' ? '/students/otp-verify' : '/tutor/otp-verify';

        const response = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          otp: otp
        },{
          withCredentials: true
        })

        console.log("Response: ", response);
        
        if (response.status >= 200 && response.status < 300) {
          
          if (response.data.success) {
            console.log('OTP verified successfully');
            navigate(registrationType === 'student' ? '/auth' : '/tutor/auth')
          } else {
            console.log('OTP verification failed:', response.data.message);
            setErrorMessage(response.data.message || 'Invalid OTP');
          }
        } else {
          
          console.error('API returned error:', response.status, response.data);
          setErrorMessage(response.data.message || 'An unexpected error occurred');
        }

      } catch (error) {
        console.error('Error during OTP verification:', error);
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || 'Network error';
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      console.log('Resending OTP...');
      const endpoint = registrationType === 'student' ? '/students/resend-otp' : '/tutor/resend-otp';
  
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, {}, 
      {
        withCredentials: true,
      });
  
      console.log("Resend OTP Response: ", response);
  
      if (response.status >= 200 && response.status < 300) {
        console.log('OTP resent successfully');
        startTimer(); // Restart the timer when OTP is resent
      } else {
        console.error('Failed to resend OTP:', response.data.message);
        setErrorMessage(response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error during OTP resend:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Network error';
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <h2 hidden>{registrationType === 'student' ? 'Student Verification' : 'Tutor Verification'}</h2>
    
      <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-['Montserrat',sans-serif] min-h-screen py-10">
        <div className="bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[800px] max-w-full min-h-[600px]">
          {/* Left side - OTP Verification */}
          <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center">
            <div className="w-full max-w-md p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Verify Your Account</h2>
              <p className="text-center mb-8">We've sent a code to your email. Please enter it below.</p>
              
              <p className='text-center mb-3 text-green-700'>{`Enter OTP in ${timer}s`}</p>
              
              <OTPInput onComplete={handleOTPComplete} />
              {errorMessage && (
                <p className="mt-2 text-red-500 text-center">{errorMessage}</p>
              )}
              {otp.length === 6 && !isVerifying && (
                <button 
                  onClick={handleVerifyClick}
                  className="mt-8 w-full bg-[#FF4B2B] text-white rounded-[20px] border-0 py-3 px-[45px] text-xs font-bold uppercase tracking-[1px] transition-all duration-80 ease-in hover:bg-[#FF416C] active:scale-95 focus:outline-none"
                >
                  Verify Now
                </button>
              )}
              {isVerifying && (
                <p className="text-center mt-4 text-green-600">Verifying your code...</p>
              )}
            </div>
          </div>

          {/* Right side - Gradient background with text */}
          <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="px-10 text-center">
                <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                <p className="text-lg font-[100] leading-5 tracking-[0.5px] mb-5">
                  Enter the verification code to complete your account setup.
                </p>
                <button 
                  onClick={handleResendOTP}
                  disabled={isResendDisabled}
                  className={`rounded-[20px] border border-solid border-white bg-transparent text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in active:scale-95 focus:outline-none ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isResendDisabled ? `Resend Code in (${timer}s)` : 'Resend Code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPForm;