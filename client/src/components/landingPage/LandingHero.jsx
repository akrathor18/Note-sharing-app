import { ArrowRight, Upload, Laptop, Tablet, Smartphone, Download, BrainCircuit } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingHero({ onGetStarted }) {
    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Learn Smarter,<br />
                            <span className="bg-gradient-to-r from-[#FF007F] to-[#00E5FF] bg-clip-text text-transparent">Study Together</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[#F5F5F5]/80 mb-8 max-w-2xl">
                            Join thousands of students sharing notes, creating quizzes, and achieving academic success together.
                            <span className="text-[#00E5FF] font-semibold"> Completely free.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <button
                                onClick={onGetStarted}
                                className="bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                            >
                                Start Learning Free
                                <ArrowRight size={20} />
                            </button>
                            <Link to={'/notes'}
                                onClick={onGetStarted}
                                className="border-2 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0D0D0D] px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                            >
                                <Upload size={20} />
                                Upload Notes
                            </Link>
                        </div>
                    </div>
                    <div className="relative max-md:hidden">
                        <div className="relative bg-gradient-to-br from-[#FF007F]/20 via-[#1A1A1A] to-[#00E5FF]/20 rounded-3xl p-8 border border-[#F5F5F5]/10">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#FF007F]/30 transition-all group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-[#FF007F] flex items-center justify-center text-white font-bold text-sm">A</div>
                                        <div>
                                            <div className="text-sm font-medium">Alex</div>
                                            <div className="text-xs text-[#F5F5F5]/60">Studying CS</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mb-4">
                                        <Laptop size={40} className="text-[#FF007F] group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-xs text-center text-[#F5F5F5]/70">Downloading algorithm notes</div>
                                </div>
                                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#00E5FF]/30 transition-all group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold text-sm">M</div>
                                        <div>
                                            <div className="text-sm font-medium">Maya</div>
                                            <div className="text-xs text-[#F5F5F5]/60">Taking Quiz</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mb-4">
                                        <Tablet size={40} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-xs text-center text-[#F5F5F5]/70">Practicing chemistry quiz</div>
                                </div>
                                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#FF007F]/30 transition-all group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF007F] to-[#00E5FF] flex items-center justify-center text-white font-bold text-sm">S</div>
                                        <div>
                                            <div className="text-sm font-medium">Sam</div>
                                            <div className="text-xs text-[#F5F5F5]/60">Sharing Notes</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mb-4">
                                        <Upload size={40} className="text-[#FF007F] group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-xs text-center text-[#F5F5F5]/70">Uploading math solutions</div>
                                </div>
                                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#00E5FF]/30 transition-all group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold text-sm">J</div>
                                        <div>
                                            <div className="text-sm font-medium">Jordan</div>
                                            <div className="text-xs text-[#F5F5F5]/60">On the go</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mb-4">
                                        <Smartphone size={40} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-xs text-center text-[#F5F5F5]/70">Reviewing flashcards mobile</div>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-[#FF007F] text-white p-3 rounded-full animate-bounce">
                                <Download size={16} />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-[#00E5FF] text-[#0D0D0D] p-3 rounded-full animate-pulse">
                                <BrainCircuit size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 