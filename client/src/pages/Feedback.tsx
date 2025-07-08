import { useState } from "react"
import { faqs } from "../config/data"
import FeedbackForm from "../components/feedback/FeedbackForm"
import FeedbackSidebar from "../components/feedback/FeedbackSidebar"

export default function Feedback() {
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
            <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#F5F5F5]">We Value Your Feedback</h1>
                <p className="text-base md:text-lg text-[#F5F5F5]/70">Help us make StudyHub better for everyone</p>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <FeedbackForm
                        feedbackData={feedbackData}
                        setFeedbackData={setFeedbackData}
                        errors={errors}
                        setErrors={setErrors}
                        isSubmitting={isSubmitting}
                        setIsSubmitting={setIsSubmitting}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                        validateForm={validateForm}
                        handleInputChange={handleInputChange}
                        handleRatingClick={handleRatingClick}
                        handleExperienceSelect={handleExperienceSelect}
                        handleRecommendationSelect={handleRecommendationSelect}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
                    <FeedbackSidebar faqs={faqs} expandedFaq={expandedFaq} toggleFaq={toggleFaq} />
                </div>
            </div>
        </div>
    )
}