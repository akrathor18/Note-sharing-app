import { useState } from "react"
import { BookOpen, Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function SignUp({ onSignup, onSwitchToSignIn }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!name) {
      newErrors.name = "Name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSignup(name, email, password)
    }
  }

  return (

    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-[#1A1A1A] rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="text-[#FF007F] h-8 w-8" />
            <h1 className="text-2xl font-bold">StudyHub</h1>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-[#0D0D0D] border ${errors.name ? "border-red-500" : "border-[#F5F5F5]/10"
                  } rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-[#0D0D0D] border ${errors.email ? "border-red-500" : "border-[#F5F5F5]/10"
                  } rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-[#0D0D0D] border ${errors.password ? "border-red-500" : "border-[#F5F5F5]/10"
                  } rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:border-[#FF007F] transition-colors`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40 hover:text-[#F5F5F5]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-[#0D0D0D] border ${errors.confirmPassword ? "border-red-500" : "border-[#F5F5F5]/10"
                  } rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-[#F5F5F5]/10 bg-[#0D0D0D] text-[#FF007F] focus:ring-[#FF007F]"
            />
            <label htmlFor="terms" className="ml-2 block text-sm">
              I agree to the{" "}
              <a href="#" className="text-[#00E5FF] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#00E5FF] hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF007F] hover:bg-[#FF007F]/90 text-white py-2 rounded-lg transition-colors font-medium"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#F5F5F5]/60">
            Already have an account?{" "}
            <button onClick={onSwitchToSignIn} className="text-[#00E5FF] hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

