import { BrainCircuit } from "lucide-react"

const Profile = () => {
  const user = {
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
  return (
    <div className="bg-black rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <p className="text-gray-700">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Stats</h3>
        <div className="flex items-center space-x-4">
          <div>
            <div className="w-10 h-10 mx-auto rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-2">
              <BrainCircuit size={18} className="text-[#00E5FF]" />
            </div>
            <p className="text-2xl font-bold">{user.stats.quizzesPassed}</p>
            <p className="text-gray-500 text-sm text-center">Quizzes Passed</p>
          </div>
          {/* Add more stats here */}
        </div>
      </div>
    </div>
  )
}

export default Profile

