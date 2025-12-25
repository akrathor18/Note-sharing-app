import { useEffect } from "react";
import {
  FileText,
  Flame,
  Trophy,
  TrendingUp,
  Brain,
  PenTool,
} from "lucide-react";

import { useUserStore } from "../store/userStore.js";
import QuickStats from "../components/dashboard/QuickStats.jsx";
import QuickAction from "../components/dashboard/QuickAction.jsx";
import RecentActivity from "../components/dashboard/RecentActivity.jsx";
import Streak from "../components/dashboard/Streak.jsx";
import AverageQuizeScore from "../components/dashboard/AverageQuizeScore.jsx";
import SecondaryStates from "../components/dashboard/SecondaryStates.jsx";
import SkeletonLoader from "../components/dashboard/skeletonLoader.jsx";
import ErrorState from '../common/components/ErrorState';

export default function Dashboard() {
  // Zustand store
  const { user, userStates, averageScore, fetchUser, getScore, isLoading, error } =
    useUserStore();

  // Fetch user + quiz stats on mount
  useEffect(() => {
    fetchUser();
    getScore();
  }, [fetchUser, getScore]);

  if (isLoading) return <SkeletonLoader />;

  if (error) return <ErrorState title='Unable to load Dashboard' message={error} />;

  // Safely unwrap user data
  const userState = userStates || {};
  const userInfo = user || {};
  const userData = {
    name: userInfo.name || "User",
    totalNotesUploaded: userState.totalNotes || 0,
    totalQuizzesCreated: userState.totalQuizCreated || 0,
    totalQuizAttempts: userState.totalQuizzesTaken || 0,
    currentStreak: userState.streak || 0,
    averageQuizScore: averageScore ? averageScore.averagePercentage : 0,
    attemptedQuizzes: averageScore ? averageScore.attempts : 0,
    highestStreak: userState.highestStreak || 0,
  };

  const recentActivity = userInfo.recentActivity || [];

  const mainStats = [
    {
      label: "Total Notes Uploaded",
      value: userData.totalNotesUploaded,
      icon: FileText,
      color: "#FF007F",
      trendUp: true,
      description: "Notes shared with community",
      bgGradient: "from-[#FF007F]/20 to-[#FF007F]/5",
    },
    {
      label: "Total Quizzes Created",
      value: userData.totalQuizzesCreated,
      icon: Brain,
      color: "#00E5FF",
      trendUp: true,
      description: "Interactive quizzes made",
      bgGradient: "from-[#00E5FF]/20 to-[#00E5FF]/5",
    },
    {
      label: "Total Quiz Attempts",
      value: userData.totalQuizAttempts,
      icon: PenTool,
      color: "#4CAF50",
      trendUp: true,
      description: "Practice sessions completed",
      bgGradient: "from-[#4CAF50]/20 to-[#4CAF50]/5",
    },
    {
      label: "Current Streak",
      value: `${userData.currentStreak} days`,
      icon: Flame,
      color: "#FF6B35",
      trendUp: true,
      description: "Keep the momentum going!",
      bgGradient: "from-[#FF6B35]/20 to-[#FF6B35]/5",
    },
  ];

  const secondaryStats = [
    {
      label: "Highest Streak",
      value: userData.highestStreak,
      icon: TrendingUp,
      color: "#FFD93D",
      change: "trending up",
    },
    {
      label: "Average Quiz Score",
      value: `${userData.averageQuizScore}%`,
      icon: Trophy,
      color: "#9C27B0",
      change: "excellent performance",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-1">
          Welcome back,<span className="capitalize"> {userData.name}</span>!
        </h1>
        <p className="text-[#F5F5F5]/60">
          Here's what's happening with your studies
        </p>
      </div>

      <QuickStats mainStats={mainStats} />
      <SecondaryStates statsData={secondaryStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <QuickAction />
          <RecentActivity activity={recentActivity} />
        </div>

        <div className="space-y-6">
          <Streak user={userData} />
          <AverageQuizeScore user={userData} />
        </div>
      </div>
    </div>
  );
}
