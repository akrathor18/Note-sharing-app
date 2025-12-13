import { Heart, Zap, Shield } from "lucide-react"

export default function LandingCommunity() {
    return (
        <section id="community" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Join Our Global
                            <span className="text-[#00E5FF]"> Learning Community</span>
                        </h2>
                        <p className="text-xl text-[#F5F5F5]/80 mb-8">
                            Connect with students worldwide. Share knowledge, collaborate on projects, and grow together.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#FF007F]/20 flex items-center justify-center">
                                    <Heart size={24} className="text-[#FF007F]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Supportive Environment</h3>
                                    <p className="text-[#F5F5F5]/70">Help each other succeed with collaborative learning</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#00E5FF]/20 flex items-center justify-center">
                                    <Zap size={24} className="text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Instant Access</h3>
                                    <p className="text-[#F5F5F5]/70">Get immediate access to shared materials and resources</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#FF007F]/20 flex items-center justify-center">
                                    <Shield size={24} className="text-[#FF007F]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Quality Assured</h3>
                                    <p className="text-[#F5F5F5]/70">Community-verified content ensures reliability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 sm:gap-4 flex flex-wrap justify-center">
                        <div className="space-y-4">
                            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#FF007F] flex items-center justify-center text-white font-bold">K</div>
                                    <div>
                                        <div className="font-medium">Kevin</div>
                                        <div className="text-xs text-[#F5F5F5]/60">just shared</div>
                                    </div>
                                </div>
                                <div className="text-sm text-[#F5F5F5]/80">"Physics Formula Sheet" 📚</div>
                            </div>
                            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold">L</div>
                                    <div>
                                        <div className="font-medium">Lisa</div>
                                        <div className="text-xs text-[#F5F5F5]/60">completed quiz</div>
                                    </div>
                                </div>
                                <div className="text-sm text-[#F5F5F5]/80">Organic Chemistry - 95% 🎉</div>
                            </div>
                        </div>
                        <div className="space-y-4 mt-8">
                            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF007F] to-[#00E5FF] flex items-center justify-center text-white font-bold">R</div>
                                    <div>
                                        <div className="font-medium">Ryan</div>
                                        <div className="text-xs text-[#F5F5F5]/60">helped 12 students</div>
                                    </div>
                                </div>
                                <div className="text-sm text-[#F5F5F5]/80">Calculus study group 🤝</div>
                            </div>
                            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold">T</div>
                                    <div>
                                        <div className="font-medium">Tina</div>
                                        <div className="text-xs text-[#F5F5F5]/60">uploaded notes</div>
                                    </div>
                                </div>
                                <div className="text-sm text-[#F5F5F5]/80">"Data Structures Guide" 💻</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 