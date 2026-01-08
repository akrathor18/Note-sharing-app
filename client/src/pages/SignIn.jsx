import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BookOpen, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
export default function SignIn() {
    const {signIn, isSigning}= useUserStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const success = await signIn(data)
        if(success) {navigate("/dashboard")}
    };
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 bg-[#1A1A1A] rounded-xl shadow-lg">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2">
                        <BookOpen className="text-[#FF007F] h-8 w-8" />
                        <h1 className="text-2xl font-bold">StudyHub</h1>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-6 text-center">Sign in to your account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                                size={18}
                            />
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Email is invalid',
                                    },
                                })}
                                className={`w-full bg-[#0D0D0D] border ${errors.email ? 'border-red-500' : 'border-[#F5F5F5]/10'
                                    } rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                                placeholder="your.email@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                                size={18}
                            />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                                className={`w-full bg-[#0D0D0D] border ${errors.password ? 'border-red-500' : 'border-[#F5F5F5]/10'
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
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Remember me and forgot password */}
                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-[#F5F5F5]/10 bg-[#0D0D0D] text-[#FF007F] focus:ring-[#FF007F]"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-[#00E5FF] hover:underline">
                            Forgot password?
                        </a>
                    </div> */}

                    {/* Submit button */}
                    <button
                        disabled={isSigning}
                        type="submit"
                        className="w-full bg-[#FF007F] hover:bg-[#FF007F]/90 text-white py-2 rounded-lg transition-colors font-medium"
                    >
                        {isSigning ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Sign up link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-[#F5F5F5]/60">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-[#00E5FF] hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
