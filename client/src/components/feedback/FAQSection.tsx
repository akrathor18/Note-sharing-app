import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection({ faqs, expandedFaq, toggleFaq }) {
    return (
        <div className="space-y-2">
            {faqs.map((faq, index) => (
                <div key={index} className="border border-[#F5F5F5]/10 rounded-lg">
                    <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-2 md:p-3 text-left flex items-center justify-between hover:bg-[#0D0D0D] transition-colors rounded-lg"
                    >
                        <span className="text-xs md:text-sm font-medium text-[#F5F5F5] pr-2">{faq.question}</span>
                        {expandedFaq === index ? (
                            <>
                                <ChevronUp size={14} className="md:hidden text-[#F5F5F5]/60 flex-shrink-0" />
                                <ChevronUp size={16} className="hidden md:block text-[#F5F5F5]/60 flex-shrink-0" />
                            </>
                        ) : (
                            <>
                                <ChevronDown size={14} className="md:hidden text-[#F5F5F5]/60 flex-shrink-0" />
                                <ChevronDown size={16} className="hidden md:block text-[#F5F5F5]/60 flex-shrink-0" />
                            </>
                        )}
                    </button>
                    {expandedFaq === index && (
                        <div className="px-2 md:px-3 pb-2 md:pb-3">
                            <p className="text-xs md:text-sm text-[#F5F5F5]/70">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
} 