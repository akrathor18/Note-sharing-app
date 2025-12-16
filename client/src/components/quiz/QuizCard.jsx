import { AlertCircle, BrainCircuit, ChevronRight, FileText, Plus, Clock, UserPen, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function QuizCard(quizData) {
    const quiz = quizData.quizData;
    const navigate = useNavigate();

    const startQuiz = (quizId) => {
        navigate(`/quizzes/${quizId}`);
    }

    return (
        <div
            key={quiz._id}
            className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/20 transition-all duration-300 group"
        >
            <div className="h-40 bg-gradient-to-r from-[#FF007F]/20 to-[#00E5FF]/20 flex items-center justify-center">
                <BrainCircuit size={64} className="text-[#F5F5F5]/80" />
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded-full">
                        {quiz.category}
                    </span>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${quiz.difficulty === 'Easy'
                            ? 'bg-green-500/10 text-green-500'
                            : quiz.difficulty === 'Medium'
                                ? 'bg-yellow-500/10 text-yellow-500'
                                : 'bg-red-500/10 text-red-500'
                            }`}
                    >
                        {quiz.difficulty}
                    </span>
                </div>

                <h3 className="font-medium mb-3 line-clamp-2">{quiz.title}</h3>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                        <UserPen size={14} />
                        Create By: {quiz.createdBy?.name || "User"}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                        <PenLine size={14} />
                        {formatDate(quiz.createdAt)}
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                        <AlertCircle size={14} />
                        {quiz.questions.length} Questions
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                        <Clock size={14} />
                        {quiz.timeLimit}min
                    </div>
                </div>

                <button
                    onClick={() => startQuiz(quiz._id)}
                    className="w-full py-2 rounded-lg bg-[#0D0D0D] hover:bg-[#FF007F] hover:text-white transition-colors flex items-center justify-center gap-2 font-medium"
                >
                    Start Quiz
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}

export default QuizCard
