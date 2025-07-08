const SettingsSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-6 w-32 bg-gray-700 rounded mb-6"></div>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar skeleton */}
                <div className="w-full md:w-64 bg-[#1A1A1A] rounded-xl p-4 space-y-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-800 rounded"></div>
                    ))}
                </div>
                {/* Content skeleton */}
                <div className="flex-1 bg-[#1A1A1A] rounded-xl p-6 space-y-4">
                    <div className="h-5 w-40 bg-gray-700 rounded"></div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i}>
                            <div className="h-4 w-24 bg-gray-600 rounded mb-2"></div>
                            <div className="h-10 w-full bg-gray-800 rounded"></div>
                        </div>
                    ))}
                    <div className="h-10 w-32 bg-gray-700 rounded mt-6"></div>
                </div>
            </div>
        </div>
    );
};

export default SettingsSkeleton;
