import { useState, useEffect } from "react";
import {
  BrainCircuit,
  Clock,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Plus
} from "lucide-react"
import { useParams } from "react-router-dom";
export default function QuizScreen() {


    const { id } = useParams();
    console.log(id)
    const [activeView, setActiveView] = useState("quiz") // list, quiz, result
    const [activeQuiz, setActiveQuiz] = useState({
    "_id": "685564441587880c3e5e0bb2",
    "title": "Data Structures Fundamentals",
    "category": "Data Structures",
    "timeLimit": 10,
    "difficulty": "Medium",
    "questions": [
        {
            "text": "Which data structure uses LIFO (Last In First Out) principle?",
            "options": [
                {
                    "id": "a",
                    "text": "Queue",
                    "_id": "685564441587880c3e5e0bb4"
                },
                {
                    "id": "b",
                    "text": "Stack",
                    "_id": "685564441587880c3e5e0bb5"
                },
                {
                    "id": "c",
                    "text": "Linked List",
                    "_id": "685564441587880c3e5e0bb6"
                },
                {
                    "id": "d",
                    "text": "Tree",
                    "_id": "685564441587880c3e5e0bb7"
                }
            ],
            "correctAnswer": "b",
            "_id": "685564441587880c3e5e0bb3"
        },
        {
            "text": "What is the time complexity of searching an element in a binary search tree in the worst case?",
            "options": [
                {
                    "id": "a",
                    "text": "O(1)",
                    "_id": "685564441587880c3e5e0bb9"
                },
                {
                    "id": "b",
                    "text": "O(log n)",
                    "_id": "685564441587880c3e5e0bba"
                },
                {
                    "id": "c",
                    "text": "O(n)",
                    "_id": "685564441587880c3e5e0bbb"
                },
                {
                    "id": "d",
                    "text": "O(n²)",
                    "_id": "685564441587880c3e5e0bbc"
                }
            ],
            "correctAnswer": "c",
            "_id": "685564441587880c3e5e0bb8"
        },
        {
            "text": "Which of the following is not a linear data structure?",
            "options": [
                {
                    "id": "a",
                    "text": "Array",
                    "_id": "685564441587880c3e5e0bbe"
                },
                {
                    "id": "b",
                    "text": "Queue",
                    "_id": "685564441587880c3e5e0bbf"
                },
                {
                    "id": "c",
                    "text": "Stack",
                    "_id": "685564441587880c3e5e0bc0"
                },
                {
                    "id": "d",
                    "text": "Tree",
                    "_id": "685564441587880c3e5e0bc1"
                }
            ],
            "correctAnswer": "d",
            "_id": "685564441587880c3e5e0bbd"
        },
        {
            "text": "What data structure would you use for implementing undo functionality in a text editor?",
            "options": [
                {
                    "id": "a",
                    "text": "Stack",
                    "_id": "685564441587880c3e5e0bc3"
                },
                {
                    "id": "b",
                    "text": "Queue",
                    "_id": "685564441587880c3e5e0bc4"
                },
                {
                    "id": "c",
                    "text": "Linked List",
                    "_id": "685564441587880c3e5e0bc5"
                },
                {
                    "id": "d",
                    "text": "Hash Table",
                    "_id": "685564441587880c3e5e0bc6"
                }
            ],
            "correctAnswer": "a",
            "_id": "685564441587880c3e5e0bc2"
        },
        {
            "text": "Which sorting algorithm has the best average-case time complexity?",
            "options": [
                {
                    "id": "a",
                    "text": "Bubble Sort",
                    "_id": "685564441587880c3e5e0bc8"
                },
                {
                    "id": "b",
                    "text": "Insertion Sort",
                    "_id": "685564441587880c3e5e0bc9"
                },
                {
                    "id": "c",
                    "text": "Quick Sort",
                    "_id": "685564441587880c3e5e0bca"
                },
                {
                    "id": "d",
                    "text": "Selection Sort",
                    "_id": "685564441587880c3e5e0bcb"
                }
            ],
            "correctAnswer": "c",
            "_id": "685564441587880c3e5e0bc7"
        }
    ],
    "createdAt": "2025-06-20T13:38:12.239Z",
    "__v": 0
})
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [quizResult, setQuizResult] = useState(null)

    const handleAnswerSelect = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        })
    }

    const goToNextQuestion = () => {
        if (currentQuestion < activeQuiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            // Calculate results
            let correctAnswers = 0
            activeQuiz.questions.forEach((question) => {
                if (selectedAnswers[question._id] === question.correctAnswer) {
                    correctAnswers++
                }
            })

            setQuizResult({
                totalQuestions: activeQuiz.questions.length,
                correctAnswers,
                score: Math.round((correctAnswers / activeQuiz.questions.length) * 100),
            })

            setActiveView("result")
        }
    }

    const resetQuiz = () => {
        setActiveView("list")
        setActiveQuiz(null)
        setCurrentQuestion(0)
        setSelectedAnswers({})
        setQuizResult(null)
    }

    // Quiz Taking View
    if (activeView === "quiz" && activeQuiz) {
        const currentQ = activeQuiz.questions[currentQuestion]
        const progress = ((currentQuestion + 1) / activeQuiz.questions.length) * 100

        return (
            <div className="max-w-3xl mx-auto">
                {/* Quiz Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-lg md:text-xl font-bold mb-2">{activeQuiz.title}</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#F5F5F5]/60">
                            Question {currentQuestion + 1} of {activeQuiz.questions.length}
                        </span>
                        <span className="text-sm text-[#F5F5F5]/60 flex items-center gap-1">
                            <Clock size={14} />
                            {activeQuiz.questions.length * 1.5} min
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full mt-3">
                        <div
                            className="h-full bg-[#00E5FF] rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question */}
                <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-6 mb-6">
                    <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">{currentQ.text}</h3>

                    <div className="space-y-3">
                        {console.log(currentQ)}
                        {currentQ.options.map((option) => (
                            <button
                            key={option.id}
                            
                            onClick={() => handleAnswerSelect(currentQ._id, option.id)}
                            className={`w-full text-left p-3 md:p-4 rounded-lg flex items-center transition-all duration-200 ${selectedAnswers[currentQ._id] === option.id
                                ? "bg-[#FF007F]/20 border border-[#FF007F]"
                                : "bg-[#0D0D0D] border border-[#F5F5F5]/10 hover:border-[#F5F5F5]/30"
                            }`}
                            >
                                <span
                                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${selectedAnswers[currentQ._id] === option.id
                                        ? "bg-[#FF007F] text-white"
                                        : "bg-[#1A1A1A] text-[#F5F5F5]/60"
                                        }`}
                                >
                                    {console.log(selectedAnswers[currentQ._id] +option.id)}
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
                        className="px-4 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-colors flex items-center gap-2"
                    >
                        <RotateCcw size={16} />
                        Quit
                    </button>

                    <button
                        onClick={goToNextQuestion}
                        disabled={!selectedAnswers[currentQ._id]}
                        className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${selectedAnswers[currentQ._id]
                            ? "bg-[#FF007F] hover:bg-[#FF007F]/90 text-white"
                            : "bg-[#1A1A1A]/50 text-[#F5F5F5]/30 cursor-not-allowed"
                            }`}
                    >
                        {currentQuestion < activeQuiz.questions.length - 1 ? "Next" : "Finish"}
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        )
    }

    // Quiz Result View
    if (activeView === "result" && quizResult) {
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
                                strokeDashoffset={251.2 - (251.2 * quizResult.score) / 100}
                                transform="rotate(-90 50 50)"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl md:text-4xl font-bold">{quizResult.score}%</span>
                            <span className="text-[#F5F5F5]/60 text-sm">Score</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 md:mb-8">
                    <div className="bg-[#1A1A1A] rounded-xl p-4">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <CheckCircle2 size={20} className="text-green-500" />
                            <span className="text-lg font-medium">{quizResult.correctAnswers}</span>
                        </div>
                        <p className="text-sm text-[#F5F5F5]/60">Correct</p>
                    </div>

                    <div className="bg-[#1A1A1A] rounded-xl p-4">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <XCircle size={20} className="text-red-500" />
                            <span className="text-lg font-medium">{quizResult.totalQuestions - quizResult.correctAnswers}</span>
                        </div>
                        <p className="text-sm text-[#F5F5F5]/60">Incorrect</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => {
                            setActiveQuiz(sampleQuizData)
                            setCurrentQuestion(0)
                            setSelectedAnswers({})
                            setActiveView("quiz")
                        }}
                        className="px-6 py-3 rounded-lg bg-[#00E5FF] text-[#0D0D0D] hover:bg-[#00E5FF]/90 transition-colors font-medium"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={resetQuiz}
                        className="px-6 py-3 rounded-lg bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-colors font-medium"
                    >
                        Back to Quizzes
                    </button>
                </div>
            </div>
        )
    }
}