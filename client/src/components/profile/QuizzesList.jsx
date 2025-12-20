import { useEffect } from 'react';

import { Trash2 } from 'lucide-react';

import { useQuizStore } from '../../store/quizStore';
import { formatDate } from '../../utils/formatDate';
import ErrorState from '../../common/components/ErrorState';
import CardSkeleton from '../../common/components/CardSkeleton';
import EmptyState from '../../common/components/EmptyState';
function QuizCard(quiz) {
    const { deleteQuiz, deleteQuizId } = useQuizStore();
    return (

        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded-full">
                    {quiz.quiz.category}
                </span>
                <span className="text-xs text-[#F5F5F5]/60">{formatDate(quiz.quiz.createdAt)}</span>
            </div>
            <h3 className="font-medium mb-3">{quiz.quiz.title}</h3>
            <div className="flex justify-between items-center text-xs">
                <span className="text-green-500">{quiz.quiz.questionCount} Questions</span>

                {deleteQuizId === quiz.quiz._id ? (
                    <span className="text-red-400 flex items-center gap-1">
                        <Trash2 size={14} />
                        Deleting...
                    </span>
                ) : (
                    <button
                        onClick={() => deleteQuiz(quiz.quiz._id)}
                        className="text-red-500 flex flex-row gap-1 hover:text-red-400"
                    >
                        <Trash2 size={14} />Delete
                    </button>
                )}

            </div>
        </div>
    );
}

function QuizzesList() {

    const { ftechUserQuizzes, userQuizzes, isLoading, error } = useQuizStore();
    useEffect(() => {
        ftechUserQuizzes();
    }, [ftechUserQuizzes]);

    if (isLoading) return <CardSkeleton />;
    if (error) return <ErrorState title="Unable to load quizzes"
        message={error} />;
    
    if (!userQuizzes || userQuizzes.length === 0) {
        return <EmptyState type="quiz" />;
    }
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">My Quizzes</h2>
                <button className="text-[#00E5FF] text-sm hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userQuizzes.map((quiz) => (
                    <QuizCard key={quiz._id} quiz={quiz} />
                ))}
            </div>
        </div>
    );
}

export default QuizzesList; 