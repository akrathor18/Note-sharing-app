import { Clock, FileText, CheckCircle2, ChevronRight, Download } from "lucide-react"
import { useEffect, useState } from "react"
import API from "../config/axios"

function SkeletonLoader() {
  return(
    <div className="space-y-6 md:space-y-8 animate-pulse">
  {/* Welcome Section */}
  <div>
    <div className="h-6 w-2/3 bg-[#2A2A2A] rounded mb-2"></div>
    <div className="h-4 w-1/3 bg-[#2A2A2A] rounded"></div>
  </div>

  {/* Stats Cards Skeleton */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 w-16 bg-[#2A2A2A] rounded mb-2"></div>
            <div className="h-6 w-24 bg-[#2A2A2A] rounded"></div>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2A2A2A] rounded-lg"></div>
        </div>
      </div>
    ))}
  </div>

  {/* Recent Notes Skeleton */}
  <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5 space-y-3">
    <div className="flex justify-between items-center mb-4">
      <div className="h-5 w-1/4 bg-[#2A2A2A] rounded"></div>
      <div className="h-4 w-16 bg-[#2A2A2A] rounded"></div>
    </div>
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D0D]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-[#2A2A2A] rounded-lg"></div>
          <div className="space-y-1 min-w-0">
            <div className="h-4 w-32 bg-[#2A2A2A] rounded"></div>
            <div className="h-3 w-24 bg-[#2A2A2A] rounded"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-[#2A2A2A] rounded-full"></div>
      </div>
    ))}
  </div>

  {/* Quizzes and Activity Skeleton */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Upcoming Quizzes */}
    <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5 space-y-3">
      <div className="h-5 w-1/3 bg-[#2A2A2A] rounded mb-3"></div>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-3 rounded-lg bg-[#0D0D0D] space-y-2">
          <div className="h-4 w-1/2 bg-[#2A2A2A] rounded"></div>
          <div className="h-3 w-1/3 bg-[#2A2A2A] rounded"></div>
        </div>
      ))}
    </div>

    {/* Activity Chart */}
    <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
      <div className="h-5 w-1/3 bg-[#2A2A2A] rounded mb-4"></div>
      <div className="h-36 md:h-48 flex items-end justify-between px-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-6 md:w-8 bg-[#2A2A2A] rounded-sm" style={{ height: `${30 + i * 5}px` }}></div>
            <div className="h-3 w-6 mt-2 bg-[#2A2A2A] rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  )
}

export default function Dashboard() {
  // Sample data
  const recentNotes = [
    { id: 1, title: "Data Structures & Algorithms", subject: "Computer Science", date: "2 days ago" },
    { id: 2, title: "Organic Chemistry Reactions", subject: "Chemistry", date: "1 week ago" },
    { id: 3, title: "Calculus II: Integration", subject: "Mathematics", date: "2 weeks ago" },
  ]

  const upcomingQuizzes = [
    { id: 1, title: "Database Systems", date: "Tomorrow, 2:00 PM", questions: 20 },
    { id: 2, title: "Modern Physics", date: "Friday, 10:00 AM", questions: 15 },
  ]
  const [userDetails, setUserDetails] = useState()
  
  const fetchUserDetail=async()=>{
  setTimeout(async () => {
    try {
      const response = await API.get("/users/profile")
      setUserDetails(response.data);
     } catch (error) {
      console.log(error)
     }
  }, 1000);
  }

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
    return(
      <SkeletonLoader />
    )
  }
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-1">Welcome back, {userDetails.name}!</h1>
        <p className="text-[#F5F5F5]/60">Here's what's happening with your studies</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {activityStats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F5F5F5]/60 text-sm">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Notes */}
      <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Notes</h2>
          <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {recentNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#FF007F]/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-[#FF007F]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{note.title}</h3>
                  <p className="text-xs text-[#F5F5F5]/60 truncate">
                    {note.subject} • {note.date}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-[#1A1A1A] transition-colors flex-shrink-0">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Quizzes & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Quizzes */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Upcoming Quizzes</h2>
            <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingQuizzes.map((quiz) => (
              <div key={quiz.id} className="p-3 rounded-lg bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 transition-colors">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h3 className="font-medium">{quiz.title}</h3>
                  <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded-full">
                    {quiz.questions} Questions
                  </span>
                </div>
                <div className="flex items-center text-xs text-[#F5F5F5]/60">
                  <Clock size={14} className="mr-1" />
                  {quiz.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Study Activity</h2>
            <select className="bg-[#0D0D0D] text-sm border border-[#F5F5F5]/10 rounded-lg px-2 py-1 focus:outline-none focus:border-[#FF007F]">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="h-36 md:h-48 flex items-end justify-between px-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              // Generate random heights for the chart bars
              const height = Math.floor(Math.random() * 80) + 20
              return (
                <div key={day} className="flex flex-col items-center">
                  <div
                    className="bg-white w-6 md:w-8 rounded-t-sm transition-all duration-500 hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor: i === 2 ? "#FF007F" : "#00E5FF",
                    }}
                  ></div>
                  <span className="text-xs mt-2 text-[#F5F5F5]/60">{day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

