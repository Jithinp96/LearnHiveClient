import React, { useState, ChangeEvent } from 'react';

interface FloatingLabelInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  id?: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ 
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `floating-${name || label.toLowerCase()}`;

  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

  return (
    <div className="relative">
      <input
        type={type}
        id={inputId}
        name={name}
        className={`
          peer
          w-full
          h-12
          px-4
          pt-4
          text-base
          bg-white
          border
          rounded-md
          outline-none
          transition-all
          placeholder-transparent
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          ${isFocused || value ? 'border-blue-200 border-2' : 'border-gray-300'}
          ${className}
        `}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
      />
      <label
        htmlFor={inputId}
        className={`
          absolute
          left-4
          transition-all
          pointer-events-none
          ${isFocused || value ? 'text-xs top-1' : 'text-base top-3'}
          ${isFocused ? 'text-blue-500' : 'text-gray-500'}
          ${disabled ? 'text-gray-400' : ''}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;