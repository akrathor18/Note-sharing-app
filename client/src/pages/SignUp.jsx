import { useState } from "react";
import { useForm } from "react-hook-form";
import { BookOpen, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../config/axios";


export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // States 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form
  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await API.post("users/register", {
        email: data.email,
        password: data.password,
        name: data.name,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      toast.success("resgister successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-[#1A1A1A] rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="text-[#FF007F] h-8 w-8" />
            <h1 className="text-2xl font-bold">StudyHub</h1>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                size={18}
              />
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full bg-[#0D0D0D] border ${
                  errors.name ? "border-red-500" : "border-[#F5F5F5]/10"
                } rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
                className={`w-full bg-[#0D0D0D] border ${
                  errors.email ? "border-red-500" : "border-[#F5F5F5]/10"
                } rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                size={18}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full bg-[#0D0D0D] border ${
                  errors.password ? "border-red-500" : "border-[#F5F5F5]/10"
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
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                size={18}
              />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full bg-[#0D0D0D] border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-[#F5F5F5]/10"
                } rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: "You must accept the terms" })}
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
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
          )}

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#FF007F] hover:bg-[#FF007F]/90 text-white py-2 rounded-lg transition-colors font-medium"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#F5F5F5]/60">
            Already have an account?{" "}
            <Link to={"/signin"} className="text-[#00E5FF] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
