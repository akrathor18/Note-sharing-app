import { useState } from "react"
import {
  BookOpen,
  BrainCircuit,
  Users,
  Star,
  ArrowRight,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Download,
  Upload,
  BarChart3,
  Heart,
  Zap,
  Shield,
  Smartphone,
  Laptop,
  Tablet,
} from "lucide-react"
import {useNavigate } from 'react-router-dom';

export default function LandingPage({ onGetStarted }) {
  
      const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const stats = [
    { number: "50K+", label: "Students Learning" },
    { number: "100K+", label: "Notes Shared" },
    { number: "25K+", label: "Quizzes Created" },
    { number: "98%", label: "Success Rate" },
  ]

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

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      {/* Navigation */}
      <nav className="bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#F5F5F5]/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="text-[#FF007F]" size={32} />
              <span className="text-xl font-bold">StudyHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-[#FF007F] transition-colors">
                Features
              </a>
              <a href="#community" className="hover:text-[#FF007F] transition-colors">
                Community
              </a>
              <a href="#testimonials" className="hover:text-[#FF007F] transition-colors">
                Reviews
              </a>
              <button
                onClick={onGetStarted}
                className="bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Get Started Free
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F5F5F5]/10"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#F5F5F5]/10">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="hover:text-[#FF007F] transition-colors">
                  Features
                </a>
                <a href="#community" className="hover:text-[#FF007F] transition-colors">
                  Community
                </a>
                <a href="#testimonials" className="hover:text-[#FF007F] transition-colors">
                  Reviews
                </a>
                <button
                  onClick={onGetStarted}
                  className="bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-full font-medium transition-colors w-full"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Learn Smarter,
                <br />
                <span className="bg-gradient-to-r from-[#FF007F] to-[#00E5FF] bg-clip-text text-transparent">
                  Study Together
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#F5F5F5]/80 mb-8 max-w-2xl">
                Join thousands of students sharing notes, creating quizzes, and achieving academic success together.
                <span className="text-[#00E5FF] font-semibold"> Completely free.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button
                  onClick={onGetStarted}
                  className="bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  Start Learning Free
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={onGetStarted}
                  className="border-2 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0D0D0D] px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <Upload size={20} />
                  Upload Notes
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#FF007F]">50K+</div>
                  <div className="text-sm text-[#F5F5F5]/60">Active Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#00E5FF]">100K+</div>
                  <div className="text-sm text-[#F5F5F5]/60">Notes Shared</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#FF007F]">Free</div>
                  <div className="text-sm text-[#F5F5F5]/60">Forever</div>
                </div>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-[#FF007F]/20 via-[#1A1A1A] to-[#00E5FF]/20 rounded-3xl p-8 border border-[#F5F5F5]/10">
                {/* Students using devices */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Student with laptop */}
                  <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#FF007F]/30 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#FF007F] flex items-center justify-center text-white font-bold text-sm">
                        A
                      </div>
                      <div>
                        <div className="text-sm font-medium">Alex</div>
                        <div className="text-xs text-[#F5F5F5]/60">Studying CS</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <Laptop size={40} className="text-[#FF007F] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-center text-[#F5F5F5]/70">Downloading algorithm notes</div>
                  </div>

                  {/* Student with tablet */}
                  <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#00E5FF]/30 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold text-sm">
                        M
                      </div>
                      <div>
                        <div className="text-sm font-medium">Maya</div>
                        <div className="text-xs text-[#F5F5F5]/60">Taking Quiz</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <Tablet size={40} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-center text-[#F5F5F5]/70">Practicing chemistry quiz</div>
                  </div>

                  {/* Student uploading */}
                  <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#FF007F]/30 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF007F] to-[#00E5FF] flex items-center justify-center text-white font-bold text-sm">
                        S
                      </div>
                      <div>
                        <div className="text-sm font-medium">Sam</div>
                        <div className="text-xs text-[#F5F5F5]/60">Sharing Notes</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <Upload size={40} className="text-[#FF007F] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-center text-[#F5F5F5]/70">Uploading math solutions</div>
                  </div>

                  {/* Student on phone */}
                  <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5 hover:border-[#00E5FF]/30 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold text-sm">
                        J
                      </div>
                      <div>
                        <div className="text-sm font-medium">Jordan</div>
                        <div className="text-xs text-[#F5F5F5]/60">On the go</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <Smartphone size={40} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-center text-[#F5F5F5]/70">Reviewing flashcards mobile</div>
                  </div>
                </div>

                {/* Floating action indicators */}
                <div className="absolute -top-4 -right-4 bg-[#FF007F] text-white p-3 rounded-full animate-bounce">
                  <Download size={16} />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#00E5FF] text-[#0D0D0D] p-3 rounded-full animate-pulse">
                  <BrainCircuit size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Community Section */}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#FF007F] flex items-center justify-center text-white font-bold">
                      K
                    </div>
                    <div>
                      <div className="font-medium">Kevin</div>
                      <div className="text-xs text-[#F5F5F5]/60">just shared</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#F5F5F5]/80">"Physics Formula Sheet" 📚</div>
                </div>

                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold">
                      L
                    </div>
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF007F] to-[#00E5FF] flex items-center justify-center text-white font-bold">
                      R
                    </div>
                    <div>
                      <div className="font-medium">Ryan</div>
                      <div className="text-xs text-[#F5F5F5]/60">helped 12 students</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#F5F5F5]/80">Calculus study group 🤝</div>
                </div>

                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#F5F5F5]/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold">
                      T
                    </div>
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[#1A1A1A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Loved by Students
              <span className="text-[#FF007F]">Worldwide</span>
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

      {/* CTA Section */}
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

      {/* Footer */}
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
    </div>
  )
}
