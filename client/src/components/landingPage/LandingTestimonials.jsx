import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Computer Science, MIT",
        content:
            "StudyHub revolutionized my study routine. I can access notes anywhere and the quiz feature helped me ace my algorithms exam!",
        avatar: "S",
        rating: 5,
    },
    {
        name: "Marcus Johnson",
        role: "Pre-Med, Stanford",
        content:
            "The community aspect is incredible. I've connected with students from around the world and shared valuable resources.",
        avatar: "M",
        rating: 5,
    },
    {
        name: "Elena Rodriguez",
        role: "Engineering, Caltech",
        content: "Free access to quality study materials changed everything for me. No more expensive textbooks!",
        avatar: "E",
        rating: 5,
    },
]

export default function LandingTestimonials() {
    return (
        <section id="testimonials" className="py-20 bg-[#1A1A1A]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Loved by 
                        <span className="text-[#FF007F]"> Students</span>
                    </h2>
                    <p className="text-xl text-[#F5F5F5]/80">See what students are saying about their StudyHub experience</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#F5F5F5]/5 hover:border-[#FF007F]/30 transition-all"
                        >
                            <div className="flex items-center mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={20} className="text-yellow-500 fill-current" />
                                ))}
                            </div>
                            <p className="text-[#F5F5F5]/80 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF007F] to-[#00E5FF] flex items-center justify-center text-white font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-sm text-[#F5F5F5]/60">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 