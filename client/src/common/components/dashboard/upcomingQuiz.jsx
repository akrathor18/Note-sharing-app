import { ChevronRight, Clock } from "lucide-react";

export default function UpcomingQuizzes({ quizzes }) {
    return (
      <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-5 border border-[#F5F5F5]/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Upcoming Quizzes</h2>
          <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
            View All <ChevronRight size={16} />
          </button>
        </div>
  
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-3 rounded-lg bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 transition-colors"
            >
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
    );
  }