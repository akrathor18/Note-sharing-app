export default function CardSkeleton() {
    return (


        <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5 animate-pulse">

                    {/* Top row */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="h-5 w-20 rounded-full bg-[#2A2A2A]" />
                        <div className="h-3 w-16 rounded bg-[#2A2A2A]" />
                    </div>

                    {/* Title */}
                    <div className="h-4 w-3/4 rounded bg-[#2A2A2A] mb-3" />

                    {/* Bottom row */}
                    <div className="flex items-center justify-between">
                        <div className="h-3 w-24 rounded bg-[#2A2A2A]" />
                        <div className="h-6 w-16 rounded-full bg-[#2A2A2A]" />
                    </div>
                </div>
            ))}
        </div>

    );
}