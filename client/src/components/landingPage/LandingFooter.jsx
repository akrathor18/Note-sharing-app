import { BookOpen, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Link } from "react-router-dom"
export default function LandingFooter() {

    const SupportLinks = [
        {
            label: " Help Center",
            url: ""
        },
        {
            label: " Contact Us",
            url: ""
        },
        {
            label: "Community Forum",
            url: ""
        },
        {
            label: "Privacy Policy",
            url: ""
        },
    ]

    return (
        <footer className="bg-[#1A1A1A] border-t border-[#F5F5F5]/10 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <BookOpen className="text-[#FF007F]" size={32} />
                            <span className="text-2xl font-bold">StudyHub</span>
                        </div>
                        <p className="text-[#F5F5F5]/70 mb-6 text-lg">
                            Empowering students with free access to collaborative learning tools. Share knowledge, grow
                            together, succeed faster.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Features</h3>
                        <ul className="space-y-3 text-[#F5F5F5]/70">
                            <li>
                                <Link to={'/notes'} className="hover:text-[#FF007F] transition-colors">
                                    Free Notes Access
                                </Link>
                            </li>
                            <li>
                                <Link to={"/quizzes"} className="hover:text-[#FF007F] transition-colors">
                                    Interactive Quizzes
                                </Link>
                            </li>
                            <li>
                                <Link to={"/Dashboard"} className="hover:text-[#FF007F] transition-colors">
                                    Progress Tracking
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Support</h3>
                        <ul className="space-y-3 text-[#F5F5F5]/70">
                            {SupportLinks.map((links) => (
                                <li key={links.label} className="cursor-not-allowed">
                                    <Link
                                        to={links.url}
                                        className=" cursor-not-allowed transition-colors"
                                    >
                                        {links.label}
                                    </Link>
                                    <span className="text-xs opacity-60 ml-1">(Coming soon)</span>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#F5F5F5]/10 mt-12 pt-8 text-center text-[#F5F5F5]">
                    <p>
                        Built with ❤️ by <a href="https://github.com/akrathor18" target="_blank" className=" text-[#00E5FF] hover:text-[#FF007F]" >Ashish Kumar.</a>
                    </p>
                    
                        <div className="flex gap-4 items-center justify-center mt-2">
                            <a href="https://github.com/akrathor18" target="_blank" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Github size={24} />
                            </a>
                            <a href="https://x.com/iam_ashish_dev" target="_blank" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="https://linkedin.com/in/ashishkumartech" target="_blank" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:ashishk.codes@gmail.com" target="_blank" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Mail size={24} />
                            </a>
                        </div>
                </div>
            </div>
        </footer>
    )
} 