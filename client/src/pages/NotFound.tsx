import { BookOpen, Home, FileText, BrainCircuit, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// export default function NotFound({ onNavigate }) {
export default function NotFound() {
    const [isBlinking, setIsBlinking] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    // Control the blinking animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking((prev) => !prev);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" flex flex-col items-center justify-center p-4 text-center bg-[#0D0D0D] text-[#F5F5F5]">
            {/* 404 Illustration */}
            <div className="relative mb-8">
                <div className="text-[120px] md:text-[180px] font-bold text-[#1A1A1A] select-none">
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <BookOpen size={180} className="text-[#FF007F]" />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#1A1A1A] border-4 border-[#0D0D0D] flex items-center justify-center">
                        <FileText
                            size={32}
                            className={`transition-opacity duration-500 ${isBlinking ? 'text-[#FF007F] opacity-100' : 'text-[#FF007F] opacity-40'}`}
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-3">Page Not Found</h1>
            <p className="text-[#F5F5F5]/60 max-w-md mb-8">
                Oops! The study material you're looking for seems to have gone missing. Let's help
                you find your way back.
            </p>

            {/* Navigation Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-10">
                <Link
                    to={'/'}
                    className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[#1A1A1A] border border-[#F5F5F5]/5 hover:border-[#FF007F] hover:bg-[#FF007F]/10 transition-all"
                >
                    <Home size={24} className="text-[#FF007F]" />
                    <span>Go to Dashboard</span>
                </Link>
                <Link
                    to={'/notes'}
                    className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[#1A1A1A] border border-[#F5F5F5]/5 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all"
                >
                    <FileText size={24} className="text-[#00E5FF]" />
                    <span>Browse Notes</span>
                </Link>
                <Link
                    to={'/quizzes'}
                    className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[#1A1A1A] border border-[#F5F5F5]/5 hover:border-[#FF007F] hover:bg-[#FF007F]/10 transition-all"
                >
                    <BrainCircuit size={24} className="text-[#FF007F]" />
                    <span>Take a Quiz</span>
                </Link>
            </div>

            {/* Enhanced Back Button */}
            <button
                onClick={() => window.history.back()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl mb-4- transition-all duration-300 ${
                    isHovering
                        ? 'bg-[#00E5FF] text-[#0D0D0D]'
                        : 'bg-[#1A1A1A] text-[#00E5FF] border border-[#00E5FF]/30'
                }`}
            >
                <ArrowLeft
                    size={18}
                    className={`transition-transform duration-300 ${isHovering ? '-translate-x-1' : ''}`}
                />
                <span className="font-medium">Go Back</span>
            </button>
        </div>
    );
}
