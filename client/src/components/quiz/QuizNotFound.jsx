import { FileQuestion, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuizNotFound() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#FF007F]/10 flex items-center justify-center">
          <FileQuestion size={32} className="text-[#FF007F]" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">
        Quiz not found
      </h2>

      <p className="text-[#F5F5F5]/60 mb-8">
        The quiz you’re trying to access doesn’t exist, was deleted,
        or you don’t have permission to view it.
      </p>

      <button
        onClick={() => navigate('/quizzes')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 rounded-lg transition"
      >
        <ArrowLeft size={16} />
        Back to quizzes
      </button>
    </div>
  );
}
