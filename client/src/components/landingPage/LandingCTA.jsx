import { ArrowRight, Upload } from "lucide-react"

export default function LandingCTA({ onGetStarted }) {
    return (
        <section className="py-20 bg-gradient-to-r from-[#FF007F]/10 via-[#1A1A1A] to-[#00E5FF]/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Ready to Transform Your
                    <span className="bg-gradient-to-r from-[#FF007F] to-[#00E5FF] bg-clip-text text-transparent">
                        Learning Journey?
                    </span>
                </h2>
                <p className="text-xl text-[#F5F5F5]/80 mb-10">
                    Join thousands of students who are already achieving academic success with StudyHub.
                    <br />
                    <span className="text-[#00E5FF] font-semibold">Start for free today!</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onGetStarted}
                        className="bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                        Start Learning Free
                        <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={onGetStarted}
                        className="border-2 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0D0D0D] px-10 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                        <Upload size={20} />
                        Upload Your Notes
                    </button>
                </div>
            </div>
        </section>
    )
} 