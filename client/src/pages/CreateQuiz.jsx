import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../config/axios";

import CreateQuizHeader from "../components/quiz/CreateQuizHeader";
import QuizMetadataForm from "../components/quiz/QuizMetadataForm";
import QuestionList from "../components/quiz/QuestionList";
import CreateQuizFooter from "../components/quiz/CreateQuizFooter";

const initialQuestionState = {
  id: 1,
  text: "",
  options: [
    { id: "a", text: "" },
    { id: "b", text: "" },
    { id: "c", text: "" },
    { id: "d", text: "" },
  ],
  correctAnswer: "",
};

const initialQuizState = {
  title: "",
  category: "",
  timeLimit: 10,
  difficulty: "Medium",
  questions: [initialQuestionState],
};

export default function CreateQuiz() {
  // Hooks
  const navigate = useNavigate();

  // State
  const [quizData, setQuizData] = useState(initialQuizState);
  const [isUploading, setIsUploading] = useState(false);

  // Handlers
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

  const handleCancel = () => {
    navigate("/quizzes");
  };

  const validateQuiz = () => {
    if (!quizData.title.trim()) {
      toast.warn("Please enter a quiz title");
      return false;
    }
    for (const question of quizData.questions) {
      if (!question.text.trim()) {
        toast.warn(`Please fill in the question text for Question ${quizData.questions.indexOf(question) + 1}`);
        return false;
      }
      if (question.options.some(opt => !opt.text.trim())) {
        toast.warn(`Please fill in all answer options for Question ${quizData.questions.indexOf(question) + 1}`);
        return false;
      }
      if (!question.correctAnswer) {
        toast.warn(`Please select a correct answer for Question ${quizData.questions.indexOf(question) + 1}`);
        return false;
      }
    }
    return true;
  }

  const handleSaveQuiz = async () => {
    if (!validateQuiz()) return;

    setIsUploading(true);
    try {
      await API.post("quiz/createQuiz", quizData);
      toast.success("Success! Your quiz is ready to use.");
      navigate("/quizzes");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Server error. Quiz could not be created.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CreateQuizHeader />

        <div className="p-6 space-y-6">
          <QuizMetadataForm
            quizData={quizData}
            onInputChange={handleInputChange}
          />

          <QuestionList
            questions={quizData.questions}
            onAddQuestion={addQuestion}
            onRemoveQuestion={removeQuestion}
            onQuestionChange={handleQuestionChange}
            onOptionChange={handleOptionChange}
            onCorrectAnswerChange={handleCorrectAnswerChange}
          />
        </div>

        <CreateQuizFooter
          onCancel={handleCancel}
          onSave={handleSaveQuiz}
          isUploading={isUploading}
        />
      </div>
    </div>
  );
}
