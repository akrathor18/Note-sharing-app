import { useState, useEffect } from 'react';
import { BrainCircuit, Clock, ChevronRight, AlertCircle, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../config/axios';

export default function Quiz() {
    const [activeView, setActiveView] = useState('list');

    const navigate = useNavigate();

    // Sample data
    const [quizzes, setQuizzes] = useState([]);

    const getQuizzes = async () => {
        try {
            const response = await API.get('quiz/getQuiz');
            setQuizzes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuizzes();
    }, []);

    const startQuiz = (quiz) => {
        console.log(quiz._id);
        const quizId = quiz._id;
        navigate(`/quiz/${quizId}`);
    };

    // Quiz List View
    if (activeView === 'list') {
        return (
            <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"></div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold mb-1">Quizzes</h1>
                    <p className="text-[#F5F5F5]/60">
                        Test your knowledge with interactive quizzes
                    </p>
                </div>
                <Link to={'/createquiz'}>
                    <button className="flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                        <Plus size={18} />
                        <span>Create your own Quiz</span>
                    </button>
                </Link>

                {/* Quiz Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {quizzes.map((quiz) => (
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
                                        className={`text-xs px-2 py-1 rounded-full ${
                                            quiz.difficulty === 'Easy'
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
                                        <AlertCircle size={14} />
                                        {quiz.questions.length} Questions
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                                        <Clock size={14} />
                                        {quiz.timeLimit}min
                                    </div>
                                </div>

                                <button
                                    onClick={() => startQuiz(quiz)}
                                    className="w-full py-2 rounded-lg bg-[#0D0D0D] hover:bg-[#FF007F] hover:text-white transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    Start Quiz
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
