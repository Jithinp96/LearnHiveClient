export const passwordRules = [
    { rule: /.{8,}/, description: "At least 8 characters long" },
    { rule: /[A-Z]/, description: "At least one uppercase letter" },
    { rule: /[a-z]/, description: "At least one lowercase letter" },
    { rule: /[0-9]/, description: "At least one number" },
    { rule: /[!@#$%^&*]/, description: "At least one special character (!@#$%^&*)" }
];
  
export interface ValidationResult {
    isValid: boolean;
    errorMessage: string;
}
  
export const validateAllFieldsRequired = (fields: Record<string, string>): ValidationResult => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return {
                isValid: false,
                errorMessage: 'All fields are required'
            };
        }
    }
    return { isValid: true, errorMessage: '' };
};
  
export const validateMobile = (mobile: string): ValidationResult => {
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        return {
            isValid: false,
            errorMessage: 'Mobile number should be 10 digits'
        };
    }
    return { isValid: true, errorMessage: '' };
};
  
export const validatePassword = (password: string): ValidationResult => {
    const isValid = passwordRules.every(({ rule }) => rule.test(password));
    return {
      isValid,
      errorMessage: isValid ? '' : 'Password does not meet the required criteria'
    };
};
  
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
    return {
      isValid: password === confirmPassword,
      errorMessage: password === confirmPassword ? '' : 'Passwords do not match'
    };
};
  
export const validateRegistrationForm = (
    name: string,
    email: string,
    mobile: string,
    password: string,
    confirmPassword: string
): ValidationResult => {

    const requiredValidation = validateAllFieldsRequired({ name, email, mobile, password, confirmPassword });
    if (!requiredValidation.isValid) return requiredValidation;
  
    const mobileValidation = validateMobile(mobile);
    if (!mobileValidation.isValid) return mobileValidation;
  
    // const passwordValidation = validatePassword(password);
    // if (!passwordValidation.isValid) return passwordValidation;
  
    const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);
    if (!confirmPasswordValidation.isValid) return confirmPasswordValidation;
  
    return { isValid: true, errorMessage: '' };
};

export const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return {
        isValid: false,
        errorMessage: 'Email is required'
      };
    }
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        errorMessage: 'Please enter a valid email address'
      };
    }
    return { isValid: true, errorMessage: '' };
  };
  
export const validateSignInForm = (
    email: string,
    password: string
): ValidationResult => {

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) return emailValidation;
  
    if (!password) {
        return {
            isValid: false,
            errorMessage: 'Password is required'
        };
    }
  
    return { isValid: true, errorMessage: '' };
  };