import React, { useState } from "react";
import ErrorMessage from '@/components/ui/ErrorMessage';
import { validateSignInForm } from "@/utils/Validations";
import FloatingLabelInput from "@/components/ui/FloatingInput";
import AuthPageButton from "@/components/ui/AuthPageButton";

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
      
      <ErrorMessage message={serverErrorMessage || undefined} />
      
      <ErrorMessage message={validationError} />
      
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <FloatingLabelInput
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setValidationError("");
          }}
        />
        
        <FloatingLabelInput
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setValidationError("");
          }}
        />

        <a
          href="/forgot-password"
          className="text-[#333] text-sm no-underline block"
        >
          Forgot your password?
        </a>
        
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