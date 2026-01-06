import React from 'react';

export const CollegeDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative h-48 sm:h-64 md:h-80 bg-gray-300"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
                        {/* About Section */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>

                        {/* Pros/Cons Skeleton */}
                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 h-40"></div>
                            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 h-40"></div>
                        </div>

                        {/* Mentors Section Skeleton */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-gray-100 rounded-xl p-3 sm:p-4 md:p-5 h-32"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 h-48"></div>
                        <div className="bg-white rounded-xl shadow-lg p-6 h-32"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ResourcesPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 sm:py-12 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>

                {/* Category Filters Skeleton */}
                <div className="mb-6 sm:mb-8 flex gap-2 sm:gap-3 justify-center">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
                    ))}
                </div>

                {/* Resources Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="h-40 sm:h-48 bg-gray-300"></div>
                            <div className="p-4 sm:p-6 space-y-3">
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                                    <div className="h-10 bg-gray-300 rounded w-28"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const CollegesPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 sm:py-12 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>

                {/* Colleges Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-6 space-y-3">
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="space-y-2 mt-4">
                                    <div className="h-3 bg-gray-200 rounded"></div>
                                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const EventsPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 sm:py-12 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>

                {/* Tabs Skeleton */}
                <div className="flex justify-center mb-8">
                    <div className="h-12 w-80 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Events Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-6 space-y-3">
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="space-y-2 mt-4">
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>
                                <div className="h-10 bg-gray-300 rounded mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
