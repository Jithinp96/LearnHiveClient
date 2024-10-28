import React from "react";

interface ErrorMessageProps {
    message: string | undefined
}

const ErrorMessage: React.FC<ErrorMessageProps> = ( { message } ) => {
    if (!message) return null;
    return <p className="text-red-500 text-sm mt-1">{message}</p>;
}

export default ErrorMessage;