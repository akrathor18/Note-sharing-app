
import { FileText, Plus } from 'lucide-react';
import QuizCard from './QuizCard';
export default function QuizGrid({ quiz= [], searchTerm }) {
    if(!quiz || quiz.length === 0) {
        return (
            <div className="text-center py-12 bg-[#1A1A1A] rounded-xl">
                <FileText className="mx-auto mb-4 text-[#F5F5F5]/40" size={48} />
                <h3 className="text-lg font-medium mb-2">No quiz found</h3>
                <p className="text-[#F5F5F5]/60">
                    {searchTerm
                        ? `We couldn't find any notes matching "${searchTerm}"`
                        : 'No notes available for this subject yet'}
                </p>
                <button
                    onClick={() => navigate('/createquiz')}
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    <span>Create a Quiz</span>
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quiz.map((quiz) => (
                <QuizCard key={quiz._id} quizData={quiz} />
            ))}
        </div>
    );
}
