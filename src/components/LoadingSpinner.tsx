import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = 'Loading...',
    size = 'medium'
}) => {
    const sizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-16 h-16',
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-orange-500`}></div>
            {message && (
                <p className="mt-4 text-gray-600 text-lg">{message}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
