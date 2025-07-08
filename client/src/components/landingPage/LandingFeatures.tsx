import { Download, BarChart3, Users, Upload } from "lucide-react"

const features = [
    {
        icon: Download,
        title: "Free Access",
        description: "Access thousands of study materials completely free. No hidden charges, no subscriptions required.",
        color: "#00E5FF",
    },
    {
        icon: BarChart3,
        title: "Activity Tracking",
        description: "Monitor your progress with detailed analytics and insights into your learning patterns.",
        color: "#FF007F",
    },
    {
        icon: Users,
        title: "Community Sharing",
        description: "Share your notes with classmates and discover materials from students worldwide.",
        color: "#00E5FF",
    },
    {
        icon: Upload,
        title: "Easy Upload",
        description: "Upload your notes in seconds with our intuitive interface and automatic formatting.",
        color: "#FF007F",
    },
]

export default function LandingFeatures() {
    return (
        <section id="features" className="py-20 bg-[#1A1A1A]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Everything You Need to
                        <span className="text-[#FF007F]"> Excel</span>
                    </h2>
                    <p className="text-xl text-[#F5F5F5]/80 max-w-3xl mx-auto">
                        Powerful tools designed for modern students. Study smarter, not harder.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/20 transition-all hover:scale-105 group"
                        >
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: `${feature.color}20` }}
                            >
                                <feature.icon size={32} style={{ color: feature.color }} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-[#F5F5F5]/70 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 