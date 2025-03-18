import { useState } from "react"
import { Lock, Mail, Bell, Moon, Sun, Globe, Shield, Save, ChevronDown } from "lucide-react"

export default function Settings({ user, setUser }) {
  const [activeSection, setActiveSection] = useState("account")
  const userData = {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Saving settings:", formData)

    // Update user email if changed
    if (formData.email !== user.email) {
      setUser({
        ...user,
        email: formData.email,
      })
    }

    // Show success message
    setSuccessMessage("Settings saved successfully!")
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Success Message */}
      {successMessage && <div className="bg-green-500/20 text-green-500 p-3 rounded-lg mb-6">{successMessage}</div>}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 bg-[#1A1A1A] rounded-xl p-4 h-fit">
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveSection("account")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "account" ? "bg-[#FF007F]/10 text-[#FF007F]" : "hover:bg-[#F5F5F5]/5"
                  }`}
                >
                  <Mail size={18} />
                  <span>Account</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("security")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "security" ? "bg-[#FF007F]/10 text-[#FF007F]" : "hover:bg-[#F5F5F5]/5"
                  }`}
                >
                  <Lock size={18} />
                  <span>Security</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("notifications")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "notifications" ? "bg-[#FF007F]/10 text-[#FF007F]" : "hover:bg-[#F5F5F5]/5"
                  }`}
                >
                  <Bell size={18} />
                  <span>Notifications</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("appearance")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "appearance" ? "bg-[#FF007F]/10 text-[#FF007F]" : "hover:bg-[#F5F5F5]/5"
                  }`}
                >
                  <Sun size={18} />
                  <span>Appearance</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("language")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "language" ? "bg-[#FF007F]/10 text-[#FF007F]" : "hover:bg-[#F5F5F5]/5"
                  }`}
                >
                  <Globe size={18} />
                  <span>Language</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("privacy")}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    activeSection === "privacy" ? "bg-[#FF007F]/10 text-[#FF007F]" : "hover:bg-[#F5F5F5]/5"
                  }`}
                >
                  <Shield size={18} />
                  <span>Privacy</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-[#1A1A1A] rounded-xl p-6">
          <form onSubmit={handleSubmit}>
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[#F5F5F5]/60 mb-2">
                      Account Type: <span className="text-[#F5F5F5]">{userData.role}</span>
                    </p>
                    <p className="text-sm text-[#F5F5F5]/60">
                      Member Since: <span className="text-[#F5F5F5]">{userData.joinDate}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === "security" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
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
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-[#F5F5F5]/60">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#0D0D0D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF007F]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Quiz Reminders</p>
                      <p className="text-sm text-[#F5F5F5]/60">Get reminders for upcoming quizzes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="quizReminders"
                        checked={formData.quizReminders}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#0D0D0D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF007F]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Study Reminders</p>
                      <p className="text-sm text-[#F5F5F5]/60">Get daily reminders to study</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="studyReminders"
                        checked={formData.studyReminders}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#0D0D0D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF007F]"></div>
                    </label>
                  </div>
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
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

