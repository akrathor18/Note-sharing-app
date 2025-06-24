import { Clock, FileText, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../config/axios";

// Components
import SkeletonLoader from "../common/components/dashboard/skeletonLoader";
import ActivityStats from "../common/components/dashboard/activityStats";
import RecentNotes from "../common/components/dashboard/recentNotes";
import UpcomingQuizzes from "../common/components/dashboard/upcomingQuiz";
import StudyActivityChart from "../common/components/dashboard/studyActivityChart";

// Sample data
const recentNotes = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    date: "1 week ago",
  },
  {
    id: 3,
    title: "Calculus II: Integration",
    subject: "Mathematics",
    date: "2 weeks ago",
  },
];

const upcomingQuizzes = [
  {
    id: 1,
    title: "Database Systems",
    date: "Tomorrow, 2:00 PM",
    questions: 20,
  },
  { id: 2, title: "Modern Physics", date: "Friday, 10:00 AM", questions: 15 },
];

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState();

  const fetchUserDetail = async () => {
    setTimeout(async () => {
      try {
        const response = await API.get("/users/profile");
        setUserDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    console.log("Fetched user details:", userDetails);
  }, [userDetails]);

  const activityStats = [
    {
      label: "Notes Viewed",
      value: userDetails?.stats?.totalNoteVisits ?? 10,
      icon: FileText,
      color: "#FF007F",
    },
    {
      label: "Quizzes Completed",
      value: userDetails?.stats?.quizzesTaken ?? 10,
      icon: CheckCircle2,
      color: "#00E5FF",
    },
    {
      label: "Study Hours",
      value: userDetails?.stats?.totalStudyTime ?? 10,
      icon: Clock,
      color: "#FF007F",
    },
  ];

  if (!userDetails) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-1">
          Welcome back, {userDetails.name}!
        </h1>
        <p className="text-[#F5F5F5]/60">
          Here's what's happening with your studies
        </p>
      </div>
      <ActivityStats stats={activityStats} />
      <RecentNotes notes={recentNotes} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingQuizzes quizzes={upcomingQuizzes} />
        <StudyActivityChart />
      </div>
    </div>
  );
}
