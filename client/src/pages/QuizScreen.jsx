import { useState, useEffect } from 'react';
import {
    Clock,
    CheckCircle2,
    XCircle,
    ArrowRight,
    RotateCcw,
} from 'lucide-react';
import ErrorState from '../common/components/ErrorState';
import QuizSkeleton from '../common/components/QuizSkeleton';
import QuizNotFound from '../components/quiz/QuizNotFound';
import QuizSubmitting from '../components/quiz/QuizSubmitting';
import { getPerformanceMessage } from '../utils/helperFunctions';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';

export default function QuizScreen() {
    const navigate = useNavigate();
    const { quizId } = useParams();

    const {
        getQuizById,
        attmptQuiz,
        activeQuiz,
        isLoading,
        uploadingAnswers,
        error,
        result,
    } = useQuizStore();

    const [activeView, setActiveView] = useState('quiz');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    /* ================= FETCH QUIZ ================= */
    useEffect(() => {
        if (!quizId) return;
        setActiveView('quiz');
        setCurrentQuestion(0);
        setSelectedAnswers({});
        getQuizById(quizId);
    }, [quizId, getQuizById]);



    /* ================= SHOW RESULT WHEN READY ================= */
    useEffect(() => {
        if (result) {
            setActiveView('result');
        }
        else {
            setActiveView('quiz');
        }
    }, [result]);




    /* ================= HANDLERS ================= */
    const handleAnswerSelect = (questionId, optionId) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const goToNextQuestion = async () => {
        if (currentQuestion < activeQuiz.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            console.log(selectedAnswers)
            await attmptQuiz({
                quizId: activeQuiz._id,
                answers: selectedAnswers,
            });
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setActiveView('quiz');
        navigate('/quizzes');
    };
    /* ================= STATES ================= */
    if (isLoading) return <QuizSkeleton />;
    if (uploadingAnswers) return <QuizSubmitting />;

    if (error) return <ErrorState title="Error loading quiz" message={error} />;
    if (!activeQuiz) return <QuizNotFound />;




    /* ================= QUIZ VIEW ================= */
    if (activeView === 'quiz') {
        const currentQ = activeQuiz.questions[currentQuestion];
        const progress =
            ((currentQuestion + 1) / activeQuiz.questions.length) * 100;

        return (
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">{activeQuiz.title}</h2>
                    <div className="flex justify-between text-sm text-[#F5F5F5]/60">
                        <span>
                            Question {currentQuestion + 1} of{' '}
                            {activeQuiz.questions.length}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {activeQuiz.questions.length * 1.5} min
                        </span>
                    </div>

                    {/* Progress */}
                    <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full mt-3">
                        <div
                            className="h-full bg-[#00E5FF] rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-medium mb-6">
                        {currentQ.text}
                    </h3>

                    <div className="space-y-3">
                        {currentQ.options.map((option) => (
                            <button
                                key={option._id}
                                onClick={() =>
                                    handleAnswerSelect(currentQ._id, option.id)
                                }
                                className={`w-full text-left p-4 rounded-lg flex items-center border transition ${selectedAnswers[currentQ._id] === option.id
                                    ? 'bg-[#FF007F]/20 border-[#FF007F]'
                                    : 'bg-[#0D0D0D] border-[#F5F5F5]/10 hover:border-[#F5F5F5]/30'
                                    }`}
                            >
                                <span
                                    className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center text-sm ${selectedAnswers[currentQ._id] === option.id
                                        ? 'bg-[#FF007F] text-white'
                                        : 'bg-[#1A1A1A] text-[#F5F5F5]/60'
                                        }`}
                                >
                                    {option.id.toUpperCase()}
                                </span>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button
                        onClick={resetQuiz}
                        className="px-4 py-2 bg-[#1A1A1A] rounded-lg flex items-center gap-2"
                    >
                        <RotateCcw size={16} /> Quit
                    </button>

                    <button
                        onClick={goToNextQuestion}
                        disabled={!selectedAnswers[currentQ._id]}
                        className={`px-6 py-2 rounded-lg flex items-center gap-2 ${selectedAnswers[currentQ._id]
                            ? 'bg-[#FF007F] text-white'
                            : 'bg-[#1A1A1A]/50 text-[#F5F5F5]/30 cursor-not-allowed'
                            }`}
                    >
                        {currentQuestion < activeQuiz.questions.length - 1
                            ? 'Next'
                            : 'Finish'}
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        );
    }

    /* ================= RESULT VIEW ================= */
    if (activeView === 'result' && result) {
        const performance = getPerformanceMessage(result.percentageScore);

        return (
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Quiz Completed!</h2>
                    <p className="text-[#F5F5F5]/60">{activeQuiz.title}</p>
                </div>

                {/* Score Circle */}
                <div className="flex justify-center mb-6 md:mb-8">
                    <div className="relative w-36 h-36 md:w-48 md:h-48">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="text-[#1A1A1A] stroke-current"
                                strokeWidth="10"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                            ></circle>
                            <circle
                                className="text-[#FF007F] stroke-current"
                                strokeWidth="10"
                                strokeLinecap="round"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                strokeDasharray="251.2"
                                strokeDashoffset={251.2 - (251.2 * result.percentageScore) / 100}
                                transform="rotate(-90 50 50)"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl md:text-4xl font-bold">
                                {result.percentageScore.toFixed(1)}%
                            </span>
                            <span className="text-[#F5F5F5]/60 text-sm">Score</span>
                        </div>



                    </div>
                </div>
                <div className="my-4 flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        <performance.Icon size={22} className={performance.color} />
                        <h3 className="text-lg font-semibold">
                            {performance.title}
                        </h3>
                    </div>

                    <p className="text-[#F5F5F5]/60 mt-1 text-center">
                        {performance.subtitle}
                    </p>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#1A1A1A] p-4 rounded-xl">
                        <CheckCircle2 className="mx-auto text-green-500 mb-2" />
                        <p className="text-lg">{result.score}</p>
                        <p className="text-sm text-[#F5F5F5]/60">Correct</p>
                    </div>

                    <div className="bg-[#1A1A1A] p-4 rounded-xl">
                        <XCircle className="mx-auto text-red-500 mb-2" />
                        <p className="text-lg">
                            {result.total - result.score}
                        </p>
                        <p className="text-sm text-[#F5F5F5]/60">Incorrect</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => {
                            setCurrentQuestion(0);
                            setSelectedAnswers({});
                            setActiveView('quiz');
                        }}
                        className="px-6 py-3 bg-[#00E5FF] text-black rounded-lg"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={resetQuiz}
                        className="px-6 py-3 bg-[#1A1A1A] rounded-lg"
                    >
                        Back to Quizzes
                    </button>
                </div>
            </div>
        );
    }

    return <p>Loading quiz...</p>;
}
