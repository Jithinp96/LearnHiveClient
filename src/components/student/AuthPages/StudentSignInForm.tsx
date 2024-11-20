import React, { useState } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { validateSignInForm } from "@/utils/Validations";
import AuthPageButton from "@/components/ui/AuthPageButton";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  onGoogleSignIn: (credential: string) => void;
  errorMessage: string | null;
  loading: boolean;
}

const StudentSignInForm: React.FC<SignInProps> = ({
  onSignIn,
  onGoogleSignIn,
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

      <form onSubmit={handleSubmit} className="w-full space-y-4">
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
          to={"/forgot-password"}
          className="text-[#333] text-sm no-underline block"
        >
          Forgot your password?
        </Link>

        <AuthPageButton disabled={loading} type="submit">
          {loading ? "Signing In..." : "Sign In"}
        </AuthPageButton>
      </form>
    </div>
  );
};

export default StudentSignInForm;