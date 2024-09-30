import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    fallback?: ReactNode;
    children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
                    <img 
                        src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/Images/error.jpg" 
                        alt="Error" 
                        className="max-w-80 h-auto mb-8" 
                    />
                    <h1 className="text-7xl font-bold text-gray-800 mb-4">Woops!</h1>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Something went wrong :(</h2>
                    <p className="text-xl text-gray-600 mb-2">Have you tried turning it off and on again?</p>
                    <p className="text-lg text-red-500 mb-6">{this.state.error?.message}</p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        Go to Home Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;