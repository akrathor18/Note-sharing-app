import { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Save,
  Clock,
  AlertCircle,
  BrainCircuit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../config/axios";

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [uploading, setuploading] = useState(false);
  const [quizData, setQuizData] = useState({
    title: "",
    category: "",
    timeLimit: 10,
    difficulty: "Medium",
    questions: [
      {
        id: 1,
        text: "",
        options: [
          { id: "a", text: "" },
          { id: "b", text: "" },
          { id: "c", text: "" },
          { id: "d", text: "" },
        ],
        correctAnswer: "",
      },
    ],
  });

  const [userCreatedQuizzes, setUserCreatedQuizzes] = useState([]);

  const handleSave = () => {
    // Validation
    if (!quizData.title.trim()) {
      alert("Please enter a quiz title");
      return;
    }

    // Check if all questions have text and all options are filled
    for (const question of quizData.questions) {
      if (!question.text.trim()) {
        alert("Please fill in all question texts");
        return;
      }
      for (const option of question.options) {
        if (!option.text.trim()) {
          alert("Please fill in all answer options");
          return;
        }
      }
    }
  };

  const handleSaveQuiz = async (newQuizData) => {
    handleSave();
    setuploading(true);
    const newQuiz = {
      ...newQuizData,
      // Keep the questions array intact
      questions: newQuizData?.questions || [],
    };

    setUserCreatedQuizzes([newQuiz, ...userCreatedQuizzes]);

    try {
      const response = await API.post("quiz/createQuiz", newQuiz);

      toast.success("Success! Your quiz is ready to use.");
      navigate("/quizzes");
    } catch (error) {
      console.log(error);
      toast.error("Server error. Quiz could not be created.");
    } finally {
      setuploading(false);
    }
  };

  const difficulties = ["Easy", "Medium", "Hard"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    });
  };

  const handleOptionChange = (questionId, optionId, value) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, text: value } : opt
              ),
            }
          : q
      ),
    });
  };

  const handleCorrectAnswerChange = (questionId, correctAnswer) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, correctAnswer } : q
      ),
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: "",
      options: [
        { id: "a", text: "" },
        { id: "b", text: "" },
        { id: "c", text: "" },
        { id: "d", text: "" },
      ],
      correctAnswer: "",
    };
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });
  };

  const removeQuestion = (questionId) => {
    if (quizData.questions.length > 1) {
      setQuizData({
        ...quizData,
        questions: quizData.questions.filter((q) => q.id !== questionId),
      });
    }
  };

  const handleClose = () => {
    navigate("/quizzes");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F5F5F5]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF007F]/10 flex items-center justify-center">
              <BrainCircuit size={20} className="text-[#FF007F]" />
            </div>
            <h2 className="text-xl font-bold">Create New Quiz</h2>
          </div>
          <Link to={"/quizzes"}>
            <button className="p-2 rounded-full hover:bg-[#F5F5F5]/10">
              <X size={20} />
            </button>
          </Link>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Quiz Title <span className="text-[#FF007F]">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={quizData.title}
                onChange={handleInputChange}
                placeholder="Enter quiz title"
                className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2"
              >
                Subject <span className="text-[#FF007F]">*</span>
              </label>
              <input
                id="category"
                name="category"
                value={quizData.category}
                onChange={handleInputChange}
                className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                required
              ></input>
            </div>
          </div>

          {/* Quiz Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="timeLimit"
                className="block text-sm font-medium mb-2"
              >
                Time Limit (minutes)
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                  size={18}
                />
                <input
                  id="timeLimit"
                  name="timeLimit"
                  type="number"
                  min="5"
                  max="180"
                  value={quizData.timeLimit}
                  onChange={handleInputChange}
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:border-[#FF007F]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium mb-2"
              >
                Difficulty Level
              </label>
              <div className="relative">
                <AlertCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                  size={18}
                />
                <select
                  id="difficulty"
                  name="difficulty"
                  value={quizData.difficulty}
                  onChange={handleInputChange}
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:border-[#FF007F]"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Questions</h3>
              <button
                onClick={addQuestion}
                className="flex items-center gap-2 bg-[#00E5FF] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#00E5FF]/90 transition-colors"
              >
                <Plus size={16} />
                Add Question
              </button>
            </div>

            <div className="space-y-6">
              {quizData.questions.map((question, questionIndex) => (
                <div
                  key={question.id}
                  className="bg-[#0D0D0D] rounded-lg p-4 border border-[#F5F5F5]/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      Question {questionIndex + 1}
                    </h4>
                    {quizData.questions.length > 1 && (
                      <button
                        onClick={() => removeQuestion(question.id)}
                        className="p-1 rounded-full hover:bg-[#FF007F]/10 text-[#FF007F]"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Question Text <span className="text-[#FF007F]">*</span>
                      </label>
                      <textarea
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(
                            question.id,
                            "text",
                            e.target.value
                          )
                        }
                        placeholder="Enter your question"
                        className="w-full bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[60px]"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Answer Options
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === option.id}
                              onChange={() =>
                                handleCorrectAnswerChange(
                                  question.id,
                                  option.id
                                )
                              }
                              className="w-4 h-4 text-[#FF007F] bg-[#1A1A1A] border-[#F5F5F5]/20 focus:ring-[#FF007F]"
                            />
                            <span className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs font-medium">
                              {option.id.toUpperCase()}
                            </span>
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  option.id,
                                  e.target.value
                                )
                              }
                              placeholder={`Option ${option.id.toUpperCase()}`}
                              className="flex-1 bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                              required
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-[#F5F5F5]/60 mt-2">
                        Select the correct answer by clicking the radio button
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[#F5F5F5]/10">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSaveQuiz(quizData)}
            disabled={uploading}
            className={`flex items-center gap-2 ${
              !uploading
                ? "bg-[#FF007F] hover:bg-[#FF007F]/90"
                : "bg-gray-700 cursor-not-allowed"
            }text-white px-6 py-2 rounded-lg transition-colors`}
          >
            <Save size={16} />
            {!uploading ? "Create Quiz" : "Uploading..."}
          </button>
        </div>
      </div>
    </div>
  );
}
