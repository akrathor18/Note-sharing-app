import { Target, BookOpen, Users, Award, HelpCircle } from "lucide-react";
import FAQSection from "./FAQSection";

interface FAQ {
    question: string;
    answer: string;
}

interface FeedbackSidebarProps {
    faqs: FAQ[];
    expandedFaq: number | null;
    toggleFaq: (index: number) => void;
}

export default function FeedbackSidebar({ faqs, expandedFaq, toggleFaq }: FeedbackSidebarProps) {
    return (
        <>
            {/* Why Your Feedback Matters */}
            <div className="bg-[#1A1A1A] rounded-lg md:rounded-xl p-4 md:p-6 border border-[#F5F5F5]/5">
                <h3 className="font-bold mb-3 md:mb-4 text-[#F5F5F5] flex items-center gap-2 text-sm md:text-base">
                    <Target size={16} className="md:hidden text-[#00E5FF]" />
                    <Target size={18} className="hidden md:block text-[#00E5FF]" />
                    Why Your Feedback Matters
                </h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FF007F]/20 flex items-center justify-center flex-shrink-0">
                            <BookOpen size={16} className="text-[#FF007F]" />
                        </div>
                        <div>
                            <h4 className="font-medium text-sm text-[#F5F5F5]">Shape the Future</h4>
                            <p className="text-xs text-[#F5F5F5]/70">
                                Your suggestions directly influence our development roadmap
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                            <Users size={16} className="text-[#00E5FF]" />
                        </div>
                        <div>
                            <h4 className="font-medium text-sm text-[#F5F5F5]">Help Others Learn</h4>
                            <p className="text-xs text-[#F5F5F5]/70">Improve the experience for thousands of students</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FFD93D]/20 flex items-center justify-center flex-shrink-0">
                            <Award size={16} className="text-[#FFD93D]" />
                        </div>
                        <div>
                            <h4 className="font-medium text-sm text-[#F5F5F5]">Get Recognition</h4>
                            <p className="text-xs text-[#F5F5F5]/70">Contributors get special recognition in our community</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* FAQ Section */}
            <div className="bg-[#1A1A1A] rounded-lg md:rounded-xl p-4 md:p-6 border border-[#F5F5F5]/5">
                <h3 className="font-bold mb-3 md:mb-4 text-[#F5F5F5] flex items-center gap-2 text-sm md:text-base">
                    <HelpCircle size={16} className="md:hidden text-[#00E5FF]" />
                    <HelpCircle size={18} className="hidden md:block text-[#00E5FF]" />
                    Frequently Asked Questions
                </h3>
                <FAQSection faqs={faqs} expandedFaq={expandedFaq} toggleFaq={toggleFaq} />
            </div>
        </>
    );
} 