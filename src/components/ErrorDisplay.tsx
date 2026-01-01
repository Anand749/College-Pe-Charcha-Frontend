import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
    message: string;
    onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full">
                <div className="flex items-center justify-center mb-4">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    Oops! Something went wrong
                </h3>
                <p className="text-gray-600 text-center mb-6">
                    {message || 'Unable to load data. Please try again.'}
                </p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorDisplay;
