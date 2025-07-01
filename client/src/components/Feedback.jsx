import { useState } from "react"
import {
    MessageSquare,
    Star,
    Send,
    ThumbsUp,
    ThumbsDown,
    Lightbulb,
    Bug,
    Heart,
    User,
    Mail,
    Smile,
    Meh,
    Frown,
    CheckCircle2,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    BookOpen,
    Users,
    Award,
    Target,
} from "lucide-react"

export default function NavBar() {
    const [feedbackData, setFeedbackData] = useState({
        name: "",
        email: "",
        feedbackType: "general",
        rating: 0,
        experience: "",
        liked: "",
        improvements: "",
        newFeatures: "",
        wouldRecommend: null,
        additionalComments: "",
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState(null)

    const feedbackTypes = [
        {
            id: "general",
            label: "General Feedback",
            icon: MessageSquare,
            color: "#00E5FF",
            description: "Share your overall thoughts about StudyHub",
        },
        {
            id: "bug",
            label: "Bug Report",
            icon: Bug,
            color: "#FF6B6B",
            description: "Report issues or problems you've encountered",
        },
        {
            id: "feature",
            label: "Feature Request",
            icon: Lightbulb,
            color: "#FFD93D",
            description: "Suggest new features or improvements",
        },
        {
            id: "praise",
            label: "Praise & Thanks",
            icon: Heart,
            color: "#FF007F",
            description: "Share what you love about StudyHub",
        },
    ]

    const experienceOptions = [
        { value: "excellent", label: "Excellent", icon: Smile, color: "#4CAF50" },
        { value: "good", label: "Good", icon: Smile, color: "#8BC34A" },
        { value: "average", label: "Average", icon: Meh, color: "#FFC107" },
        { value: "poor", label: "Poor", icon: Frown, color: "#FF9800" },
        { value: "terrible", label: "Terrible", icon: Frown, color: "#F44336" },
    ]

    const faqs = [
        {
            question: "How do you use our feedback?",
            answer:
                "We carefully review every piece of feedback to improve StudyHub. Your suggestions directly influence our development roadmap and help us prioritize new features.",
        },
        {
            question: "Will I get a response to my feedback?",
            answer:
                "Yes! Since we now require contact information, we'll respond to all feedback within 48 hours. For bug reports, we'll keep you updated on the fix progress.",
        },
        {
            question: "Is my personal information secure?",
            answer:
                "We use industry-standard encryption to protect your data. Your information is only used to respond to your feedback and will never be shared with third parties.",
        },
        {
            question: "How long does it take to implement suggestions?",
            answer:
                "Implementation time varies based on complexity and priority. Simple fixes might be deployed within days, while major features could take several weeks or months. We'll keep you informed of progress.",
        },
        {
            question: "Can I submit multiple feedback items?",
            answer:
                "Yes! Feel free to submit feedback as often as you'd like. Each submission helps us understand your needs better and improve the platform continuously.",
        },
    ]

    const validateForm = () => {
        const newErrors = {}

        // Name validation
        if (!feedbackData.name.trim()) {
            newErrors.name = "Name is required"
        } else if (feedbackData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters"
        } else if (feedbackData.name.trim().length > 50) {
            newErrors.name = "Name must be less than 50 characters"
        }

        // Email validation
        if (!feedbackData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        // Rating validation
        if (feedbackData.rating === 0) {
            newErrors.rating = "Please provide a rating"
        }

        // Experience validation
        if (!feedbackData.experience) {
            newErrors.experience = "Please select your experience level"
        }

        // At least one feedback field should be filled
        const feedbackFields = [
            feedbackData.liked,
            feedbackData.improvements,
            feedbackData.newFeatures,
            feedbackData.additionalComments,
        ]
        if (!feedbackFields.some((field) => field.trim())) {
            newErrors.feedback = "Please provide some feedback in at least one of the text areas"
        }

        // Recommendation validation
        if (feedbackData.wouldRecommend === null) {
            newErrors.wouldRecommend = "Please let us know if you would recommend StudyHub"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFeedbackData({
            ...feedbackData,
            [name]: type === "checkbox" ? checked : value,
        })

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined,
            })
        }

        // Clear feedback error when any text field is filled
        if (["liked", "improvements", "newFeatures", "additionalComments"].includes(name) && value.trim()) {
            setErrors({
                ...errors,
                feedback: undefined,
            })
        }
    }

    const handleRatingClick = (rating) => {
        setFeedbackData({ ...feedbackData, rating })
        if (errors.rating) {
            setErrors({ ...errors, rating: undefined })
        }
    }

    const handleExperienceSelect = (experience) => {
        setFeedbackData({ ...feedbackData, experience })
        if (errors.experience) {
            setErrors({ ...errors, experience: undefined })
        }
    }

    const handleRecommendationSelect = (wouldRecommend) => {
        setFeedbackData({ ...feedbackData, wouldRecommend })
        if (errors.wouldRecommend) {
            setErrors({ ...errors, wouldRecommend: undefined })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            // Scroll to first error
            const firstErrorElement = document.querySelector(".error-field")
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log("Feedback submitted:", feedbackData)
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after showing success message
        setTimeout(() => {
            setIsSubmitted(false)
            setFeedbackData({
                name: "",
                email: "",
                feedbackType: "general",
                rating: 0,
                experience: "",
                liked: "",
                improvements: "",
                newFeatures: "",
                wouldRecommend: null,
                additionalComments: "",
            })
            setErrors({})
        }, 3000)
    }

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index)
    }

    return (
        <div className="space-y-4 md:space-y-6 max-w-6xl mx-auto px-2 sm:px-0">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#F5F5F5]">We Value Your Feedback</h1>
                <p className="text-base md:text-lg text-[#F5F5F5]/70">Help us make StudyHub better for everyone</p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6">
                {/* Main Feedback Form */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="bg-[#1A1A1A] rounded-lg md:rounded-xl p-4 md:p-6 border border-[#F5F5F5]/5">
                        {isSubmitted ? (
                            /* Success Message */
                            <div className="text-center py-6 md:py-8">
                                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle2 size={24} className="md:hidden text-green-500" />
                                    <CheckCircle2 size={32} className="hidden md:block text-green-500" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#F5F5F5]">Thank You!</h3>
                                <p className="text-sm md:text-base text-[#F5F5F5]/80 mb-4">
                                    Your feedback has been submitted successfully. We'll review it carefully and get back to you within 48
                                    hours at {feedbackData.email}.
                                </p>
                                <div className="flex items-center justify-center gap-2 text-[#00E5FF]">
                                    <Heart size={16} />
                                    <span className="text-sm">Your voice matters to us</span>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="flex items-center gap-3 mb-4 md:mb-6">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#FF007F]/20 flex items-center justify-center">
                                        <MessageSquare size={16} className="md:hidden text-[#FF007F]" />
                                        <MessageSquare size={20} className="hidden md:block text-[#FF007F]" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg md:text-xl font-bold text-[#F5F5F5]">Share Your Feedback</h2>
                                        <p className="text-xs md:text-sm text-[#F5F5F5]/70">Your input helps us improve</p>
                                    </div>
                                </div>

                                {/* Contact Information - Now Required */}
                                <div className="space-y-3 md:space-y-4">
                                    <h3 className="font-semibold text-[#F5F5F5] text-sm md:text-base">
                                        Contact Information <span className="text-[#FF007F]">*</span>
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                        <div className={errors.name ? "error-field" : ""}>
                                            <label className="block text-xs md:text-sm font-medium mb-1 text-[#F5F5F5]">
                                                <User size={14} className="md:hidden inline mr-1 text-[#00E5FF]" />
                                                <User size={16} className="hidden md:inline mr-1 text-[#00E5FF]" />
                                                Name <span className="text-[#FF007F]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={feedbackData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your full name"
                                                className={`w-full bg-[#0D0D0D] border rounded-lg py-2 px-3 focus:outline-none transition-colors text-sm md:text-base text-[#F5F5F5] placeholder-[#F5F5F5]/50 ${errors.name
                                                        ? "border-red-500 focus:border-red-500"
                                                        : "border-[#F5F5F5]/20 focus:border-[#FF007F]"
                                                    }`}
                                                required
                                            />
                                            {errors.name && (
                                                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                                                    <AlertCircle size={12} />
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className={errors.email ? "error-field" : ""}>
                                            <label className="block text-xs md:text-sm font-medium mb-1 text-[#F5F5F5]">
                                                <Mail size={14} className="md:hidden inline mr-1 text-[#00E5FF]" />
                                                <Mail size={16} className="hidden md:inline mr-1 text-[#00E5FF]" />
                                                Email <span className="text-[#FF007F]">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={feedbackData.email}
                                                onChange={handleInputChange}
                                                placeholder="your.email@example.com"
                                                className={`w-full bg-[#0D0D0D] border rounded-lg py-2 px-3 focus:outline-none transition-colors text-sm md:text-base text-[#F5F5F5] placeholder-[#F5F5F5]/50 ${errors.email
                                                        ? "border-red-500 focus:border-red-500"
                                                        : "border-[#F5F5F5]/20 focus:border-[#FF007F]"
                                                    }`}
                                                required
                                            />
                                            {errors.email && (
                                                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                                                    <AlertCircle size={12} />
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Feedback Type */}
                                <div>
                                    <label className="block text-xs md:text-sm font-medium mb-3 text-[#F5F5F5]">
                                        What type of feedback is this?
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                                        {feedbackTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setFeedbackData({ ...feedbackData, feedbackType: type.id })}
                                                className={`p-3 md:p-4 rounded-lg border text-left transition-all ${feedbackData.feedbackType === type.id
                                                        ? "border-[#FF007F] bg-[#FF007F]/10 text-[#F5F5F5]"
                                                        : "border-[#F5F5F5]/20 hover:border-[#00E5FF]/50 bg-[#0D0D0D] text-[#F5F5F5]"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <type.icon size={18} className="md:hidden" style={{ color: type.color }} />
                                                    <type.icon size={20} className="hidden md:block" style={{ color: type.color }} />
                                                    <div>
                                                        <div className="font-medium text-sm md:text-base">{type.label}</div>
                                                        <div className="text-xs text-[#F5F5F5]/60 hidden sm:block">{type.description}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Overall Rating */}
                                <div className={errors.rating ? "error-field" : ""}>
                                    <label className="block text-xs md:text-sm font-medium mb-3 text-[#F5F5F5]">
                                        How would you rate StudyHub overall? <span className="text-[#FF007F]">*</span>
                                    </label>
                                    <div className="flex items-center justify-center sm:justify-start gap-1 md:gap-2 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingClick(star)}
                                                className="p-1 transition-colors"
                                            >
                                                <Star
                                                    size={28}
                                                    className={`md:hidden ${star <= feedbackData.rating ? "text-yellow-500 fill-current" : "text-[#F5F5F5]/20"
                                                        } hover:text-yellow-400 transition-colors`}
                                                />
                                                <Star
                                                    size={32}
                                                    className={`hidden md:block ${star <= feedbackData.rating ? "text-yellow-500 fill-current" : "text-[#F5F5F5]/20"
                                                        } hover:text-yellow-400 transition-colors`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-[#F5F5F5]/60 text-center sm:text-left">
                                        {feedbackData.rating === 0 && "Tap to rate"}
                                        {feedbackData.rating === 1 && "Poor - Needs major improvements"}
                                        {feedbackData.rating === 2 && "Fair - Some issues to address"}
                                        {feedbackData.rating === 3 && "Good - Meets expectations"}
                                        {feedbackData.rating === 4 && "Very Good - Exceeds expectations"}
                                        {feedbackData.rating === 5 && "Excellent - Outstanding experience"}
                                    </p>
                                    {errors.rating && (
                                        <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
                                            <AlertCircle size={12} />
                                            {errors.rating}
                                        </div>
                                    )}
                                </div>

                                {/* Overall Experience */}
                                <div className={errors.experience ? "error-field" : ""}>
                                    <label className="block text-xs md:text-sm font-medium mb-3 text-[#F5F5F5]">
                                        How would you describe your overall experience? <span className="text-[#FF007F]">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {experienceOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleExperienceSelect(option.value)}
                                                className={`p-2 md:p-3 rounded-lg text-center transition-all ${feedbackData.experience === option.value
                                                        ? "bg-[#FF007F]/20 border border-[#FF007F] text-[#F5F5F5]"
                                                        : "bg-[#0D0D0D] border border-[#F5F5F5]/20 hover:border-[#00E5FF]/50 text-[#F5F5F5]"
                                                    }`}
                                            >
                                                <option.icon size={20} className="md:hidden mx-auto mb-1" style={{ color: option.color }} />
                                                <option.icon
                                                    size={24}
                                                    className="hidden md:block mx-auto mb-1"
                                                    style={{ color: option.color }}
                                                />
                                                <div className="text-xs font-medium">{option.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.experience && (
                                        <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
                                            <AlertCircle size={12} />
                                            {errors.experience}
                                        </div>
                                    )}
                                </div>

                                {/* Detailed Feedback */}
                                <div className={errors.feedback ? "error-field" : ""}>
                                    <div className="space-y-3 md:space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium mb-2 text-[#F5F5F5]">
                                                What did you like most about StudyHub? 😊
                                            </label>
                                            <textarea
                                                name="liked"
                                                value={feedbackData.liked}
                                                onChange={handleInputChange}
                                                placeholder="Tell us what worked well for you..."
                                                className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[60px] md:min-h-[80px] text-[#F5F5F5] placeholder-[#F5F5F5]/50 transition-colors resize-none text-sm md:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs md:text-sm font-medium mb-2 text-[#F5F5F5]">
                                                What could we improve? 🚀
                                            </label>
                                            <textarea
                                                name="improvements"
                                                value={feedbackData.improvements}
                                                onChange={handleInputChange}
                                                placeholder="Share your ideas for making StudyHub better..."
                                                className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[60px] md:min-h-[80px] text-[#F5F5F5] placeholder-[#F5F5F5]/50 transition-colors resize-none text-sm md:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs md:text-sm font-medium mb-2 text-[#F5F5F5]">
                                                Any new features you'd love to see? 💡
                                            </label>
                                            <textarea
                                                name="newFeatures"
                                                value={feedbackData.newFeatures}
                                                onChange={handleInputChange}
                                                placeholder="Dream big! What features would make your study experience even better?"
                                                className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[60px] md:min-h-[80px] text-[#F5F5F5] placeholder-[#F5F5F5]/50 transition-colors resize-none text-sm md:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs md:text-sm font-medium mb-2 text-[#F5F5F5]">
                                                Anything else you'd like to share? 💭
                                            </label>
                                            <textarea
                                                name="additionalComments"
                                                value={feedbackData.additionalComments}
                                                onChange={handleInputChange}
                                                placeholder="Any additional thoughts, suggestions, or comments..."
                                                className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[60px] md:min-h-[80px] text-[#F5F5F5] placeholder-[#F5F5F5]/50 transition-colors resize-none text-sm md:text-base"
                                            />
                                        </div>
                                    </div>
                                    {errors.feedback && (
                                        <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
                                            <AlertCircle size={12} />
                                            {errors.feedback}
                                        </div>
                                    )}
                                </div>

                                {/* Recommendation */}
                                <div className={errors.wouldRecommend ? "error-field" : ""}>
                                    <label className="block text-xs md:text-sm font-medium mb-3 text-[#F5F5F5]">
                                        Would you recommend StudyHub to other students? <span className="text-[#FF007F]">*</span>
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleRecommendationSelect(true)}
                                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${feedbackData.wouldRecommend === true
                                                    ? "bg-green-500/20 border border-green-500 text-green-400"
                                                    : "bg-[#0D0D0D] border border-[#F5F5F5]/20 hover:border-green-500/50 text-[#F5F5F5]"
                                                }`}
                                        >
                                            <ThumbsUp size={16} />
                                            <span className="text-sm md:text-base">Yes, definitely!</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRecommendationSelect(false)}
                                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${feedbackData.wouldRecommend === false
                                                    ? "bg-red-500/20 border border-red-500 text-red-400"
                                                    : "bg-[#0D0D0D] border border-[#F5F5F5]/20 hover:border-red-500/50 text-[#F5F5F5]"
                                                }`}
                                        >
                                            <ThumbsDown size={16} />
                                            <span className="text-sm md:text-base">Not yet</span>
                                        </button>
                                    </div>
                                    {errors.wouldRecommend && (
                                        <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
                                            <AlertCircle size={12} />
                                            {errors.wouldRecommend}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center sm:justify-end pt-4 border-t border-[#F5F5F5]/10">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`flex items-center gap-2 px-6 md:px-8 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center ${isSubmitting ? "bg-[#FF007F]/50 cursor-not-allowed" : "bg-[#FF007F] hover:bg-[#FF007F]/90"
                                            } text-[#F5F5F5] font-medium text-sm md:text-base`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-[#F5F5F5]/30 border-t-[#F5F5F5] rounded-full animate-spin"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Submit Feedback
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
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
                        <div className="space-y-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-[#F5F5F5]/10 rounded-lg">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full p-2 md:p-3 text-left flex items-center justify-between hover:bg-[#0D0D0D] transition-colors rounded-lg"
                                    >
                                        <span className="text-xs md:text-sm font-medium text-[#F5F5F5] pr-2">{faq.question}</span>
                                        {expandedFaq === index ? (
                                            <ChevronUp size={14} className="md:hidden text-[#F5F5F5]/60 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown size={14} className="md:hidden text-[#F5F5F5]/60 flex-shrink-0" />
                                        )}
                                        {expandedFaq === index ? (
                                            <ChevronUp size={16} className="hidden md:block text-[#F5F5F5]/60 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown size={16} className="hidden md:block text-[#F5F5F5]/60 flex-shrink-0" />
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
                    </div>
                </div>
            </div>
        </div>
    )
}
