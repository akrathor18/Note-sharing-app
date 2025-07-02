import React from 'react';

function SkeletonLoader() {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            {/* Profile Header */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#2a2a2a]" />

                    <div className="flex-1 space-y-4 w-full">
                        <div className="h-6 bg-[#2a2a2a] rounded w-1/3" />
                        <div className="h-4 bg-[#2a2a2a] rounded w-1/4" />
                        <div className="space-y-2 mt-4">
                            <div className="h-4 bg-[#2a2a2a] rounded w-2/3" />
                            <div className="h-4 bg-[#2a2a2a] rounded w-1/2" />
                            <div className="flex space-x-3 mt-3">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full bg-[#2a2a2a]"
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className="bg-[#1A1A1A] rounded-xl p-4 text-center space-y-2">
                            <div className="w-10 h-10 mx-auto rounded-full bg-[#2a2a2a]" />
                            <div className="h-5 bg-[#2a2a2a] w-1/2 mx-auto rounded" />
                            <div className="h-3 bg-[#2a2a2a] w-3/4 mx-auto rounded" />
                        </div>
                    ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-[#F5F5F5]/10 mb-6">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="h-6 w-20 bg-[#2a2a2a] rounded" />
                        ))}
                </div>
            </div>

            {/* About Me */}
            <div className="bg-[#1A1A1A] rounded-xl p-5 space-y-3">
                <div className="h-6 bg-[#2a2a2a] w-1/4 rounded" />
                <div className="space-y-2">
                    <div className="h-4 bg-[#2a2a2a] rounded w-full" />
                    <div className="h-4 bg-[#2a2a2a] rounded w-11/12" />
                    <div className="h-4 bg-[#2a2a2a] rounded w-2/3" />
                </div>
            </div>
        </div>
    );
}

export default SkeletonLoader; 