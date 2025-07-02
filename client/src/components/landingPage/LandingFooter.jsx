import { BookOpen, Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function LandingFooter() {
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
                            Empowering students worldwide with free access to collaborative learning tools. Share knowledge, grow
                            together, succeed faster.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Github size={24} />
                            </a>
                            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Linkedin size={24} />
                            </a>
                            <a href="#" className="text-[#F5F5F5]/60 hover:text-[#FF007F] transition-colors">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Features</h3>
                        <ul className="space-y-3 text-[#F5F5F5]/70">
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Free Notes Access
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Interactive Quizzes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Progress Tracking
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Community Sharing
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Support</h3>
                        <ul className="space-y-3 text-[#F5F5F5]/70">
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Community Forum
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF007F] transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#F5F5F5]/10 mt-12 pt-8 text-center text-[#F5F5F5]/60">
                    <p>&copy; 2024 StudyHub. Empowering students worldwide. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
} 