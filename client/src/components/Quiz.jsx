import { useState, useEffect } from "react"
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
import { Link } from "react-router-dom"
import API from "../config/axios"


export default function Quiz() {
  const [activeView, setActiveView] = useState("list") // list, quiz, result
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizResult, setQuizResult] = useState(null)


  // Sample data
  const [quizzes, setQuizzes] = useState([])


  const getQuizzes=async()=>{
    try {
    const response = await API.get("quiz/getQuiz");
    setQuizzes(response.data)
      console.log((response.data))
      console.log(typeof(response.data))
    } catch (error) {
      console.log(error)
    }    
  }

  useEffect(() => {
getQuizzes();
  }, [])
  
  // Sample quiz data
  const sampleQuizData = {
    id: 1,
    title: "Data Structures Fundamentals",
    subject: "Computer Science",
    questions: [
      {
        id: 1,
        text: "Which data structure uses LIFO (Last In First Out) principle?",
        options: [
          { id: "a", text: "Queue" },
          { id: "b", text: "Stack" },
          { id: "c", text: "Linked List" },
          { id: "d", text: "Tree" },
        ],
        correctAnswer: "b",
      },
      {
        id: 2,
        text: "What is the time complexity of searching an element in a binary search tree in the worst case?",
        options: [
          { id: "a", text: "O(1)" },
          { id: "b", text: "O(log n)" },
          { id: "c", text: "O(n)" },
          { id: "d", text: "O(n²)" },
        ],
        correctAnswer: "c",
      },
      {
        id: 3,
        text: "Which of the following is not a linear data structure?",
        options: [
          { id: "a", text: "Array" },
          { id: "b", text: "Queue" },
          { id: "c", text: "Stack" },
          { id: "d", text: "Tree" },
        ],
        correctAnswer: "d",
      },
      {
        id: 4,
        text: "What data structure would you use for implementing undo functionality in a text editor?",
        options: [
          { id: "a", text: "Stack" },
          { id: "b", text: "Queue" },
          { id: "c", text: "Linked List" },
          { id: "d", text: "Hash Table" },
        ],
        correctAnswer: "a",
      },
      {
        id: 5,
        text: "Which sorting algorithm has the best average-case time complexity?",
        options: [
          { id: "a", text: "Bubble Sort" },
          { id: "b", text: "Insertion Sort" },
          { id: "c", text: "Quick Sort" },
          { id: "d", text: "Selection Sort" },
        ],
        correctAnswer: "c",
      },
    ],
  }

  const startQuiz = (quiz) => {
    setActiveQuiz(sampleQuizData)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setActiveView("quiz")
  }

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
        if (selectedAnswers[question.id] === question.correctAnswer) {
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

  // Quiz List View
  if (activeView === "list") {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"></div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Quizzes</h1>
          <p className="text-[#F5F5F5]/60">Test your knowledge with interactive quizzes</p>
        </div>
        <Link to={'/createquiz'}>
          <button
          onClick={() => setIsCreateQuizOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
          >
            <Plus size={18} />
            <span>Create your own Quiz</span>
          </button>
            </Link>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/20 transition-all duration-300 group"
            >
              <div className="h-40 bg-gradient-to-r from-[#FF007F]/20 to-[#00E5FF]/20 flex items-center justify-center">
                <BrainCircuit size={64} className="text-[#F5F5F5]/80" />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded-full">{quiz.category}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      quiz.difficulty === "Easy"
                        ? "bg-green-500/10 text-green-500"
                        : quiz.difficulty === "Medium"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-red-500/10 text-red-500"
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
    )
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
            {currentQ.options.map((option) => (
              
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQ.id, option.id)}
                className={`w-full text-left p-3 md:p-4 rounded-lg flex items-center transition-all duration-200 ${
                  selectedAnswers[currentQ.id] === option.id
                    ? "bg-[#FF007F]/20 border border-[#FF007F]"
                    : "bg-[#0D0D0D] border border-[#F5F5F5]/10 hover:border-[#F5F5F5]/30"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQ.id] === option.id
                      ? "bg-[#FF007F] text-white"
                      : "bg-[#1A1A1A] text-[#F5F5F5]/60"
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
            className="px-4 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-colors flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Quit
          </button>

          <button
            onClick={goToNextQuestion}
            disabled={!selectedAnswers[currentQ.id]}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedAnswers[currentQ.id]
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

  return null
}