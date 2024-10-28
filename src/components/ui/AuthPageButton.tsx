import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AuthPageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const AuthPageButton: React.FC<AuthPageButtonProps> = ({ 
  children, 
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props 
}) => {
  const baseStyles = "rounded-[20px] text-xs font-bold py-3 px-[45px] mt-4 uppercase tracking-[1px] transition-transform duration-80 ease-in active:scale-95 focus:outline-none";
  
  const variants = {
    primary: "bg-[#FF4B2B] text-white border-0 hover:bg-[#FF416C] disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-transparent text-white border border-solid border-white"
  };

  // Wrapper div with flex centering
  return (
    <div className="flex justify-center items-center">
      <button
        className={cn(
          baseStyles,
          variants[variant],
          fullWidth && "w-full",
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    </div>
  );
};

export default AuthPageButton;