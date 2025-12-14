export default function LayoutSkeleton() {
    return (
        <div className="flex h-screen bg-[#0D0D0D] text-[#F5F5F5]">
            {/* Sidebar Skeleton */}
            <div className="w-64 bg-[#1A1A1A] p-4 flex flex-col animate-pulse">
                {/* Logo */}
                <div className="h-6 w-32 bg-[#2A2A2A] rounded mb-8" />

                {/* Nav items */}
                <div className="space-y-3 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="h-10 bg-[#2A2A2A] rounded-lg"
                        />
                    ))}
                </div>

                {/* User info */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2A2A2A]" />
                    <div className="space-y-2">
                        <div className="h-3 w-24 bg-[#2A2A2A] rounded" />
                        <div className="h-3 w-16 bg-[#2A2A2A] rounded" />
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Skeleton */}
                <header className="bg-[#1A1A1A] p-4 flex justify-between items-center animate-pulse">
                    {/* Search */}
                    <div className="h-10 w-64 bg-[#2A2A2A] rounded-lg" />

                    {/* Icons */}
                    <div className="flex gap-3">
                        <div className="h-10 w-10 bg-[#2A2A2A] rounded-full" />
                        <div className="h-10 w-10 bg-[#2A2A2A] rounded-full" />
                    </div>
                </header>

                {/* Page Content Skeleton */}
                <main className="p-4 md:p-6 space-y-4 animate-pulse overflow-auto">
                    <div className="h-6 w-1/3 bg-[#2A2A2A] rounded" />
                    <div className="h-4 w-full bg-[#2A2A2A] rounded" />
                    <div className="h-4 w-5/6 bg-[#2A2A2A] rounded" />

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-32 bg-[#2A2A2A] rounded-xl"
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
