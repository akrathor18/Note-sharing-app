"use client"

import { useState } from "react"
import {
  FileText,
  BrainCircuit,
  Plus,
  Flame,
  Trophy,
  Upload,
  TrendingUp,
  CheckCircle2,
  Brain,
  PenTool,
} from "lucide-react"
import QuickStats from "../components/dashboard/QuickStats.jsx"
import QuickAction from "../components/dashboard/QuickAction.jsx"
import RecentActivity from "../components/dashboard/RecentActivity.jsx"
import Streak from "../components/dashboard/Streak.jsx"
import AverageQuizeScore from "../components/dashboard/AverageQuizeScore.jsx"
import SecondaryStates from "../components/dashboard/SecondaryStates.jsx"
export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week") // week, month, year

  // User data based on your specifications
  const userData = {
    name: "John",
    totalNotesUploaded: 47,
    totalQuizzesCreated: 23,
    totalQuizAttempts: 156,
    currentStreak: 12,
    averageQuizScore: 87.5,
    notesUploadTrend: "+8", // This week
    level: 15,
    totalPoints: 3420,
  }

  // Main stats cards data
  const mainStats = [
    {
      label: "Total Notes Uploaded",
      value: userData.totalNotesUploaded,
      icon: FileText,
      color: "#FF007F",
      trend: userData.notesUploadTrend,
      trendUp: true,
      description: "Notes shared with community",
      bgGradient: "from-[#FF007F]/20 to-[#FF007F]/5",
    },
    {
      label: "Total Quizzes Created",
      value: userData.totalQuizzesCreated,
      icon: Brain,
      color: "#00E5FF",
      trend: "+3",
      trendUp: true,
      description: "Interactive quizzes made",
      bgGradient: "from-[#00E5FF]/20 to-[#00E5FF]/5",
    },
    {
      label: "Total Quiz Attempts",
      value: userData.totalQuizAttempts,
      icon: PenTool,
      color: "#4CAF50",
      trend: "+12",
      trendUp: true,
      description: "Practice sessions completed",
      bgGradient: "from-[#4CAF50]/20 to-[#4CAF50]/5",
    },
    {
      label: "Current Streak",
      value: `${userData.currentStreak} days`,
      icon: Flame,
      color: "#FF6B35",
      trend: "+2",
      trendUp: true,
      description: "Keep the momentum going!",
      bgGradient: "from-[#FF6B35]/20 to-[#FF6B35]/5",
    },
  ]

  // Secondary stats
  const secondaryStats = [
    {
      label: "Notes Upload Trend",
      value: userData.notesUploadTrend,
      icon: TrendingUp,
      color: "#FFD93D",
      description: "This week",
      change: "trending up",
    },
    {
      label: "Average Quiz Score",
      value: `${userData.averageQuizScore}%`,
      icon: Trophy,
      color: "#9C27B0",
      description: "Last 20 attempts",
      change: "excellent performance",
    },
  ]

  // Recent Activity data
  const recentActivity = [
    {
      id: 1,
      type: "note_upload",
      title: "Advanced React Patterns",
      action: "uploaded",
      subject: "Computer Science",
      time: "2 hours ago",
      icon: Upload,
      color: "#FF007F",
      details: "15 downloads already",
      points: 25,
    },
    {
      id: 2,
      type: "quiz_attempt",
      title: "Database Fundamentals Quiz",
      action: "completed",
      subject: "Computer Science",
      score: "94%",
      time: "4 hours ago",
      icon: BrainCircuit,
      color: "#00E5FF",
      details: "New personal best!",
      points: 47,
    },
    {
      id: 3,
      type: "quiz_created",
      title: "JavaScript ES6 Features",
      action: "created",
      subject: "Web Development",
      time: "1 day ago",
      icon: Plus,
      color: "#4CAF50",
      details: "8 students attempted",
      points: 35,
    },
    {
      id: 4,
      type: "note_upload",
      title: "Calculus Integration Methods",
      action: "uploaded",
      subject: "Mathematics",
      time: "1 day ago",
      icon: FileText,
      color: "#FF007F",
      details: "22 downloads",
      points: 30,
    },
    {
      id: 5,
      type: "quiz_attempt",
      title: "Organic Chemistry Reactions",
      action: "completed",
      subject: "Chemistry",
      score: "78%",
      time: "2 days ago",
      icon: CheckCircle2,
      color: "#00E5FF",
      details: "Room for improvement",
      points: 20,
    },
    {
      id: 6,
      type: "streak_milestone",
      title: "10-Day Study Streak",
      action: "achieved",
      time: "3 days ago",
      icon: Flame,
      color: "#FF6B35",
      details: "Consistency pays off!",
      points: 100,
    },
  ]



  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Header */}

            <div>
                <h1 className="text-xl md:text-2xl font-bold mb-1">
                    Welcome back, {userData.name}!
                </h1>
                <p className="text-[#F5F5F5]/60">Here's what's happening with your studies</p>
            </div>
      <QuickStats mainStats={mainStats} />
      <SecondaryStates statsData={secondaryStats} />


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <QuickAction />
          <RecentActivity activity={recentActivity} />
        </div>

        {/* Right Column  */}
        <div className="space-y-6">
          <Streak user={userData} />
          <AverageQuizeScore user={userData} />
        </div>
      </div>
    </div>
  )
}
