import { useState } from "react"
import { BookOpen, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingNavBar({ onGetStarted }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
        <nav className="bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#F5F5F5]/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <BookOpen className="text-[#FF007F]" size={32} />
                        <span className="text-xl font-bold">StudyHub</span>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="hover:text-[#FF007F] transition-colors">Features</a>
                        <a href="#community" className="hover:text-[#FF007F] transition-colors">Community</a>
                        <a href="#testimonials" className="hover:text-[#FF007F] transition-colors">Reviews</a>
                        <button
                            onClick={onGetStarted}
                            className="bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-6 py-2 rounded-full font-medium transition-colors"
                        >
                            Get Started Free
                        </button>
                    </div>
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-[#F5F5F5]/10"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[#F5F5F5]/10">
                        <div className="flex flex-col space-y-4">
                            <a href="#features" className="hover:text-[#FF007F] transition-colors">Features</a>
                            <a href="#community" className="hover:text-[#FF007F] transition-colors">Community</a>
                            <a href="#testimonials" className="hover:text-[#FF007F] transition-colors">Reviews</a>
                            <button
                                onClick={onGetStarted}
                                className="bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-full font-medium transition-colors w-full"
                            >
                                Get Started Free
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
} 