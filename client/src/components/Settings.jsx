import { useState, useEffect } from "react"
import { Eye, EyeOff, Lock, Mail, Bell, Moon, Sun, Globe, Shield, Save, ChevronDown } from "lucide-react"
import API from "../config/axios"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// skelleton loadder
const SettingsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-6 w-32 bg-gray-700 rounded mb-6"></div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar skeleton */}
        <div className="w-full md:w-64 bg-[#1A1A1A] rounded-xl p-4 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-800 rounded"></div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="flex-1 bg-[#1A1A1A] rounded-xl p-6 space-y-4">
          <div className="h-5 w-40 bg-gray-700 rounded"></div>

          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-24 bg-gray-600 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-800 rounded"></div>
            </div>
          ))}

          <div className="h-10 w-32 bg-gray-700 rounded mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default function Settings({ user, setUser }) {
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("account")
  const [userData, setUserData] = useState({
    id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null, // Will use initial instead
    role: "Student",
    joinDate: "January 2023",
    stats: {
      notesCreated: 12,
      notesViewed: 45,
      quizzesTaken: 8,
      quizzesPassed: 7,
      studyHours: 24,
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      const response = await API.post('/users/changepassword', {
        password: data.currentPassword,
        newPassword: data.newPassword
      });
      console.log(response);
      toast.success(response.data)
    } catch (error) {
      console.error(error.response?.data); // ✅ this will give exact backend error
      toast.error(error.response?.data)
    }
  };


  const showalter = () => alert('We are still working on this feature!');


  const fetchUserDetail = async () => {
    setTimeout(async () => {
      try {

        const response = await API.get("/users/profile")
        setUserData(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }, 1000);
  }

  useEffect(() => {
    fetchUserDetail()
  }, [])

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  const [formData, setFormData] = useState({
    email: userData.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    role: "Student",
    emailNotifications: true,
    quizReminders: true,
    studyReminders: false,
    darkMode: true,
    language: "english",
    privacyProfile: "public",
    privacyActivity: "friends",
  })
  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    handleInputChange(e); // Sync with parent handler if needed
  };


  if (loading) {
    return (<SettingsSkeleton />)
  }



  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500/20 text-green-500 p-3 rounded-lg mb-6">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 bg-[#1A1A1A] rounded-xl p-4 h-fit">
          <nav>
            <ul className="space-y-1">
              {[
                { key: "account", icon: <Mail size={18} />, label: "Account" },
                { key: "security", icon: <Lock size={18} />, label: "Security" },
                { key: "notifications", icon: <Bell size={18} />, label: "Notifications" },
                { key: "appearance", icon: <Sun size={18} />, label: "Appearance" },
                { key: "language", icon: <Globe size={18} />, label: "Language" },
                { key: "privacy", icon: <Shield size={18} />, label: "Privacy" },
              ].map(({ key, icon, label }) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveSection(key)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${activeSection === key ? "bg-[#FF007F]/10 text-[#FF007F]" : "hover:bg-[#F5F5F5]/5"}`}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-[#1A1A1A] rounded-xl p-6">
          <form onSubmit={handleSubmit(showalter)}>
            {/* Account Settings */}
            {activeSection === "account" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleFormChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[#F5F5F5]/60 mb-2">
                      Account Type: <span className="text-[#F5F5F5]">{userData.role}</span>
                    </p>
                    <p className="text-sm text-[#F5F5F5]/60">
                      Member Since: <span className="text-[#F5F5F5]">{formatDate(userData.createdAt)}</span>
                    </p>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}



            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  {[
                    { name: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                    { name: "quizReminders", label: "Quiz Reminders", desc: "Get reminders for upcoming quizzes" },
                    { name: "studyReminders", label: "Study Reminders", desc: "Never miss your daily study sessions" },
                  ].map(({ name, label, desc }) => (
                    <div key={name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-[#F5F5F5]/60">{desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={name}
                          checked={formData[name]}
                          onChange={handleFormChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#0D0D0D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF007F]"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === "appearance" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Appearance Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-[#F5F5F5]/60">Toggle between light and dark themes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="darkMode"
                        checked={formData.darkMode}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#0D0D0D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF007F]"></div>
                      <Moon
                        className={`ml-2 ${formData.darkMode ? "text-[#F5F5F5]" : "text-[#F5F5F5]/40"}`}
                        size={16}
                      />
                    </label>
                  </div>
                  <div className="pt-4">
                    <p className="font-medium mb-2">Color Theme</p>
                    <div className="grid grid-cols-5 gap-2">
                      <button
                        type="button"
                        className="w-full aspect-square rounded-full bg-[#FF007F] ring-2 ring-[#FF007F] ring-offset-2 ring-offset-[#1A1A1A]"
                      ></button>
                      <button type="button" className="w-full aspect-square rounded-full bg-[#00E5FF]"></button>
                      <button type="button" className="w-full aspect-square rounded-full bg-[#9C27B0]"></button>
                      <button type="button" className="w-full aspect-square rounded-full bg-[#4CAF50]"></button>
                      <button type="button" className="w-full aspect-square rounded-full bg-[#FF9800]"></button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Language Settings */}
            {activeSection === "language" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Language Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium mb-1">
                      Display Language
                    </label>
                    <div className="relative">
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-[#FF007F]"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                        size={16}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === "privacy" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Privacy Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="privacyProfile" className="block text-sm font-medium mb-1">
                      Profile Visibility
                    </label>
                    <div className="relative">
                      <select
                        id="privacyProfile"
                        name="privacyProfile"
                        value={formData.privacyProfile}
                        onChange={handleInputChange}
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-[#FF007F]"
                      >
                        <option value="public">Public - Anyone can view</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private - Only me</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                        size={16}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="privacyActivity" className="block text-sm font-medium mb-1">
                      Activity Visibility
                    </label>
                    <div className="relative">
                      <select
                        id="privacyActivity"
                        name="privacyActivity"
                        value={formData.privacyActivity}
                        onChange={handleInputChange}
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-[#FF007F]"
                      >
                        <option value="public">Public - Anyone can view</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private - Only me</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                        size={16}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
          {/* Security Settings */}
          {activeSection === "security" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2 className="text-lg font-bold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                      Current Password
                    </label>
                    <input
                      {...register("currentPassword", { required: "This field is Required *" })}
                      id="currentPassword"
                      type="password"
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />

                    {errors.currentPassword && (
                      <span className="text-red-500 text-sm">{errors.currentPassword.message}</span>
                    )}
                  </div>

                  {/* New Password */}
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      {...register("newPassword", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 6 characters" },
                      })}
                      className={`w-full bg-[#0D0D0D] border ${errors.newPassword ? "border-red-500" : "border-[#F5F5F5]/10"} rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:border-[#FF007F]`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40 hover:text-[#F5F5F5]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
                      <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) => value === newPassword || "Passwords do not match",
                        })}
                        className={`w-full bg-[#0D0D0D] border ${errors.confirmPassword ? "border-red-500" : "border-[#F5F5F5]/10"} rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-[#F5F5F5]/60 mb-2">Password Requirements:</p>
                    <ul className="text-xs text-[#F5F5F5]/60 space-y-1 list-disc pl-5">
                      <li>At least 8 characters long</li>
                      <li>Include at least one uppercase letter</li>
                      <li>Include at least one number</li>
                      <li>Include at least one special character</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center gap-2 ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#FF007F] hover:bg-[#FF007F]/90'} text-white px-4 py-2 rounded-lg transition-colors`}
                    >
                      <Save size={16} />
                      {isSubmitting ? 'Saving...' : "Update Password"}
                    </button>
                  </div>
                </div>
              </div>
            </form>

          )}
        </div>
      </div>
    </div>
  )
}

