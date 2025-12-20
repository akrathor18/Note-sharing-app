import { useEffect } from 'react';
import { Smile } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';
import { useQuizStore } from '../../store/quizStore';
import ErrorState from '../../common/components/ErrorState';
import CardSkeleton from '../../common/components/CardSkeleton';
import EmptyState from '../../common/components/EmptyState';

function QuizCard(attempt ) {
    const quizData=attempt.attempt
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded-full">
                    {quizData.quiz.category}
                </span>
                <span className="text-xs text-[#F5F5F5]/60">{formatDateTime(quizData.attemptedAt)}</span>
            </div>

            <div className="flex justify-start items-center gap-3">
                <h3 className="font-medium mb-3">{quizData.quiz.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full mb-6 ${quizData.quiz.difficulty === 'Easy'
                            ? 'bg-green-500/10 text-green-500'
                            : quizData.quiz.difficulty === 'Medium'
                                ? 'bg-yellow-500/10 text-yellow-500'
                                : 'bg-red-500/10 text-red-500'
                            }`}
                    >
                    {quizData.quiz.difficulty}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-green-500 text-lg">Score:{quizData.percentageScore}%</span>
                <span className="text-green-500">Correct Answer:{quizData.score}</span>
            </div>
        </div>
    );
}

function AchievementsList() {
    const { getAttemptedQuiz,attemptedQuiz, isLoading, errorOnAttempt } = useQuizStore();
    useEffect(() => {
        getAttemptedQuiz();
    }, []);

    if (isLoading) {
        return <CardSkeleton/>;
    }
    if (errorOnAttempt) {
        return <ErrorState title="Unable to load quizzes"
                message={errorOnAttempt} />
    }

    if (!Array.isArray(attemptedQuiz) || attemptedQuiz.length === 0) {
  return <EmptyState type="attempt" />;
}

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">My Attempted Quizzes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
                {attemptedQuiz.map((attemptedQuiz) => (
                    <QuizCard key={attemptedQuiz._id} attempt={attemptedQuiz} />
                ))}
            </div>
        </div>
    );
}

export default AchievementsList; 